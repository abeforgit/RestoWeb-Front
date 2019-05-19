export function parseDate(dateString: string): string {
  const date = new Date(dateString);
  return (
    pad(date.getDate()) +
    '/' +
    pad(date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  );
}

export function parseToBootstrapDate(dateString: string): string {
  const date = new Date(dateString);
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  );
}

function pad(nr: number): string {
  return nr < 10 ? '0' + nr : '' + nr;
}
