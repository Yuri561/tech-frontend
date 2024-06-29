// src/index.tsx or src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
import App from './App'; // Import your App component
import './index.css'

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
