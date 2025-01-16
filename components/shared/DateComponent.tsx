import {
  format,
  parseISO,
  formatRelative,
  subDays,
  formatDistance,
} from "date-fns";
import { fr, enGB } from "date-fns/locale";
import React from "react";

interface DateComponentProps {
  dateString: string | null;
  creationDate: string | null;
}

const DateComponent: React.FC<DateComponentProps> = ({
  dateString,
  creationDate,
}) => {
  if (dateString) {
    const date = parseISO(dateString!);
    const formattedDate = formatDistance(subDays(date, 0), new Date(), {
      addSuffix: true,
      locale: fr,
    });

    return <span>{formattedDate}</span>;
  } else {
    const creation = parseISO(creationDate!);
    const formattedCreation = formatRelative(subDays(creation, 0), new Date(), {
      locale: fr,
    });

    return <span>{formattedCreation}</span>;
  }
};

export default DateComponent;
