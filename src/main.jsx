import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter future={{
    v7_relativeSplatPath: true,
  }}>
      <App />
    </BrowserRouter>
  </Provider>
)