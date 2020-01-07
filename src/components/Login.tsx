import React from "react";

import {
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Link
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setUser, toggleLogin } from "../store/actions"
import axios from "axios";
import { connect } from "react-redux";

interface LoginState {
  email: string
  password: string
  failed: boolean
  error: string
}

interface LoginProps {
  getUser: (email:string, password:string) => Promise<number>
  toggleLogin: () => void
}

const mapDispatchToProps = (dispatch: any) => ({
  getUser: (email:string, password:string) => {
    const basicAuth = 'Basic ' + btoa(email + ":" + password);
    return axios(
      {
        method: 'get',
        url: `/api/users`,
        headers: { 'authorization': basicAuth }
      }
    )
    .then((response) => {
      dispatch(setUser(response.data))
      return response.status
    })
    .catch((error) => {
      return error.response.status  
    })
  },
  toggleLogin: () => dispatch(toggleLogin())
})



class Login extends React.Component<LoginProps, LoginState>{
  constructor(props:LoginProps) {
    super(props)
    this.state = {
      email: "",
      password: "",
      failed: false,
      error: ""
    }
  }
  handleDialogToggle = () => {
    this.setState({failed: false})
  }
  handleSubmit = async (email:string, password:string) => {
    const statusCode = await this.props.getUser(email, password);
    if (statusCode === 200) {

    } else if (statusCode === 401) {
      this.setState({password: "", failed: true, error: "Your password or email address is not correct."})
    } else if (statusCode === 500) {
      this.setState({password: "", failed: true, error: "The server is down."})
    }
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
        {
          this.state.email && this.state.password ? 
          <Button type="submit" variant="contained" color="primary">Submit</Button> :
          <Button variant="contained">Submit</Button>
        }
      </ValidatorForm>
      <br/>
      <Link color="inherit" onClick={this.props.toggleLogin}>Do not have an account yet?</Link>
      <Dialog open={this.state.failed}>
        <DialogTitle>Login Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.state.error} Please try again! </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogToggle} variant="contained" color="primary">Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)