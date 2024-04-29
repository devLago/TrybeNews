import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import DataProvider from './provider/DataProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <DataProvider>
      <App />
    </DataProvider>
)
