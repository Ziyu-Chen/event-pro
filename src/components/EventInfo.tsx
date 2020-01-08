import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { User, State, Event } from "../store/types";
import { toggleLogin, setEdittedEvent } from "../store/actions";
import { connect } from "react-redux";
import moment from "moment";
import countriesToCurrencies from "../data/countriesToCurrencies.json";
const mapStateToProps = (state: State) => ({
  events: state.events
});

const mapDispatchToProps = (dispatch: any) => ({
  setEdittedEvent: (id: number) => dispatch(setEdittedEvent(id))
});

interface EventInfoProps {
  events: Event[];
  setEdittedEvent: (id: number) => void;
}

class EventInfo extends React.Component<EventInfoProps, {}> {
  render() {
    return (
      <div className="event-info">
        {this.props.events.map(event => (
          <div key={event.id}>
            <br />
            <Card>
              <CardContent>
                <Typography>{event.name}</Typography>
                <Typography>{event.category}</Typography>
                <Typography>
                  {moment(event.startingDate).format("YYYY[/]MM[/]DD")}-
                  {moment(event.endingDate).format("YYYY[/]MM[/]DD")}
                </Typography>
                <Typography>{event.description}</Typography>
                <Typography>
                  {
                    countriesToCurrencies.filter(item => {
                      return item.countryCode === event.countryCode;
                    })[0].country
                  }
                </Typography>
                <Typography>{event.city}</Typography>
                <Typography>{event.address}</Typography>
                <Typography>
                  {event.price}{" "}
                  {
                    countriesToCurrencies.filter(item => {
                      return item.currencyCode === event.currencyCode;
                    })[0].currency
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => this.props.setEdittedEvent(event.id)}>
                  Edit
                </Button>
              </CardActions>
            </Card>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);
