import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import './index.css';
import './App.css';
// import './stylesheets/Draft.css'
// import './stylesheets/Editor.css'
// import './stylesheets/styles.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import Reducers from './reducers'

const store = createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><Router><Route path="/" component={App} /></Router></Provider >, document.getElementById('root'));
registerServiceWorker();
