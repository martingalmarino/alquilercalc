import { NextResponse } from "next/server";
import { getIndexMetaList } from "@/lib/indices";

export const GET = async () => {
  const data = getIndexMetaList();
  return NextResponse.json(
    { data, updatedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
};
