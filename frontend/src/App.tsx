
import MainRoutes from "./MainRoutes";
import Layout from "./components/Layout"
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from "./context/AuthContext";


function App() {
 

  return (
    <BrowserRouter>
      <AppContextProvider>
        <Layout>
          <MainRoutes />
        </Layout>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
