import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootRducer from './reducers/'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const initState = {}

const store = createStore(
  rootRducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
