import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSeriesRange, getIndexUpdatedAt } from "@/lib/indices";
import { indexCodes, IndexCode } from "@data/mockIndices";

const paramsSchema = z.object({
  code: z.enum(indexCodes),
});

const querySchema = z.object({
  from: z.string().regex(/\d{4}-\d{2}-\d{2}/).optional(),
  to: z.string().regex(/\d{4}-\d{2}-\d{2}/).optional(),
});

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) => {
  const resolvedParams = await context.params;
  const parsedParams = paramsSchema.safeParse(resolvedParams);
  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid index code" }, { status: 400 });
  }

  const url = new URL(request.url);
  const parsedQuery = querySchema.safeParse({
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
  });

  if (!parsedQuery.success) {
    return NextResponse.json({ error: "Invalid query params" }, { status: 400 });
  }

  const { code } = parsedParams.data;
  const { from, to } = parsedQuery.data;

  try {
    const [series, updatedAt] = await Promise.all([
      getSeriesRange(code as IndexCode, from, to),
      getIndexUpdatedAt(code as IndexCode),
    ]);

    return NextResponse.json(
      { code, series, updatedAt },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error fetching index data";
    return NextResponse.json(
      { error: message },
      { status: 502 },
    );
  }
};
