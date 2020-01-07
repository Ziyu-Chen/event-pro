import React from "react";
import { connect } from "react-redux";

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
        Yes
      </div>
    );
  }
}

export default connect()(SecondPage);
