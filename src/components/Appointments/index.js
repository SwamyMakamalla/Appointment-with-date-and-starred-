import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

const initialTaskItems = []

class Appointments extends Component {
  state = {
    taskListItems: initialTaskItems,
    title: '',
    date: '',
    starred: false,
  }

  onTaskSubmit = event => {
    event.preventDefault()
    const {date, title, taskListItems} = this.state
    const newTask = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState({
      taskListItems: [...taskListItems, newTask],
      title: '',
      date: '',
    })
  }

  userTitleName = event => {
    const userTitle = event.target.value
    this.setState({title: userTitle})
  }

  onChangeDate = event => {
    const userDate = event.target.value
    // this.setState({date: format(new Date(userDate), 'dd MMMM yyyy, EEEE')})
    this.setState({date: userDate})
  }

  changeStarStatus = id => {
    this.setState(prevState => ({
      taskListItems: prevState.taskListItems.map(eachTitle => {
        if (id === eachTitle.id) {
          return {...eachTitle, isStarred: !eachTitle.isStarred}
        }
        return eachTitle
      }),
    }))
  }

  starredAppointments = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }))
  }

  render() {
    const {title, date, taskListItems, starred} = this.state

    const resultData = starred
      ? taskListItems.filter(item => item.isStarred === true)
      : taskListItems
    const activeButton = starred ? 'active-button' : null

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-card-container">
            <div className="text-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onTaskSubmit}>
                <div className="title-card">
                  <label htmlFor="titleId" className="label-name">
                    TITLE
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    id="titleId"
                    value={title}
                    className="user-input"
                    onChange={this.userTitleName}
                  />
                </div>
                <div className="title-card">
                  <label htmlFor="dateId" className="label-name">
                    Date
                  </label>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    id="dateId"
                    value={date}
                    className="user-input"
                    onChange={this.onChangeDate}
                  />
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="bottom-card-container">
            <div className="bottom-buttons-container">
              <h3 className="bottom-heading">Appointments</h3>
              <button
                type="button"
                className={`starred-button ${activeButton}`}
                onClick={this.starredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="list-items-container">
              {resultData.map(eachItem => (
                <AppointmentItem
                  eachItem={eachItem}
                  key={eachItem.id}
                  changeStarStatus={this.changeStarStatus}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
