import React, {PropTypes as T} from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import c from 'classnames';
import generate from './utils/generate';
import getIncrementDifference from './utils/getIncrementDifference';
import settings from './utils/settings';
import Tooltip from 'rc-tooltip';
import DraggableLayer from './DraggableLayer';
import Resizer from './Resizer';
import Popover from './Popover';
import HoverCard from './HoverCard';

class Timesheet extends React.Component {
  static propTypes = {
    time: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      increment: PropTypes.shape({
        start: PropTypes.number,
        end: PropTypes.number,
      }).isRequired
    }).isRequired,
    schedules: PropTypes.object.isRequired,
    sections: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    professors: PropTypes.array.isRequired,
    onStore: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    corny: PropTypes.bool,
    request: PropTypes.bool,
    requester: PropTypes.object,
    onRequestAction: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    corny: false,
    request: false
  };

  dayWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  state = {
    schedules: this.props.schedules,
    times: generate(
      this.props.time.start,
      this.props.time.end,
      this.props.time.increment
    ),
    // Flag if a schedule was recently created
    recent: false,
    // Data / cache of what we're editing
    // ({ day: String, index: Number (arrayIndex), time: Number (timeIndex) })
    edit: null,
    // Flag if we're in create mode
    editing: false,
    scaled: false,
    // Data / cache of what we're editing
    // ({ day: String, index: Number (arrayIndex), time: Number (timeIndex) })
    hover: null,
    // Flag if we're hovering on a schedule
    hovering: false,
    now: moment()
  };

  componentDidMount() {
    this.now = setInterval(() => {
      this.setState({ now: this.state.now.add(1, 'seconds') });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.now);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.schedules === this.props.schedules) {
      return;
    }

    this.setState({ schedules: nextProps.schedules });
  }

  render() {
    const {times, schedules, editing, edit, recent, now, scaled, hovering, hover} = this.state;
    const {time, professors, subjects, sections, disabled, corny} = this.props;
    const height = scaled ? settings.scaled : settings.height;
    const width = scaled ? settings.scaled : settings.width;

    return (
      <div className={c('timesheet', {
        'timesheet--disabled': disabled,
        'timesheet--scaled': scaled
      })}>

        <div className="timesheet__heading">
          <div className="timesheet__heading-column timesheet__heading-column--narrow">
            Time
          </div>

          {Object.keys(schedules).map((schedule, i) =>
            <div className="timesheet__heading-column" key={i}>{schedule}</div>
          )}
        </div>

        <div className="timesheet__body">
          <div className="timesheet__column timesheet__column--narrow">
            {times.map((time, i) =>
              <div className="timesheet__item" key={i}>
                <div className="timesheet__time">{time.start.format('hh:mm a')} - {time.end.format('hh:mm a')}</div>
              </div>
            )}
          </div>

          {Object.keys(schedules).map((day, i) =>
            <div className="timesheet__column" key={i}>
              {times.map((time, ii) =>
                <div className="timesheet__item"
                  onDoubleClick={this.handleCreate(day, ii)}
                  key={ii} />
              )}

              {schedules[day].map((schedule, ii) => {
                // console.log(this.dayWeek[now.day() - 1] === day)
                const current = now.isSameOrAfter(schedule.start) && now.isSameOrBefore(schedule.end) && this.dayWeek[now.day() - 1] === day;
                const done = now.isAfter(schedule.end);

                const content = (
                  <div onDoubleClick={this.handleEdit(day, ii)}
                    onMouseEnter={this.handleMouseEnter(day, ii)}
                    onMouseLeave={this.handleMouseLeave}
                    className={c('timesheet__overlay', {
                      'timesheet__overlay--current': !schedule.request && current,
                      'timesheet__overlay--done': !schedule.request && done,
                      'timesheet__overlay--requested': schedule.request
                    })}
                    style={{
                      transform: `translateY(${height * times.findIndex((time) => time.start.isSame(schedule.start))}px)`,
                      height: height * getIncrementDifference(schedule.start, schedule.end, this.props.time.increment)
                    }}
                    key={ii}>
                    <div className="timesheet__overlay-inner">
                      {!scaled && (schedule.request || current || done) && <div className="timesheet__overlay-status">
                        {schedule.request
                          ? (editing && schedules[edit.day][edit.index] === schedule
                            ? 'Requested'
                            : <Tooltip overlay={`Requested by ${schedule.requester.user.name} of Department ${schedule.requester.department.name}`} placement="right">
                              <span>Requested</span>
                            </Tooltip>)
                          : (current ? 'On-going' : 'Done')}
                      </div>}

                      {!scaled && !editing && !this.props.request && schedule.request && <button className="timesheet__overlay-action" onClick={this.handleRequestAction(day, ii, true)}>
                        <Tooltip overlay="Accept" placement="right"><span>✔</span></Tooltip>
                      </button>}

                      {!scaled && !editing && schedule.request && (!this.props.request || (this.props.request && this.props.requester.id === schedule.requester.id)) && <button className={c('timesheet__overlay-action', {
                        'timesheet__overlay-action--negative': !this.props.request
                      })} onClick={this.handleRequestAction(day, ii, false)}>
                        <Tooltip overlay={this.props.request ? 'Cancel' : 'Decline'} placement="right"><span>✕</span></Tooltip>
                      </button>}

                      {!disabled && !scaled && !editing && !schedule.request && !this.props.request && <button className="timesheet__overlay-action"
                        onClick={this.handleDelete(day, ii)}>
                        <Tooltip overlay="Delete" placement="right"><span>✕</span></Tooltip>
                      </button>}

                      {!scaled && <h6 className="timesheet__overlay-project">{schedule.data.section.name || 'Section Name'}</h6>}
                      {!scaled && <h6 className="timesheet__overlay-other">{schedule.data.professor.name || 'Professor Name'}</h6>}
                      {!scaled && <h4 className="timesheet__overlay-title">{schedule.data.subject.name || 'Subject Name'}</h4>}

                      {!disabled && <Resizer
                        schedules={schedules}
                        schedule={schedule}
                        source={{ day, index: ii }}
                        time={time}
                        times={times}
                        scaled={scaled}
                        validate={this.validate}
                        onResize={this.handleResize} />}

                      {corny && !scaled && <div className="timesheet__overlay-time">
                        {schedule.start.format('hh:mm a')} <br /> {schedule.end.format('hh:mm a')}
                      </div>}
                    </div>
                  </div>
                );

                if (disabled) {
                  return content;
                }

                return (
                  <DraggableLayer
                    source={{ day, index: ii }}
                    schedule={schedule}
                    schedules={schedules}
                    time={time}
                    times={times}
                    scaled={scaled}
                    validate={this.validate}
                    onDrag={this.handleDrag}
                    key={ii}>{content}</DraggableLayer>
                );
              })}
            </div>
          )}

          {!disabled && editing && <Popover
            schedules={schedules}
            schedule={schedules[edit.day][edit.index]}
            source={edit}
            recent={recent}
            subjects={subjects}
            professors={professors}
            sections={sections}
            scaled={scaled}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit} />}

          {scaled && hovering && <HoverCard
            ref={(c) => this.hover = c}
            corny={corny}
            schedules={schedules}
            schedule={schedules[hover.day][hover.index]}
            source={hover}
            current={now.isSameOrAfter(schedules[hover.day][hover.index].start) && now.isSameOrBefore(schedules[hover.day][hover.index].end)}
            done={now.isAfter(schedules[hover.day][hover.index].end)} />}
        </div>
      </div>
    );
  }

  /**
   * Validate if there are no overlapping stuff
   * @param {Object: day, schedule, start, end} data Schedule we're validating
   */
  validate = (dest) => {
    const {schedules, times} = this.state;
    const day = schedules[dest.day];
    const last = times[times.length -1];
    // Check if start and end time are not the same
    // Check if there are overlapping schedules
    // Must start before and after start
    // Must end before and after end
    return dest.start < dest.end &&
      dest.end <= last.end &&
      !day.find((schedule) =>
        dest.schedule !== schedule &&
        // http://stackoverflow.com/a/325964/2698227
        Math.max(dest.start, schedule.start) < Math.min(dest.end, schedule.end)
      );
  }

  handleCancel = () =>  {
    if (this.state.recent) {
      const {schedules, edit} = this.state;
      schedules[edit.day].splice(edit.index, 1);

      this.setState({
        edit: null,
        editing: false,
        recent: false,
        schedules
      });

      return;
    }

    this.setState({
      edit: null,
      editing: false
    });
  }

  handleSubmit = (schedule) => {
    const {day, index} = this.state.edit;

    const promise = this.state.recent
      ? this.props.onStore(day, schedule)
      : this.props.onUpdate(day, index, schedule);

    Promise.resolve(promise)
      .then(res => {
        this.setState({
          edit: null,
          editing: false,
          recent: false
        });
      });
  }

  /**
   * @param {string} day Key of the schedule or day is being created
   * @param {int} index Index of the time the schedule is being created
   */
  handleCreate(day, index) {
    return () => {
      if (this.props.disabled) {
        return;
      }

      const {schedules, times} = this.state;
      const time = times[index];
      const schedule = schedules[day];

      this.setState({
        schedules: {
          ...schedules,
          [day]: [
            ...schedule, {
            start: time.start,
            end: time.end,
            request: this.props.request,
            requester: this.props.requester,
            data: {
              subject: {
                id: 0,
                name: ''
              },

              professor: {
                id: 0,
                name: ''
              },
              
              section: {
                id: 0,
                name: ''
              },
            }
          }]
        },
        editing: true,
        edit: { day, index: schedule.length, time: index },
        recent: true
      });
    }
  }

  handleEdit(day, index) {
    return () => {
      if (this.props.disabled) {
        return;
      }

      const {schedules, times} = this.state;
      const schedule = schedules[day][index];

      if (this.props.request && !schedule.request) {
        return;
      }

      if (schedule.request && this.props.requester.id !== schedule.requester.id) {
        return;
      }

      // Index of the time in the array
      const time = times.findIndex((time) => schedule.start.isSame(time.start));

      this.setState({
        editing: true,
        edit: { day, index, time },
        hovering: false,
        hover: null
      });
    }
  }

  handleDelete(day, index) {
    return () => {
      this.props.onDelete(day, index);
    }
  }

  handleRequestAction(day, index, flag) {
    return () => {
      this.props.onRequestAction(day, index, flag);
      // Tooltip.hide()
      // Tooltip.show()
    }
  }

  handleDrag = (day, index, schedule, dest) => {
    this.props.onUpdate(day, index, schedule, dest);
  }

  handleResize = (day, index, schedule) => {
    this.props.onUpdate(day, index, schedule);
  }

  handleScale = () => {
    this.setState({ scaled: !this.state.scaled });
  }

  handleMouseEnter = (day, index) => {
    return() => {
      if (!this.state.scaled || this.state.recent) {
        return;
      }

      const {schedules, times} = this.state;
      const schedule = schedules[day][index];
      // Index of the time in the array
      const time = times.findIndex((time) => schedule.start.isSame(time.start));

      this.setState({
        hover: { day, index, time },
        hovering: true
      });
    }
  }

  handleMouseLeave = (evt) => {
    if (!this.state.scaled) {
      return;
    }

    this.setState({
      hovering: false,
      hover: null
    });
  }
}

export default Timesheet;