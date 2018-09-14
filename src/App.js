import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Navbar from './components/navbar/Navbar'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          {/* <Route path="/" component={}> */}
        </Router>
      </div>
    )
  }
}

export default hot(module)(App)
