import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  CardMedia
} from "@material-ui/core";
import { User, State, Event } from "../store/types";
import { toggleLogin, setEdittedEvent, setEvents } from "../store/actions";
import { connect } from "react-redux";
import moment from "moment";
import countriesToCurrencies from "../data/countriesToCurrencies.json";
import axios from "axios";

const mapStateToProps = (state: State) => ({
  events: state.events,
  email: state.user.email,
  password: state.user.password
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
  setEdittedEvent: (id: number) => dispatch(setEdittedEvent(id))
});

interface EventInfoProps {
  events: Event[];
  email: string;
  password: string;
  getEvents: (email: string, password: string) => Promise<number>;
  setEdittedEvent: (id: number) => void;
}

interface EventInfoState {
  showDialog: boolean;
  deletedEvent: number;
}

class EventInfo extends React.Component<EventInfoProps, EventInfoState> {
  constructor(props: EventInfoProps) {
    super(props);
    this.state = {
      showDialog: false,
      deletedEvent: 0
    };
  }
  handleDelete = (id: number) => {
    axios
      .delete("/api/events/" + id)
      .then(response => {
        if (response.status === 200) {
          this.handleDialogToggle();
          this.setState({ deletedEvent: 0 });
          this.props.getEvents(this.props.email, this.props.password);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  handleDialogToggle = () => {
    this.setState({
      showDialog: !this.state.showDialog
    });
  };
  render() {
    return (
      <div className="event-info">
        <h1>My Events</h1>
        {this.props.events.map(event => (
          <div key={event.id}>
            <br />
            <Card>
              <CardHeader
                title={event.name}
                subheader={`${moment(event.startingDate).format(
                  "YYYY[/]MM[/]DD"
                )}-${moment(event.endingDate).format("YYYY[/]MM[/]DD")}`}
              />
              {event.photoUrl ? (
                <img
                  src={event.photoUrl}
                  alt={event.name}
                  style={{ height: "200px" }}
                />
              ) : null}
              <CardContent>
                <Typography align="left">
                  {"Category: " + event.category}
                </Typography>
                <br />
                <Typography align="left">
                  {"Description: " + event.description}
                </Typography>
                <br />
                <Typography align="left">{`Address: ${event.address}, ${
                  event.city
                }, ${
                  countriesToCurrencies.filter(item => {
                    return item.countryCode === event.countryCode;
                  })[0].country
                }`}</Typography>
                <br />
                <Typography align="left">
                  {`Price: ${event.price} ${
                    countriesToCurrencies.filter(item => {
                      return item.currencyCode === event.currencyCode;
                    })[0].currency
                  }`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.props.setEdittedEvent(event.id)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    this.handleDialogToggle();
                    this.setState({ deletedEvent: event.id });
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
            <br />
          </div>
        ))}
        <Dialog open={this.state.showDialog}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this event?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleDelete(this.state.deletedEvent)}
              variant="contained"
              color="secondary"
            >
              Yes
            </Button>
            <Button
              onClick={() => this.handleDialogToggle()}
              variant="contained"
              color="primary"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);
