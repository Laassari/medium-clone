import React from 'react'
import 'froala-editor/css/froala_style.min.css'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Redirect } from 'react-router-dom'

import { db, firebase } from '../user/Firebase'
import Comments from './Comments'
import './PostViewer.css'
import likeIcon from './like.svg'
import likedIcon from './liked.svg'

class PostViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: false,
      notFound: false,
      error: false,
      title: '',
      body: '',
      date: '',
      avatarUrl: false,
      username: false,
      numberOfLikes: false,
      hasLiked: false,
      redirectLoggin: false,
      modal: {
        show: false,
        content: '',
      },
    }
  }

  componentDidMount() {
    const { postId } = this.props.match.params
    this.setState(() => ({ isFetching: true }))

    const postRef = db.collection('posts').doc(postId)

    postRef
      .get()
      .then(async doc => {
        if (!doc.exists) {
          this.setState(() => ({ notFound: true, isFetching: false }))
        } else {
          const data = doc.data()
          const { authorId } = data
          const authorData = await db
            .collection('users')
            .doc(authorId)
            .get()

          //author data
          const { avatarUrl, username: authorName } = authorData.data()
          this.setState(() => ({ avatarUrl, authorName }))

          //post data
          const { title, body } = data
          const date = new Date(data.date).toLocaleString()
          this.setState(() => ({ title, body, date, isFetching: false }))

          //get likes count if doc exist or 0
          this.getNumOfLikes()

          //check wether the user liked the post or not
          this.isPostLiked()
        }
      })
      .catch(err =>
        this.setState(() => ({
          error: 'an error occured please try later!',
          isFetching: false,
        }))
      )
  }

  getNumOfLikes() {
    const { postId } = this.props.match.params
    db.collection('likes')
      .doc(postId)
      .get()
      .then(doc => {
        if (!doc.exists) this.setState(() => ({ numberOfLikes: 0 }))
        else {
          const likesObj = doc.data()
          const numberOfLikes = Math.max(objectSize(likesObj), 0)
          this.setState(() => ({ numberOfLikes }))
        }
      })
  }

  isPostLiked = () => {
    const { id: uid } = this.props.user
    const { postId } = this.props.match.params
    const likeRef = db.collection('likes').doc(postId)

    likeRef.get().then(doc => {
      const users = doc.data()
      if (!users) {
        //post has no likes
        this.setState(() => ({ hasLiked: false }))
        return
      }
      if (uid in users) {
        //user has liked the post
        this.setState(() => ({ hasLiked: true }))
      } else {
        this.setState(() => ({ hasLiked: false }))
      }
    })
  }

  likePost = () => {
    const { username } = this.props.user
    if (username === '') {
      this.setState(() => ({
        modal: { show: true, content: 'you must loggin to Like a post' },
      }))
      return
    } else {
      const { id: uid } = this.props.user
      const { postId } = this.props.match.params
      const likeRef = db.collection('likes').doc(postId)

      if (this.state.hasLiked) {
        likeRef
          .update({ [uid]: firebase.firestore.FieldValue.delete() })
          .then(() => {
            this.setState(() => ({ hasLiked: false }))
            this.getNumOfLikes()
          })
          .catch(err => console.log(err))
      } else {
        likeRef
          .set({ [uid]: '' }, { merge: true })
          .then(() => {
            this.setState(() => ({ hasLiked: true }))
            this.getNumOfLikes()
          })
          .catch(err => console.log(err))
      }
    }
  }

  hideModal = () =>
    this.setState(state => ({ modal: { ...state.modal, show: false } }))

  redirectToLoggin = () => this.setState(() => ({ redirectLoggin: true }))

  render() {
    const {
      isFetching,
      error,
      notFound,
      title,
      body,
      date,
      avatarUrl,
      authorName,
      numberOfLikes,
    } = this.state

    const likingIcon = this.state.hasLiked ? likedIcon : likeIcon

    const { id: uid, loggedIn } = this.props.user
    const { postId } = this.props.match.params

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
      <div className="post-viewer-wrapper">
        {/* Errors and loading state section. */}
        {isFetching && <div className="error-message">Loading... </div>}

        {error && <div className="error-message">{error}</div>}
        {notFound && <div className="error-message">Post not found!</div>}

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

        {/* post section*/}
        {body.length > 0 ? (
          <div className="post-viewer">
            <div className="details">
              <img src={avatarUrl} alt="author avatar" />
              <div>
                author: {authorName}
                <br />
                <span>{date}</span>
              </div>
            </div>
            <div className="post">
              <h1>{title}</h1>
              <FroalaEditorView model={body} />
            </div>
          </div>
        ) : (
          false
        )}

        {/* claps section */}
        {body.length > 0 ? (
          <div className="likes">
            {numberOfLikes} Like(s){' '}
            <button type="button">
              <img onClick={this.likePost} src={likingIcon} alt="like" />
            </button>{' '}
          </div>
        ) : null}

        {/* Comments section. */}
        {body.length > 0 ? (
          <Comments
            uid={uid}
            postId={postId}
            loggedIn={loggedIn}
            location={this.props.location}
          />
        ) : null}
      </div>
    )
  }
}

function objectSize(obj) {
  let size = 0
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(PostViewer)
