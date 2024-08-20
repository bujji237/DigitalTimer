import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 1500,
    timerLimitInMinutes: 25,
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 1500,
    })
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat() {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = timeElapsedInSeconds % 60
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    const formattedTime = `${stringifiedMinutes}:${stringifiedSeconds}`
    return formattedTime
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds - 1,
    }))
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onDecrementBtnClicked = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    if (timeElapsedInSeconds === timerLimitInMinutes * 60) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
        timeElapsedInSeconds: (prevState.timerLimitInMinutes - 1) * 60,
      }))
    }
  }

  onIncrementBtnClicked = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    if (timeElapsedInSeconds === timerLimitInMinutes * 60) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
        timeElapsedInSeconds: (prevState.timerLimitInMinutes + 1) * 60,
      }))
    }
  }

  render() {
    const {isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const pausedOrRunningTest = isTimerRunning ? 'Running' : 'Paused'
    const formattedTime = this.getElapsedSecondsInTimeFormat()
    if (timeElapsedInSeconds === 0) {
      this.clearTimerInterval()
      this.setState({
        isTimerRunning: false,
        timeElapsedInSeconds: 1500,
      })
    }

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="time-and-buttons-container">
          <div className="time-container">
            <div className="container">
              <h1 className="time">{formattedTime}</h1>
              <p className="time-state-text">{pausedOrRunningTest}</p>
            </div>
          </div>
          <div className="buttons-container">
            <div className="start-reset-btn-container">
              <div className="btn1">
                <button
                  type="button"
                  className="btn-container button"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    src={startOrPauseImgUrl}
                    alt={startOrPauseAltText}
                    className="btn-image"
                  />
                  <p className="start-or-pause-text">
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </p>
                </button>
              </div>
              <div className="btn2">
                <button
                  type="button"
                  className="btn-container button"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="btn-image"
                  />
                  <p className="reset">Reset</p>
                </button>
              </div>
            </div>
            <p className="timer-limit-text">Set Timer Limit</p>
            <div className="increase-decrease-container">
              <button
                className="decrese-btn"
                type="button"
                onClick={this.onDecrementBtnClicked}
              >
                -
              </button>
              <p className="timeLimit">{timerLimitInMinutes}</p>
              <button
                className="increase-btn"
                type="button"
                onClick={this.onIncrementBtnClicked}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
