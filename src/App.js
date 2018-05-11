import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import moment from 'moment'
import { Line } from 'rc-progress'

class App extends Component {
  state = {
    initialDate: ""
  }

  componentDidMount() {
    this.setState({ initialDate: new Date().getTime()})
  }

  render() {

    return (
      <div className="container">
        <header>
          <h1>Timers for Girls Frontline [UTC +0]</h1>
        </header>
        {
          timers.sort( ( a, b ) => a.hours - b.hours).map( timer => {
            const gameReset = this.gameReset( timer.hours, timer.minutes)
            return (
              <div  className="item">
                <p>{ timer.name }</p>
                <Countdown date={gameReset} renderer={(time) => this.progressBar(time, `Already done, ${ timer.name }`)}/>
              </div>
            )
          })
        }
      </div>
    );
  }

  getNow = () => moment.utc(moment.utc()).format("YYYY-MM-DD")

  gameReset = (hours, minutes = 0) => {
    //11 hours
    let result = moment.utc(this.getNow()).add(hours, "hours")
    if(minutes > 0)
      result.add(minutes, "minutes")

    result = result - moment.utc()

    return moment.utc().add((result < 0 ? 0 : result), "milliseconds")
  }

  progressBar = ( time, doneMessage = "Done!" ) => {
    const current = this.state.initialDate + time.total
    const max = time.date.valueOf()
    const result = this.calculatePercent(max - current, time.total)
    if (time.completed) {
      return  <strike>{ doneMessage }</strike>
    } else {
      return <div>
        <span>{time.hours} hours, {time.minutes} minutes, {time.seconds} seconds</span>
      </div>
    }
  }

  calculatePercent = (current = 0, max = 0) => {
    const result = Math.floor((current / max * 1) * 100)
    return result > 100 ? 100 : 100 - result
}

}

export default App;


const timers = [
  {
    name: "Day of UTC +0 time ends in...",
    hours: 24,
    minutes: 0
  },
  {
    name: "Battery Reset 1st ( 11am UTC )",
    hours: 11,
    minutes: 0
  },
  {
    name: "battery Reset 2nd( 11pm UTC )",
    hours: 23,
    minutes: 0
  },
  {
    name: "Dorm Open 11:00 - 14:00 To start( 9pm UTC )",
    hours: 19,
    minutes: 0
  },
  {
    name: "Dorm Open 11:00 - 14:00 To end( 12am UTC )",
    hours: 22,
    minutes: 0
  },
  {
    name: "Dorm Open 17:00 - 20:00 To start( 3am UTC )",
    hours: 1,
    minutes: 0
  },
  {
    name: "Dorm Open 17:00 - 20:00 To end ( 6am UTC )",
    hours: 4,
    minutes: 0
  },
]