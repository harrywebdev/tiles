export const debug = (...values: unknown[]) => {
  values.map((v) => console.debug(`%c${v}`, "color: #3E78CC"));
};
