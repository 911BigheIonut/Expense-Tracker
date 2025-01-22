import { DayOfWeek } from './day-of-week.type';

export interface Summary {
  day: DayOfWeek;
  category: string;
  total: number;
}
