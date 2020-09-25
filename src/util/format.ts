import { format as dateFnsFormat } from 'date-fns';
import ja from 'date-fns/locale/ja';

export function formatDate(date: Date, format = 'PP'): string {
  return dateFnsFormat(date, format, { locale: ja });
}

export function formatWeekday(
  n: number,
  option: { short?: boolean } = {},
): string {
  const { short } = option;
  const s = ja.localize?.day(n) || '';
  return short ? s.split('')[0] : s;
}
