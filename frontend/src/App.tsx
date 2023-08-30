
import MainRoutes from "./MainRoutes";
import Layout from "./components/Layout"
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <MainRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App
