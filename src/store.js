import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootRducer from './reducers/'

const initState = {}

const store = createStore(
  rootRducer,
  initState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
