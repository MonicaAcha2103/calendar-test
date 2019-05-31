import React from "react";
import moment from "moment";

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

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.setState({ date: this.props.date });
    }
    if (prevProps.month !== this.props.month) {
      this.setState({ month: this.props.month });
    }
    if (prevProps.year !== this.props.year) {
      this.setState({ year: this.props.year });
    }
    var contact = JSON.parse(JSON.stringify(json));
    var schedules = JSON.parse(contact.default);
    var monthnum = moment()
      .month(this.state.month)
      .format("MM");

    let dated = this.state.year + "-" + monthnum + "-" + this.state.date;
    let stateDate = moment(new Date(dated)).format("YYYY-MM-DD");

    var filteredItems = schedules.filter(element => {
      var event = moment(new Date(element.startTime)).format("YYYY-MM-DD");
      return event == stateDate;
    });

    if (filteredItems.length) {
      this.setState({ filteredItems });
    }
    // console.log(this.state.filteredItems);
  }
  componentDidMount() {
    this.setState({ date: this.props.date });
    this.setState({ month: this.props.month });
    this.setState({ year: this.props.year });
  }

  render() {
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
        <div className="scheduler-table-div">
          <table className="scheduler-table">
            <thead>
              <tr>
                <td>
                  {" "}
                  Date :
                  {this.state.date +
                    " " +
                    this.state.month +
                    " " +
                    this.state.year}
                </td>
              </tr>
            </thead>

            <tbody />
          </table>
        </div>
      </div>
    );
  }
}
