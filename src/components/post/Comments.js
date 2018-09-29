import React from 'react'
import propTypes from 'prop-types'
import Modal from 'react-modal'
import { Redirect } from 'react-router-dom'

import { db } from '../user/Firebase'
import './Comments.css'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCommentCliced: false,
      commentText: '',
      commentsLoading: false,
      loadingCommentError: false,
      redirectLoggin: false,
      modal: {
        show: false,
        content: '',
      },
    }
  }

  handleCommentChange = event => {
    event.persist()
    this.setState(() => ({ commentText: event.target.value.trim() }))
  }

  hideCommentsButton = () => this.setState(() => ({ showCommentCliced: true }))

  createComment = () => {
    if (!this.props.loggedIn) {
      this.setState(() => ({
        modal: { show: true, content: 'you must loggin to post a comment' },
      }))
      return
    }
    if (this.state.commentText === '') return
    const { uid, postId } = this.props
    const commentRef = db.collection('comments').doc(postId)

    const comment = {
      uid,
      content: this.state.commentText,
      createdAt: Date.now(),
      likes: [],
    }

    commentRef.set({ comment })
  }

  hideModal = () =>
    this.setState(state => ({ modal: { ...state.modal, show: false } }))

  redirectToLoggin = () => this.setState(() => ({ redirectLoggin: true }))

  render() {
    const showModal = this.state.modal.show
    const modalContent = this.state.modal.content

    if (this.state.redirectLoggin) {
      return (
        <Redirect
          to={{ pathname: '/auth', state: { lastUrl: this.props.location } }}
        />
      )
    }

    return (
      <div className="comments-section">
        <div className="new-comment">
          <textarea
            placeholder="comment..."
            onChange={this.handleCommentChange}
          />
          <button onClick={this.createComment}>Comment</button>
        </div>

        {/* Loggin modal */}
        <Modal
          isOpen={showModal}
          onRequestClose={this.hideModal}
          appElement={document.getElementById('root')}
          className="modal"
        >
          <p>{modalContent}</p>
          <div>
            <button className="cancel" onClick={this.hideModal}>
              Cancel
            </button>
            <button className="login" onClick={this.redirectToLoggin}>
              Logg in
            </button>
          </div>
        </Modal>

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
  location: propTypes.object.isRequired,
}

export default Comments
