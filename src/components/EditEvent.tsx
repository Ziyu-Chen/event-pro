import React from "react";
import {
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { State, Event } from "../store/types";
import { connect } from "react-redux";
import countriesToCurrencies from "../data/countriesToCurrencies.json";
import categories from "../data/categories.json";
import axios from "axios";
import { setEvents, setEdittedEvent, showEventInfo } from "../store/actions";

interface EditEventState {
  name: string;
  category: string;
  startingDate: string;
  endingDate: string;
  description: string;
  photoUrl: string;
  countryCode: string;
  city: string;
  address: string;
  price: number;
  currencyCode: string;
  succeeded: boolean;
  failed: boolean;
  error: string;
}

interface EditEventProps {
  email: string;
  password: string;
  id: number;
  events: Event[];
  edittedEventId: number;
  getEvents: (email: string, password: string) => Promise<number>;
  showEventInfo: () => void;
}

const mapStateToProps = (state: State) => ({
  id: state.user.id,
  email: state.user.email,
  password: state.user.password,
  events: state.events,
  edittedEventId: state.edittedEventId
});

const mapDispatchToProps = (dispatch: any) => ({
  getEvents: (email: string, password: string) => {
    const basicAuth = "Basic " + btoa(email + ":" + password);
    console.log(basicAuth);
    return axios({
      method: "get",
      url: `/api/events`,
      headers: { authorization: basicAuth }
    })
      .then(response => {
        dispatch(setEvents(response.data));
        return response.status;
      })
      .catch(error => {
        console.log(error.response);
        return error.response.status;
      });
  },
  showEventInfo: () => dispatch(showEventInfo())
});

class EditEvent extends React.Component<EditEventProps, EditEventState> {
  constructor(props: EditEventProps) {
    super(props);
    const event = this.props.events.filter((event: Event) => {
      return event.id === this.props.edittedEventId;
    })[0];
    console.log(event);
    this.state = {
      name: event.name,
      category: event.category,
      startingDate: event.startingDate.slice(0, 10),
      endingDate: event.endingDate.slice(0, 10),
      description: event.description,
      photoUrl: event.photoUrl,
      countryCode: event.countryCode,
      city: event.city,
      address: event.address,
      price: event.price,
      currencyCode: event.currencyCode,
      succeeded: false,
      failed: false,
      error: ""
    };
  }
  componentWillMount() {
    ValidatorForm.addValidationRule(
      "startingDateValidator",
      (value: string) => {
        const startingDate = new Date(value);
        const endingDate = new Date(this.state.endingDate);
        console.log(startingDate);
        console.log(endingDate);
        return endingDate >= startingDate;
      }
    );
    ValidatorForm.addValidationRule("endingDateValidator", (value: string) => {
      const endingDate = new Date(value);
      const startingDate = new Date(this.state.startingDate);
      console.log(startingDate);
      console.log(endingDate);
      return endingDate >= startingDate;
    });
  }
  handleDialogToggle = () => {
    this.setState({
      succeeded: false,
      failed: false
    });
  };
  handleSubmit = (
    edittedEventId: number,
    name: string,
    category: string,
    startingDate: string,
    endingDate: string,
    description: string,
    photoUrl: string,
    countryCode: string,
    city: string,
    address: string,
    price: number,
    currencyCode: string,
    creatorId: number
  ) => {
    const event = {
      id: edittedEventId,
      name,
      category,
      startingDate,
      endingDate,
      description,
      photoUrl,
      countryCode,
      city,
      address,
      price,
      currencyCode,
      creatorId
    };
    axios({
      method: "put",
      url: "/api/events",
      data: event
    })
      .then(response => {
        if (response.status === 201) {
          this.setState({ succeeded: true });
          this.props.getEvents(this.props.email, this.props.password);
        }
      })
      .catch(error => {
        this.setState({
          failed: true,
          error: "Your event has not been updated."
        });
      });
  };
  render() {
    return (
      <div className="build-event">
        <h1>Edit Event</h1>
        <ValidatorForm
          onSubmit={() => {
            this.handleSubmit(
              this.props.edittedEventId,
              this.state.name,
              this.state.category,
              this.state.startingDate,
              this.state.endingDate,
              this.state.description,
              this.state.photoUrl,
              this.state.countryCode,
              this.state.city,
              this.state.address,
              this.state.price,
              this.state.currencyCode,
              this.props.id
            );
          }}
        >
          <TextValidator
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            validator={["required"]}
            errorMessages={["this field is required"]}
            value={this.state.name}
            size="small"
            onChange={(e: any) => {
              this.setState({ name: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          <Typography>Category: {this.state.category}</Typography>
          <br />
          <br />
          <TextValidator
            name="starting-data"
            label="Available Starting from"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            type="date"
            fullWidth
            validator={["required", "startingDateValidator"]}
            errorMessages={[
              "this field is required",
              "The starting date is after the ending date"
            ]}
            value={this.state.startingDate}
            size="small"
            onChange={(e: any) => {
              this.setState({ startingDate: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          <TextValidator
            name="ending-data"
            label="Available Until"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            type="date"
            fullWidth
            validator={["required", "endingDateValidator"]}
            errorMessages={[
              "this field is required",
              "The starting date is after the ending date"
            ]}
            value={this.state.endingDate}
            size="small"
            onChange={(e: any) => {
              this.setState({ endingDate: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          <TextValidator
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            validator={["required"]}
            errorMessages={["this field is required"]}
            value={this.state.description}
            size="small"
            onChange={(e: any) => {
              this.setState({ description: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          <TextValidator
            name="photo-url"
            label="Photo URL"
            variant="outlined"
            fullWidth
            value={this.state.photoUrl}
            size="small"
            onChange={(e: any) => {
              this.setState({ photoUrl: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          <Typography>
            Country:{" "}
            {
              countriesToCurrencies.filter(item => {
                return item.countryCode === this.state.countryCode;
              })[0].country
            }
          </Typography>
          <br />
          <br />
          <TextValidator
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            validator={["required"]}
            errorMessages={["this field is required"]}
            value={this.state.city}
            size="small"
            onChange={(e: any) => {
              this.setState({ city: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          <TextValidator
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            validator={["required"]}
            errorMessages={["this field is required"]}
            value={this.state.address}
            size="small"
            onChange={(e: any) => {
              this.setState({ address: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          <TextValidator
            name="price"
            size="small"
            fullWidth
            label={`Ticket Price ${
              this.state.currencyCode
                ? "(" +
                  countriesToCurrencies.filter((item: any) => {
                    return item.currencyCode === this.state.currencyCode;
                  })[0].currency +
                  ")"
                : ""
            }`}
            type="number"
            variant="outlined"
            validators={["minNumber:0", "required"]}
            errorMessages={["cannot be negative", "this field is required"]}
            InputProps={{ inputProps: { min: 0 } }}
            value={this.state.price}
            onChange={(e: any) => {
              this.setState({ price: e.currentTarget.value });
            }}
          />
          <br />
          <br />
          {this.state.name &&
          this.state.category &&
          this.state.startingDate &&
          this.state.endingDate &&
          this.state.description &&
          this.state.countryCode &&
          this.state.city &&
          this.state.address &&
          this.state.price ? (
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          ) : (
            <Button variant="contained">Submit</Button>
          )}
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={this.props.showEventInfo}
          >
            Cancel
          </Button>
        </ValidatorForm>
        <Dialog open={this.state.succeeded}>
          <DialogTitle>Successfully Updated</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Congratulations! You have successfully updated this event!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.showEventInfo}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
