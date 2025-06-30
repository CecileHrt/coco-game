import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
dayjs.locale("fr");

dayjs.extend(relativeTime);

export default function formatRelativeTime(date) {
  return dayjs().to(dayjs(date)); // ex : "il y a 3 jours"
}
