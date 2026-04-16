import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.jsx'
import './i18n.js'
import 'react-step-progress-bar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
