import { createStore, compose, applyMiddleware } from 'redux'

import rootReducers from '../reducers'

const enhancers = compose(
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
    ? window.devToolsExtension && window.devToolsExtension()
    : f => f
)

const createStoreWithMiddleware = applyMiddleware()(createStore)

export default initialState => createStoreWithMiddleware(rootReducers, initialState, enhancers)