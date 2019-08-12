export const generateClassname = (
  base: string,
  isError: boolean,
  isSuccess: boolean,
): string => {
  base += isError ? ` ${base}--error` : isSuccess ? ` ${base}--success` : '';
  return base;
};
