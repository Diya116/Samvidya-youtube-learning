import type { FormErrors } from "@/types/types";
export const formatZodErrors = (issues: Array<{ message: string; path: string[] }>): FormErrors => {
  const errors: FormErrors = {};
  issues.forEach(issue => {
    const field = issue.path[0];
    if (field) {
      errors[field] = issue.message;
    }
  });
  return errors;
};