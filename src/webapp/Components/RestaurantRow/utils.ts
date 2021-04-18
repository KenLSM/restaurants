import { OpeningTime } from '@/Redux/Reducers/results';

export const INT_TO_DAY = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const padTime = (time: number): string => {
  return Math.floor(time).toFixed(0).padStart(2, '0');
};
export const minTimeToHours = (time: number): string => {
  const hours = time / 60;
  const minutes = time % 60;

  if (hours >= 12) {
    return `${padTime(hours - 12)}:${padTime(minutes)}pm`;
  }
  return `${padTime(hours)}:${padTime(minutes)}am`;
};

export const isNowOpen = (time: OpeningTime) => {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const day = (now.getDay() + 6) % 7;

  return nowMins >= time.start && nowMins <= time.end && day == time.day;
};
