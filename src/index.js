import React from 'react';
import ReactDOM from 'react-dom';
import './style/_reset.scss';
import VocabularyApp from './AppContainer/VocabularyApp';
import reportWebVitals from './reportWebVitals';
// import ReactGA from 'react-ga';

// ReactGA.initialize('追蹤ID');
// ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <VocabularyApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
