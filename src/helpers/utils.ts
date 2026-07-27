export function fieldHasContent<Field>(field: Field) {
  if (field === undefined) return false;
  if (typeof field === "string" && !field.trim()) return false;
  return true;
}

export function pickObject<
  Source extends Object,
  Keys extends keyof Source = keyof Source,
>(
  source: Source,
  keys: Keys[],
  ignoreFieldCondition: (field: Source[Keys]) => boolean = fieldHasContent,
) {
  const filteredKeys = keys.filter((key) => ignoreFieldCondition(source[key]));
  const filteredEntries = filteredKeys.map((key) => [key, source[key]]);
  const filteredObject = Object.fromEntries(filteredEntries);

  return filteredObject;
}

export function trimObjectStrings<T extends Object>(object: T) {
  const keys = Object.keys(object) as (keyof T)[];

  keys.forEach((key) => {
    if (typeof object[key] === "string") {
      (object[key] as string) = object[key].trim();
    }
  });
}
