import React from "react";
import moment from "moment";

const padLeft = (number, padding) =>
  padding.substring(number.toString().length) + number;

const toTimeString = (hours, minutes) =>
  `${padLeft(hours, "00")}:${padLeft(minutes, "00")}`;

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.normalizeTimeBlocks(props.schedules);
  }
  componentDidMount() {
    // console.log(this.props.schedules);
  }
  normalizeTimeBlocks = schedules => {
    const blockSize = 15;
    const timeBlocks = {};
    const eventBlocks = {};
    schedules.forEach(schedule => {
      // let schedule = schedules[0];
      const startTime = moment(new Date(schedule.startTime)).format("HH:mm");
      const endTime = moment(new Date(schedule.endTime)).format("HH:mm");
      let blockSpan = 0;

      if (startTime === "00:00" && endTime === "00:00") {
        blockSpan = Math.ceil((24 * 60) / blockSize);
      } else {
        const startSplit = startTime.split(":");
        let hour = parseInt(startSplit[0]);
        let minutes = parseInt(startSplit[1]);
        let timeString = startTime;

        while (timeString !== endTime) {
          blockSpan++;
          minutes += blockSize;

          if (minutes >= 60) {
            minutes = 0;
            hour += 1;
          }

          timeString = toTimeString(hour, minutes);
        }
      }
      eventBlocks[startTime] = eventBlocks[startTime] || {};

      eventBlocks[startTime] = Object.assign({}, schedule, {
        blockSpan
      });
    });

    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += blockSize) {
        const timeString = toTimeString(hour, minutes);

        timeBlocks[timeString] = eventBlocks[timeString] || {};
      }
    }

    this.timeBlocks = timeBlocks;
  };
  render() {
    const rows = [];
    var emp = {};
    for (let time in this.timeBlocks) {
      const block = this.timeBlocks[time];

      var odd = time.slice(-2).valueOf();

      rows.push(
        <Row className={odd % 10 !== 0 ? "odd" : "even"}>
          <TimeCell className="calendar__cell--time-col">{time}</TimeCell>

          <AppointmentCell appointment={block} />
        </Row>
      );
    }

    return (
      <div className="calendar">
        <div className="calendar__body">
          {rows}

          <Row className="calendar__row--deco-last-row">
            <TimeCell className="calendar__cell--time-col">00:00</TimeCell>
            <AppointmentCell appointment={emp} />
          </Row>
        </div>
      </div>
    );
  }
}

const Row = props => (
  <div {...props} className={`calendar__row ${props.className}`} />
);

const Cell = props => (
  <div {...props} className={`calendar__cell ${props.className}`} />
);

const TimeCell = props => (
  <Cell {...props} className={`calendar__cell--time ${props.className}`} />
);

const AppointmentCell = props => {
  const { appointment } = props;
  let appointmentComponent = null;

  if (Object.keys(appointment).length !== 0) {
    const { blockSpan } = appointment;

    const height = 100 * (blockSpan / 2) + "%";
    const borderPixels = blockSpan / 2 + 1 + "px";
    const cssHeight = "calc(" + height + " + " + borderPixels + ")";

    appointmentComponent = (
      <Appointment style={{ height: cssHeight }} appointment={appointment} />
    );
  }

  return (
    <Cell
      {...props}
      className={`calendar__cell--appointment ${props.className}`}
    >
      {appointmentComponent}
    </Cell>
  );
};

const Appointment = props => {
  const { appointment } = props;

  var startTime = moment(new Date(appointment.startTime)).format("HH:mm");
  var endTime = moment(new Date(appointment.endTime)).format("HH:mm");
  // console.log(startTime);
  // console.log(endTime);
  const wholeDay = startTime === "00:00" && endTime === "00:00";

  const time = wholeDay ? "Todo el día" : `${startTime} - ${endTime}`;
  // console.log(time);
  return (
    <div {...props} className="calendar__appointment">
      <span className="calendar__appointment__name">
        {appointment.title + `  `}
      </span>
      <span className="calendar__appointment__time">[{time}]</span>
    </div>
  );
};
