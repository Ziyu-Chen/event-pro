import React from "react";
import { connect } from "react-redux";
import BuildEvent from "./BuildEvent";
import EventInfo from "./EventInfo";
import EditEvent from "./EditEvent";
import { State } from "../store/types";

const mapStateToProps = (state: State) => ({
  edittedEventId: state.edittedEventId
});

interface SecondPageProps {
  edittedEventId: number;
}

class SecondPage extends React.Component<SecondPageProps, {}> {
  render() {
    return (
      <div className="second-page">
        <EventInfo />
        <BuildEvent />
        {this.props.edittedEventId ? <EditEvent /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(SecondPage);
