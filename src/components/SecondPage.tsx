import React from "react";
import { connect } from "react-redux";
import BuildEvent from "./BuildEvent";
import EventInfo from "./EventInfo";

// interface SecondPageProps{

// }

// const mapStateToProps = (state: State) => (
//   {
//     showLogin: state.showLogin
//   }
// )

class SecondPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="second-page">
        <EventInfo />
        <BuildEvent />
      </div>
    );
  }
}

export default connect()(SecondPage);
