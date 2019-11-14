import React, { Component } from 'react';
import {DraggableCore} from 'react-draggable';
import settings from './utils/settings';
import getIncrementDifference from './utils/getIncrementDifference';

export default class Resizer extends Component {
  state = {
    resize: 0,
    resizing: false
  };

  render() {
    const {scaled} = this.props;
    const height = scaled ? settings.scaled : settings.height;
    const width = scaled ? settings.scaled : settings.width;

    return (
      <DraggableCore
        allowAnyClick
        grid={[width, height]}
        onStart={this.handleResizeStart}
        onDrag={this.handleResize}
        onStop={this.handleResizeStop}>
        <div className="timesheet__overlay-resizer draggable-cancel" />
      </DraggableCore>
    );
  }

  handleResizeStart = () => {
    const {time, schedule} = this.props;
    const {start, end} = schedule;

    this.setState({
      // Difference from start date
      // (start - end) / increment
      resize: getIncrementDifference(start, end, time.increment),
    });
  }

  handleResize = (evt, position) => {
    const height = this.props.scaled ? settings.scaled : settings.height;
    
    this.setState({
      resize: this.state.resize + (position.deltaY / height),
      resizing: true
    });
  }

  handleResizeStop = () => {
    if (!this.state.resizing) {
      return;
    }

    const {resize} = this.state;
    const {schedules, schedule, source, time} = this.props;
    const {increment} = time;
    const end = schedule.start.clone()
      .add(resize * increment.hours, 'hours')
      .add(resize * increment.minutes, 'minutes');

    if ( this.props.validate({ day: source.day, schedule, start: schedule.start, end }) ) {
      this.props.onResize(source.day, source.index, {
        ...schedule,
        end
      });
    }

    this.setState({
      resize: 0,
      resizing: false
    });
  }
}
