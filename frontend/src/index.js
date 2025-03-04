import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import navBar from 'src/components/navBar/navBar.jsx' ;
import headerSection from 'src/components/headerSection/headerSection.jsx';
import cardSection from 'src/components/cardSection/cardSection.jsx';
import footerSection from 'src/components/footerSection/footerSection.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <navBar/>
    <headerSection/>
    <cardSection/>
    <footerSection/>
  </React.StrictMode>
);

reportWebVitals();
