export function parseDate(dateString: string): string {
  const date = new Date(dateString);
  return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
}
