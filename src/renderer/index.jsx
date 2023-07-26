import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.scss'

import App from './react/app.jsx'

const root = createRoot(document.getElementById('root'));
root.render(
  <App />
)