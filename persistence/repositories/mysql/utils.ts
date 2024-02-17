export function excludeIds(
  key: string,
  hasWhere: boolean,
  ids: string[] | undefined,
): string {
  if (!ids?.length) {
    return " ";
  }
  const andOperator = hasWhere ? "AND " : "WHERE ";
  if (ids.length > 1) {
    return ` ${andOperator}${key} NOT IN (${"?,".repeat(ids.length).slice(0, -1)})`;
  }
  return ` ${andOperator}${key} ${
    typeof ids[0] === "string" ? "NOT LIKE" : "!="
  } ? `;
}
