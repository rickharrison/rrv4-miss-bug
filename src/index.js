import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { createStore } from 'redux';
import App from './App';
import './index.css';

function reducer (state) {
  return state;
}

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
