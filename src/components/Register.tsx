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
import { User } from "../store/types";
import axios from "axios";
import { toggleLogin } from "../store/actions";
import { connect } from "react-redux";

interface RegisterState {
  succeeded: boolean;
  failed: boolean;
  error: string;
  email: string;
  password: string;
  name: string;
  description: string;
  website: string;
  logoUrl: string;
  confirmPassword?: string;
}

interface RegisterProps {
  toggleLogin: () => void;
}

const mapDispatchToProps = (dispatch: any) => ({
  toggleLogin: () => dispatch(toggleLogin())
});

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      description: "",
      website: "",
      logoUrl: "",
      succeeded: false,
      failed: false,
      error: ""
    };
  }
  handleDialogToggle = () => {
    this.setState({
      succeeded: false,
      failed: false
    });
  };

  handleSubmit = (
    email: string,
    password: string,
    name: string,
    description: string,
    website: string,
    logoUrl: string
  ) => {
    const user = {
      email,
      password,
      name,
      description,
      website,
      logoUrl
    };
    axios({
      method: "post",
      url: "/api/users",
      data: user
    })
      .then(() => this.setState({ succeeded: true }))
      .catch(err => {
        if (err.response.status === 409) {
          this.setState({
            failed: true,
            error: `The email address ${this.state.email} is already in use.`
          });
        } else {
          this.setState({
            failed: true,
            error: "There seem to be some issues."
          });
        }
      });
  };
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      return value === this.state.password;
    });
  }
  render() {
    return (
      <div className="register">
        <h1>Register</h1>
        <ValidatorForm
          onSubmit={() => {
            this.handleSubmit(
              this.state.email,
              this.state.password,
              this.state.name,
              this.state.description,
              this.state.website,
              this.state.logoUrl
            );
          }}
        >
          <FormControl>
            <TextValidator
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              value={this.state.email}
              size="small"
              onChange={(e: any) => {
                this.setState({ email: e.currentTarget.value });
              }}
            />
            <br />
            <br />
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
            <br />
            <br />
            <TextValidator
              name="confirm-password"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              validators={["required", "isPasswordMatch"]}
              errorMessages={[
                "this field is required",
                "your passwords don't match"
              ]}
              value={this.state.confirmPassword}
              size="small"
              onChange={(e: any) => {
                this.setState({ confirmPassword: e.currentTarget.value });
              }}
            />
            <br />
            <br />
            <TextValidator
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={this.state.name}
              size="small"
              onChange={(e: any) => {
                this.setState({ name: e.currentTarget.value });
              }}
            />
            <br />
            <br />
            <TextValidator
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={this.state.description}
              size="small"
              onChange={(e: any) => {
                this.setState({ description: e.currentTarget.value });
              }}
            />
            <br />
            <br />
            <TextValidator
              name="website"
              label="Website"
              variant="outlined"
              fullWidth
              value={this.state.website}
              size="small"
              onChange={(e: any) => {
                this.setState({ website: e.currentTarget.value });
              }}
            />
            <br />
            <br />
            <TextValidator
              name="logo-url"
              label="Logo URL"
              variant="outlined"
              fullWidth
              value={this.state.logoUrl}
              size="small"
              onChange={(e: any) => {
                this.setState({ logoUrl: e.currentTarget.value });
              }}
            />
            <br />
            <br />
          </FormControl>
          <br />
          {this.state.email &&
          this.state.password &&
          this.state.name &&
          this.state.password === this.state.confirmPassword ? (
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          ) : (
            <Button variant="contained">Please Complete the Form</Button>
          )}
          <br />
          <br />
          <Link color="inherit" onClick={this.props.toggleLogin}>
            Have an account already?
          </Link>
        </ValidatorForm>
        <Dialog open={this.state.succeeded}>
          <DialogTitle>Successfully Created</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have successfully created an account. Now you can log in and
              promote your events!{" "}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleDialogToggle()}
              variant="contained"
              color="primary"
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.failed}>
          <DialogTitle>Failed</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.error} Please try again!{" "}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleDialogToggle()}
              variant="contained"
              color="primary"
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);
