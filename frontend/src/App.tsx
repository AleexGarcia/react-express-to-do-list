
import MainRoutes from "./MainRoutes";
import Layout from "./components/Layout"
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {


  return (
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider>
          <Layout>
            <MainRoutes />
          </Layout>
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
