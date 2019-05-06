function splitURL(url: string) {
  const regex = '(https?://)([^:^/]*)(:\\d*)?(.*)?';
  return url.match(regex);
}

export function getURLPath(url: string) {
  const matched = splitURL(url);
  return matched ? matched[4] : null;
}
