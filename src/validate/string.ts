export function checkString (
  input: unknown,
  length?: [number, number]
): input is string {
  if (typeof input !== 'string') return false;

  if (Array.isArray(length)) {
    const [minLength, maxLength] = length;
    const strLength = input.length;
    return strLength >= minLength && (maxLength === undefined || strLength < maxLength);
  }

  return true;
}
