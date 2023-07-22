import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './react/app.jsx'

const root = createRoot(document.getElementById('root'));
root.render(
  <App />
)