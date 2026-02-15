import { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/Input";

type DateInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helper?: string;
  error?: string;
};

export const DateInput = ({ label, helper, error, ...props }: DateInputProps) => (
  <Input label={label} helper={helper} error={error} type="date" {...props} />
);
