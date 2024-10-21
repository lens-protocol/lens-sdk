export type JSONPrimitive = boolean | null | number | string;
export type JSONObject = { [member: string]: JSON };
export type JSONArray = JSON[];
export type JSON = JSONPrimitive | JSONObject | JSONArray;
