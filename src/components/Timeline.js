import React from "react";
export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log(this.props.schedule);
  }
  render() {
    return (
      <div>
        <h1>data hai</h1>

        {this.props.schedule.map(row => {
          return (
            <div key={row.title}>
              <p>{row.startTime}</p>
              <p>{row.endTime}</p>
              <p>{row.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
