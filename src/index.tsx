import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from '@/App'
import { persistor, store } from '@/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </MantineProvider>,
)
