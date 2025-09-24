/**
 * Get the variable name
 * @param {() => TResult} getVariable
 * @returns {string | undefined}
 */
export function getVariableName<TResult>(
  getVariable: () => TResult,
): string | undefined {
  const functionString = getVariable
    .toString()
    .replace(/(\r\n|\n|\r|\s)/gm, '');
  const match = /\(\)=>(.*)/.exec(functionString);

  if (!match) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = match[1];
  const memberParts = fullMemberName.split('.');

  return memberParts.pop();
}
