import './index.css'

const AppointmentItem = props => {
  const {eachItem, changeStarStatus} = props
  const {id, title, date, isStarred} = eachItem
  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onChangeStar = () => {
    changeStarStatus(id)
  }

  return (
    <li className="task-item-card">
      <div className="top-card-names">
        <p className="task-name">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onChangeStar}
        >
          <img src={imageUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date {date}</p>
    </li>
  )
}

export default AppointmentItem
