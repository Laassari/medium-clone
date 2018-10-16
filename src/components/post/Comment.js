import React from 'react'
import propTypes from 'prop-types'

class Comment extends React.Component {
  render() {
    const {
      content,
      createdAt,
      likesNumber,
      authorName,
      avatarUrl,
    } = this.props

    const postIsYearOlder =
      new Date(createdAt).getFullYear() < new Date().getFullYear()
    const creationDate = new Date(createdAt).toDateString() //eg. "Tue Oct 16 2018"
    const dateString = postIsYearOlder
      ? creationDate.substring(4) // Oct 16 2018"
      : creationDate.substring(4, 10) //"Oct 16"

    return (
      <div className="comment">
        <div className="author">
          <img src={avatarUrl} alt="author" />
          <div>
            <div className="bold">{authorName}</div>
            <div className="created-at">{dateString}</div>
          </div>
        </div>
        <div className="content">content: {content}</div>
        <div className="info">
          <div className="comment-likes">{likesNumber} likes</div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  content: propTypes.string.isRequired,
  createdAt: propTypes.number.isRequired,
  likesNumber: propTypes.number.isRequired,
  authorName: propTypes.string.isRequired,
  avatarUrl: propTypes.string.isRequired,
}

export default Comment
