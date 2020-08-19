import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import * as serviceWorker from './serviceWorker'

import configureStore from './redux/configureStore'

import './styles/index.sass'

const { store } = configureStore()

// Use persist gate and const { persistor } = configureStore()

ReactDOM.render(
	<App store={store}/>,
	document.getElementById('root')
)

serviceWorker.unregister()
