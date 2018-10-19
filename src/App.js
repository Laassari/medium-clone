import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'
import Auth from './components/user/Auth'
import NewPost from './components/post/NewPost'
import PostViewer from './components/post/PostViewer'
import TopStories from './components/topPosts/TopPosts'

import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/explore" component={TopStories} />
              <Route exact path="/posts/new" component={NewPost} />
              <Route exact path="/posts/:postId" component={PostViewer} />
              <Route component={PageNotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default hot(module)(App)
