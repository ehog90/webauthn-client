import trimEnd from "lodash/trimEnd";

export function substituteRouteParams(
  source: string,
  params: { [key: string]: string | number } = {}
): string {
  let route = source;
  for (const [key, value] of Object.entries(params)) {
    route = route.replaceAll(`:${key}`, `${value}`);
  }
  route = trimEnd(route, "/");
  return route;
}
