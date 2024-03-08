import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/appStore.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { EnhanceAIProvider } from 'enhanceai'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <EnhanceAIProvider  apiKey={import.meta.env.VITE_ENHANCE_AI_DEVELOPMENT_KEY}>

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    </EnhanceAIProvider>
  //</React.StrictMode>,
)
