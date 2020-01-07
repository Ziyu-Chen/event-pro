import React from "react";
import Login from "./Login";
import Register from "./Register";
import { State } from "../store/types";
import { connect } from "react-redux";

interface FirstPageProps{
  showLogin: boolean
}

const mapStateToProps = (state: State) => (
  {
    showLogin: state.showLogin
  }
)

class FirstPage extends React.Component<FirstPageProps, {}> {
  render() {
    return (
      <div className="first-page">
        {this.props.showLogin ? <Login /> : <Register />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FirstPage);
