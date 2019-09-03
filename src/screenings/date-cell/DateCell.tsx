import React from "react";
import { DateTime } from "luxon";

interface DateCellProps {
  readonly date: Date;
}

export const DateCell = ({ date }: DateCellProps) => {
  const shortDate = DateTime.fromJSDate(date).toFormat("d/MM/yyyy h:mm");
  return (
    <span title={shortDate}>
      {shortDate}
    </span>
  );
};
