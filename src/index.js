import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SqlProcess from './components/gen_tools_it/sqlProcess'
import JsonProcess from './components/jsonProcess.jsx'
import ReplaceProcess from './components/replaceProcess.jsx'
import MediaProcess from './components/mediaProcess.jsx'
import NotifyAuto from './components/Elearning/notifyAuto.jsx'
import ListenPract from './components/Elearning/listenPract.jsx'
import YoutubeSub from './components/YTSub/vdYtSub'
import reportWebVitals from './reportWebVitals';
import { FaHome } from 'react-icons/fa';
import {Link, Route,  Routes, BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
    <div><Link to="/"><FaHome/></Link></div>
    <br/>
    <Routes>
        <Route exact path="/" element={<App/>} />
         <Route path="/sql" element={<SqlProcess/>} />
         <Route path="/json" element={<JsonProcess/>} />
         <Route path="/replace" element={<ReplaceProcess/>} />
         <Route path="/media" element={<MediaProcess/>} />
         <Route path="/notify" element={<NotifyAuto/>} />
         <Route path="/listen" element={<ListenPract/>} />
         <Route path="/youtube-sub" element={<YoutubeSub/>} />
          
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
