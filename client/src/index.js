import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faMagnifyingGlass, faHome, faArrowLeft, faXmark, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faHeart, faComments, faFaceSmileBeam, faSquarePlus, faImages} from '@fortawesome/free-regular-svg-icons'


library.add(faHeart, faHome, faComments, faFaceSmileBeam, faMagnifyingGlass, faSquarePlus, faImages, faArrowLeft, faXmark, faAngleLeft, faAngleRight)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
      <App/>
    </Provider>
    </Router>
  </React.StrictMode>
);

