export function fieldHasContent<Field>(field: Field) {
  if (field === undefined) return false;
  if (typeof field === "string" && !field.trim()) return false;
  return true;
}
