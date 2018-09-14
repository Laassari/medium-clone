import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
