import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.scss'
import App from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>,
)
