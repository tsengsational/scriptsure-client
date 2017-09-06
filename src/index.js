import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import './App.css';
import './stylesheets/Draft.css'
import './stylesheets/Editor.css'
import './stylesheets/styles.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import Reducers from './reducers'

const store = createStore(Reducers, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><Router ><App /></Router></Provider >, document.getElementById('root'));
registerServiceWorker();
