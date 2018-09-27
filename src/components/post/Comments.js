import React from 'react'
import propTypes from 'prop-types'
import { db } from '../user/Firebase'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCommentCliced: false,
      commentText: '',
      commentsLoading: false,
      loadingCommentError: false,
    }
  }
  handleCommentChange = event => {
    event.persist()
    this.setState(() => ({ commentText: event.target.value.trim() }))
  }

  hideCommentsButton = () => this.setState(() => ({ showCommentCliced: true }))

  createComment = () => {
    if (!this.props.loggedIn) {
      //@TODO show a modal with login
      return
    }
    if (this.state.commentText === '') return
    const { uid, postId } = this.props
    const commentRef = db.collection('comments').doc(postId)

    const comment = {
      uid,
      content: this.state.commentText,
    }

    commentRef.add({ comment })
  }

  render() {
    return (
      <div>
        <div className="new-comment">
          <textarea
            placeholder="comment..."
            onChange={this.handleCommentChange}
          />
          <button onClick={this.createComment}>Comment</button>
        </div>

        {/*  hide the once cliked */}
        {!this.state.showCommentCliced && (
          <button onClick={this.hideCommentsButton}>Show comments</button>
        )}
        {this.state.showCommentCliced &&
          (this.state.commentsLoading ? (
            <div>Loading...</div>
          ) : this.state.loadingCommentError ? (
            <div>An error occured</div>
          ) : (
            <div className="comments">comments go here!</div>
          ))}
      </div>
    )
  }
}

Comments.propTypes = {
  uid: propTypes.string.isRequired,
  postId: propTypes.string.isRequired,
  loggedIn: propTypes.bool.isRequired,
}

export default Comments
