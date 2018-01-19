import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thread from './thread'

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

// demo ========
thread.async (() => {
  let j = 0
  for (let i = 0; i < 10; i++) {
    console.log(`async :: ${i}`)
    j++
  }
  return j
}, resp => {
  console.log(resp)
}, error => {
  console.error(error)
})
