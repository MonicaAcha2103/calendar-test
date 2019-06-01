import React from "react";
import moment from "moment";
import Timeline from "./Timeline";
const json = require("../../public/sample-data.json");
export default class Scheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      month: props.month,
      year: props.year,
      filteredItems: null
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.date != nextProps.date ||
      prevState.month != nextProps.month ||
      prevState.year != nextProps.year
    ) {
      return {
        date: nextProps.date,
        month: nextProps.month,
        year: nextProps.year
      };
    }

    return null;
  }

  componentDidMount() {
    this.setState({ date: this.props.date });
    this.setState({ month: this.props.month });
    this.setState({ year: this.props.year });
  }

  render() {
    let filterItem = checkDate(
      this.state.date,
      this.state.month,
      this.state.year
    );

    return (
      <div class="tail-scheduler">
        <h2 class="tail-scheduler-header">
          Date :
          {" " +
            this.state.date +
            " " +
            this.state.month +
            " " +
            this.state.year}
        </h2>
        <div>
          {filterItem !== null ? (
            <Timeline schedule={filterItem} />
          ) : (
            <div>"No schedules"</div>
          )}
        </div>
      </div>
    );
  }
}

function checkDate(statedate, statemonth, stateyear) {
  var contact = JSON.parse(JSON.stringify(json));
  var schedules = JSON.parse(contact.default);
  var monthnum = moment()
    .month(statemonth)
    .format("MM");

  let dated = stateyear + "-" + monthnum + "-" + statedate;
  let stateDate = moment(new Date(dated)).format("YYYY-MM-DD");

  var filteredItems = schedules.filter(element => {
    var event = moment(new Date(element.startTime)).format("YYYY-MM-DD");
    return event == stateDate;
  });

  if (filteredItems.length) {
    return filteredItems;
  }
  return null;
}
// function renderItems(filterItem) {
//   // console.log(filterItem);
//   return filterItem.map(i => {
//     return (
//       <div>
//         <div>{i.startTime}</div>
//         <div>{i.endTime}</div>
//         <div>{i.title}</div>
//       </div>
//     );
//   });
// }
