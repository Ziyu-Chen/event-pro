import React from "react";
import { connect } from "react-redux";
import BuildEvent from "./BuildEvent";
import EventInfo from "./EventInfo";
import EditEvent from "./EditEvent";
import { State } from "../store/types";
import "./SecondPage.css";

const mapStateToProps = (state: State) => ({
  edittedEventId: state.edittedEventId,
  showEventInfo: state.showEventInfo
});

interface SecondPageProps {
  edittedEventId: number;
  showEventInfo: boolean;
}

class SecondPage extends React.Component<SecondPageProps, {}> {
  render() {
    return (
      <div className="second-page-container">
        <div className="second-page">
          {this.props.edittedEventId ? (
            <EditEvent />
          ) : this.props.showEventInfo ? (
            <EventInfo />
          ) : (
            <BuildEvent />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SecondPage);
