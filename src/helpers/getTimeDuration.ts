import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getTimeDuration = (
  arrival_date: string,
  departure_date: string,
) => {
  const diffInMilliseconds = dayjs(arrival_date).diff(dayjs(departure_date));
  const diffDuration = dayjs.duration(diffInMilliseconds);
  const totalHours = diffDuration.days() * 24 + diffDuration.hours();
  const totalMinute = dayjs(diffDuration.minutes()).format('mm');

  return `${totalHours}:${totalMinute}`;
};
