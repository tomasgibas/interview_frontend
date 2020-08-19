import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './index'

import { persistStore } from 'redux-persist'

function loggerFilter(state, action) {
	if (action.type.startsWith('persist')) {
		return false
	}
	if (action.type === '@@redux-form/REGISTER_FIELD') {
		return false
	}
	return action.type !== '@@redux-form/UNREGISTER_FIELD'
}

function configureStoreProd(initialState = {}) {
	const middlewares = [
		// Add other middleware on this line...
		thunk
	]

	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(...middlewares)
	))
	const persistor = persistStore(store)
	return { store, persistor }
}

function configureStoreDev(initialState = {}) {
	const logger = createLogger({
		collapsed: true,
		duration: true,
		predicate: loggerFilter
	})

	const middlewares = [
		thunk,
		logger
	]

	// @ts-ignore
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
	const store = createStore(rootReducer, initialState, composeEnhancers(
		applyMiddleware(...middlewares)
	))
	const persistor = persistStore(store)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./', () => {
			const nextReducer = require('./').default // eslint-disable-line global-require
			store.replaceReducer(nextReducer)
		})
	}

	return { store, persistor }
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
