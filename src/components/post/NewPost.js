import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'font-awesome/css/font-awesome.css'
import FroalaEditor from 'react-froala-wysiwyg'

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
    // pluginsEnabled: ['image', 'link', 'img', 'video'],
    shortcutsEnabled: ['bold', 'italic', 'createLink'],
    imageDefaultWidth: '100%',
    imageEditButtons: ['imageCaption', 'imageAlt', 'imageRemove'],
    imageInsertButtons: ['imageBack', 'imageUpload', 'imageByURL'],
    imageMove: false,
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
  createPost = () => {
    console.log(this.state.bodyText)
  }

  handleTitleTextChange = event => {
    event.persist()
    this.setState(() => ({ titleText: event.target.value.trim() }))
  }

  handleModelChange = event => {
    this.setState(() => ({ bodyText: event }))
  }

  render() {
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

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(NewPost)
