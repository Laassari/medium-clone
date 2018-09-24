import React from 'react'
import 'froala-editor/css/froala_style.min.css'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'

import { db } from '../user/Firebase'
import './PostViewer.css'

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
        }
      })
      .catch(err =>
        this.setState(() => ({
          error: 'an error occured please try later!',
          isFetching: false,
        }))
      )
  }

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
    } = this.state

    return (
      <div className="post-viewer-wrapper">
        {isFetching && <div className="error-message">Loading... </div>}

        {error && <div className="error-message">{error}</div>}
        {notFound && <div className="error-message">Post not found!</div>}

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
      </div>
    )
  }
}

export default PostViewer