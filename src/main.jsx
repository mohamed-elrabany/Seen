import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import QueryProvider from './providers/QueryProvider.jsx'
import { EchoProvider } from './providers/EchoProvider.jsx'

import './index.css'
import App from './App.jsx'
import './i18n.js'
import 'react-step-progress-bar'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <EchoProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </EchoProvider>
    </Provider>
  </StrictMode>,
)
