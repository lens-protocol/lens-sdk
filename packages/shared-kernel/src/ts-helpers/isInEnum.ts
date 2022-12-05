export const isInEnum = <TEnumValue extends string | number>(
  enumVariables: { [key: string]: TEnumValue },
  value: string | number,
): value is TEnumValue => {
  return Object.values<string | number>(enumVariables).includes(value);
};
