import { useState } from "react";
import dayjs from "dayjs";
import events from "../events.json";

export default function Calendar() {
  const [current, setCurrent] = useState(dayjs());

  const monthDates = () => {
    const start = current.startOf("month").startOf("week");
    const end = current.endOf("month").endOf("week");

    const dates = [];
    let date = start.clone();

    while (date.isBefore(end)) {
      dates.push(date);
      date = date.add(1, "day");
    }
    return dates;
  };

  const isToday = (date) =>
    date.isSame(dayjs(), "day");

  const eventsOfDate = (date) =>
    events.filter(ev => dayjs(ev.date).isSame(date, "day"));

  return (
    <div className="calendar-container">

      <div className="top-bar">
        <button onClick={() => setCurrent(current.subtract(1,"month"))}>Prev</button>
        <h2>{current.format("MMMM YYYY")}</h2>
        <button onClick={() => setCurrent(current.add(1,"month"))}>Next</button>
      </div>

      <div className="grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div className="day-name" key={d}>{d}</div>
        ))}

        {monthDates().map(date => (
          <div
            key={date}
            className={`cell ${isToday(date) ? "today" : ""}`}
          >
            <div className="date-num">{date.date()}</div>

            <div className="events">
              {eventsOfDate(date).map((ev,i) => (
                <div className="event" key={i}>
                  {ev.title}
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
