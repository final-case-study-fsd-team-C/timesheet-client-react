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
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';

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
    const {times, schedules, editing, edit, recent, now, hovering, hover} = this.state;
    const {time, professors, subjects, sections, disabled, corny, scaled} = this.props;
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
                  key={ii} />
              )}

              {schedules[day].map((schedule, ii) => {
                // console.log(this.dayWeek[now.day() - 1] === day)
                const current = now.isSameOrAfter(schedule.start) && now.isSameOrBefore(schedule.end) && this.dayWeek[now.day() - 1] === day;
                const done = (now.isAfter(schedule.end) && this.dayWeek.indexOf(day) === (now.day() -1)) || this.dayWeek.indexOf(day) < (now.day() -1);
                const request = (now.isBefore(schedule.start) && this.dayWeek.indexOf(day) === (now.day() -1)) || this.dayWeek.indexOf(day) > (now.day() -1);

                const content = (
                  <div 
                  onDoubleClick={e => this.props.setTimer(day, ii)}
                    onMouseEnter={this.handleMouseEnter(day, ii)}
                    onMouseLeave={this.handleMouseLeave}
                    className={c('timesheet__overlay', {
                      'timesheet__overlay--current': current,
                      'timesheet__overlay--done':  done,
                      'timesheet__overlay--requested': request
                    })}
                    style={{
                      transform: `translateY(${height * times.findIndex((time) => time.start.isSame(schedule.start))}px)`,
                      height: height * getIncrementDifference(schedule.start, schedule.end, this.props.time.increment)
                    }}
                    key={ii}>
                    <div className="timesheet__overlay-inner">
                      {!scaled && (schedule.request || current || done) && <div className="timesheet__overlay-status">
                        {done
                          ? 'Project'
                          : (current ? 'On-going' : 'Requested')}
                      </div>}

                      {!scaled && !editing && !this.props.request && schedule.request && <button className="timesheet__overlay-action" onClick={this.handleRequestAction(day, ii, true)}>
                        <Tooltip overlay="Accept" placement="right"><span>✔</span></Tooltip>
                      </button>}

                      {!disabled && !scaled && !editing && !schedule.request && !this.props.request && <div><button className="timesheet__overlay-action"
                        onClick={this.handleDelete(day, ii)}>
                        <Tooltip overlay="Delete" placement="right"><span>✕</span></Tooltip>
                      </button><button className="timesheet__overlay-edit"  onClick={e => this.props.editTimesheet(day, ii)}>
                        <Tooltip overlay="Edit" placement="right"><span><EditIcon fontSize="small" style={{height: 15, width: 15}}/></span></Tooltip>
                      </button><button className="timesheet__overlay-play" onClick={e => this.props.setTimer(day, ii)}>
                        <Tooltip overlay="Play" placement="right"><span><PlayArrowIcon fontSize="small"/></span></Tooltip>
                      </button></div>}

                      {!scaled && <h6 className="timesheet__overlay-project">{schedule.data.project.name}</h6>}
                      {!scaled && <h6 className="timesheet__overlay-other">{schedule.data.phase.name}</h6>}
                      {!scaled && <h6 className="timesheet__overlay-other">{schedule.data.note.name}</h6>}
                      {!scaled && <h4 className="timesheet__overlay-title">{Number.parseInt(moment.utc(schedule.end.diff(schedule.start)).format("HH")) + "h" + Number.parseInt(moment.utc(schedule.end.diff(schedule.start)).format("mm")) + "m" || '1h20m'}</h4>}

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