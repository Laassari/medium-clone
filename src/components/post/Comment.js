import React from 'react'
import propTypes from 'prop-types'

import { db, firebase } from '../user/Firebase'
import likeIcon from './like.svg'
import likedIcon from './liked.svg'

class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      commentLiked: false,
    }
  }

  componentDidMount() {
    // used as initial value that will change
    this.setState(() => ({ likesNumber: this.props.likesNumber }))
    const { uid, likesArray } = this.props

    if (likesArray.indexOf(uid) > -1) {
      this.setState(() => ({ commentLiked: true }))
    }
  }

  likeComment = () => {
    if (!this.props.loggedIn) return

    const { postId, uid, commentId } = this.props
    const commentRef = db.doc(`comments/${postId}/comments/${commentId}`)
    const { commentLiked } = this.state

    if (commentLiked) {
      //perform a un-like action
      commentRef
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(uid),
        })
        .then(() =>
          this.setState(state => ({
            commentLiked: false,
            likesNumber: state.likesNumber - 1,
          }))
        )
    } else {
      commentRef
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(uid),
        })
        .then(() =>
          this.setState(state => ({
            commentLiked: true,
            likesNumber: state.likesNumber + 1,
          }))
        )
    }
  }

  render() {
    const { content, createdAt, authorName, avatarUrl } = this.props

    const { likesNumber } = this.state

    const postIsYearOlder =
      new Date(createdAt).getFullYear() < new Date().getFullYear()
    const creationDate = new Date(createdAt).toDateString() //eg. "Tue Oct 16 2018"
    const dateString = postIsYearOlder
      ? creationDate.substring(4) // Oct 16 2018"
      : creationDate.substring(4, 10) //"Oct 16"

    const theLikeIcon = this.state.commentLiked ? likedIcon : likeIcon

    return (
      <div className="comment">
        <div className="author">
          <img src={avatarUrl} alt="author" />
          <div>
            <div className="bold">{authorName}</div>
            <div className="created-at">{dateString}</div>
          </div>
        </div>
        <div className="content">{content}</div>
        <div className="info">
          <div className="comment-likes">{likesNumber} likes</div>
          <button
            onClick={this.likeComment}
            className="like-comment"
            type="button"
          >
            <img src={theLikeIcon} alt="like comment" />
          </button>
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
  likesArray: propTypes.array.isRequired,
  uid: propTypes.string.isRequired,
  loggedIn: propTypes.bool.isRequired,
  postId: propTypes.string.isRequired,
  commentId: propTypes.string.isRequired,
}

export default Comment
