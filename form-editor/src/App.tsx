import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preview from './pages/Preview';
import Home from './pages/Home';
import Layout from './components/Layout';
import FormEditor from './pages/FormEditor';
import Responses from "./pages/Responses";




function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/form/:id/edit" element={<FormEditor />} />
          <Route path="/form/:id" element={<Preview />} />
          <Route path="/form/:id/responses" element={<Responses />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
