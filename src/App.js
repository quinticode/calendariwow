import './App.css';
import TextoLegal from './components/TextoLegal';
import Contador from './components/Contador';
import Home from './pages/Home';
import Sobre from './pages/Sobre'
import { BrowserRouter, Route, Routes, Outlet,  } from 'react-router-dom';
import LayoutPublico from './components/LayoutPublico';
import FormRegistrar from './pages/FormRegistrar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<LayoutPublico />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='sobre' element={<Sobre />} />
            <Route path='registrar' element={<FormRegistrar/>} />
          </Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;

