import React from "react";

import {
  Button,
  // IconButton,
  // Select,
  // MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setUser } from "../store/actions"
import axios from "axios";
import { connect } from "react-redux";

interface loginState {
  email: string
  password: string
  succeeded: boolean
  failed: boolean
}

interface loginProps {
  getUser: (email:string, password:string) => void
}

const mapDispatchToProps = (dispatch: any) => ({
  getUser: (email:string, password:string) => {
    const basicAuth = 'Basic ' + btoa(email + ":" + password);
    console.log(basicAuth);
    axios(
      {
        method: 'get',
        url: `/api/users`,
        headers: { 'authorization': basicAuth }
      }
    )
    .then((response) => {
      console.log(response.data)
      dispatch(setUser(response.data))
    })
    .catch((error) => {
      console.log(error.response)
    })
  }
})



class Login extends React.Component<any, loginState>{
  constructor(props:{}) {
    super(props)
    this.state = {
      email: "",
      password: "",
      succeeded: false,
      failed: false
    }
  }
  handleSubmit = (email:string, password:string) => {
    this.props.getUser(email, password);
  }
  render() {
    return (
    <div className="login">
      <h1>Login</h1>
      <ValidatorForm
        onSubmit={
          () => {
            this.handleSubmit(this.state.email, this.state.password);
          }
        }
      >
        <FormControl>
        <TextValidator 
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", 'email is not valid']}
            value={this.state.email}
            size="small"
            onChange={(e: any) => {
              this.setState({ email: e.currentTarget.value });
            }}
          />
          <br/>
          <br/>
          <TextValidator 
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            validators={["required"]}
            errorMessages={["this field is required"]}
            value={this.state.password}
            size="small"
            onChange={(e: any) => {
              this.setState({ password: e.currentTarget.value });
            }}
          />
        </FormControl>
        <br/>
        <br/>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
        
      </ValidatorForm>
    </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)