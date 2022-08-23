import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './components/login/login';
import { Score } from './components/score/score';
import { Main } from './components/main/main';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="/main" element={<Main/>} />
        <Route path="/score" element={<Score/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
