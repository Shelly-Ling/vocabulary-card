import React from 'react';
import ReactDOM from 'react-dom';
import './style/_reset.scss';
import './AppContainer/VocabularyApp.scss'
// import UploadVocabularyApp from './AppContainer/UploadVocabularyApp';
// import BaseVocabularyApp from './AppContainer/BaseVocabularyApp';
import BookTypeVocabularyApp from './AppContainer/BookTypeVocabularyApp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <UploadVocabularyApp /> */}
    {/* <BaseVocabularyApp /> */}
    <BookTypeVocabularyApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
