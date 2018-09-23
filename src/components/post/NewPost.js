import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'font-awesome/css/font-awesome.css'
import FroalaEditor from 'react-froala-wysiwyg'
import { Redirect } from 'react-router-dom'
import { db } from '../user/Firebase'

import './NewPost.css'

export class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      bodyText: '',
      error: false,
    }
  }

  config = {
    fileUpload: false,
    htmlAllowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'hr'],
    editorClass: 'custom-class',
    htmlExecuteScripts: false,
    shortcutsEnabled: ['bold', 'italic', 'createLink'],
    imageDefaultWidth: '100%',
    imageEditButtons: ['imageCaption', 'imageAlt', 'imageRemove'],
    imageInsertButtons: ['imageBack', 'imageUpload', 'imageByURL'],
    imageMove: false,
    //@TODO: replace by a real endpoint
    imageUploadURL: 'https://file.io/?expires=3y',
    linkAlwaysBlank: true,
    linkInsertButtons: [],
    linkText: true,
    quickInsertButtons: ['image', 'ul', 'ol', 'hr'],
    toolbarButtons: [
      'fullscreen',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'fontSize',
      'paragraphFormat',
      'align',
      'formatOL',
      'formatUL',
      'quote',
      'insertLink',
      'insertImage',
      'insertHR',
      'clearFormatting',
      'undo',
      'redo',
    ],
  }

  uploadPost = (post, uid) => {
    const postRef = db
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc()

    postRef
      .set(post)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err))
  }

  createPost = () => {
    if (this.state.titleText === '') {
      this.setState(() => ({ error: 'The title cannot be empty' }))
      return
    } else if (this.state.bodyText === '') {
      this.setState(() => ({ error: 'The post body cannot be empty' }))
      return
    }
    this.setState(() => ({ error: false }))

    const { id: uid } = this.props.user

    const post = {
      title: this.state.titleText,
      body: this.state.bodyText,
      date: Date.now(),
      claps: 0,
      authorId: uid,
    }

    this.uploadPost(post, uid)
  }

  handleTitleTextChange = event => {
    event.persist()
    this.setState(() => ({ titleText: event.target.value.trim() }))
  }

  handleModelChange = event => {
    this.setState(() => ({ bodyText: event }))
  }

  render() {
    if (!this.props.user.loggedIn) {
      return <Redirect to="/auth" />
    }
    return (
      <div className="new-post">
        <h1>Create a new post.</h1>
        <div className="title">
          <input
            onChange={this.handleTitleTextChange}
            type="text"
            required
            placeholder="title goes here..."
          />
        </div>
        <div className="body">
          <FroalaEditor
            className="helooooo"
            tag="textarea"
            onModelChange={this.handleModelChange}
            config={this.config}
          />
        </div>
        {/* errors will appear here (if any) */}
        {this.state.error && <sup className="error">{this.state.error}</sup>}
        <button onClick={this.createPost}>Create new post</button>
      </div>
    )
  }
}

NewPost.propTypes = {
  user: propTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(NewPost)
