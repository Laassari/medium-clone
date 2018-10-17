import React from 'react'
import propTypes from 'prop-types'
import Modal from 'react-modal'
import { Redirect } from 'react-router-dom'

import Comment from './Comment'
import userAvatar from '../navbar/avatar.svg'
import { db } from '../user/Firebase'
import './Comments.css'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
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
    const { uid, postId, avatarUrl, authorName } = this.props

    const commentRef = db
      .collection('comments')
      .doc(postId)
      .collection('comments')
      .doc(uid)

    const comment = {
      uid,
      content: this.state.commentText,
      createdAt: Date.now(),
      likes: [],
      authorName,
      avatarUrl,
    }

    commentRef
      .set(comment, { merge: true })
      .then(() => this.setState(() => ({ commentText: '' })))
  }

  hideModal = () =>
    this.setState(state => ({ modal: { ...state.modal, show: false } }))

  redirectToLoggin = () => this.setState(() => ({ redirectLoggin: true }))

  fetchComments = () => {
    const comments = []
    const { postId } = this.props
    const commentsRef = db
      .collection('comments')
      .doc(postId)
      .collection('comments')

    this.setState(() => ({ commentsLoading: true }))

    commentsRef
      .get()
      .then(snapshot => {
        this.setState(() => ({ commentsLoading: false }))
        snapshot.docs.forEach(doc => {
          const data = doc.data()
          const comment = {
            content: data.content,
            createdAt: data.createdAt,
            likesNumber: data.likes.length,
            authorName: data.authorName || 'user',
            avatarUrl: data.avatarUrl || userAvatar,
          }

          comments.push(comment)
        })

        this.setState(() => ({ comments }))
      })
      .catch(() => {
        this.setState(() => ({ commentsLoading: false }))
        this.setState(() => ({ loadingCommentError: true }))
      })
  }

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
          value={this.state.commentText}
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
          <button
            onClick={() => {
              this.hideCommentsButton()
              this.fetchComments()
            }}
            className="show-comments"
          >
            Show comments
          </button>
        )}

        {this.state.showCommentCliced &&
          (this.state.commentsLoading ? (
            <div className="loading-comments">Loading...</div>
          ) : this.state.loadingCommentError ? (
            <div className="loading-comments-error">An error occured</div>
          ) : (
            <div className="comments">
              {this.state.comments.length === 0 ? (
                <p>No comments to show</p>
              ) : (
                this.state.comments.map(comment => (
                  <Comment key={comment.createdAt} {...comment} />
                ))
              )}
            </div>
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
  avatarUrl: propTypes.string,
  authorName: propTypes.string,
}

export default Comments
