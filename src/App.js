import './App.css';
import TextoLegal from './components/TextoLegal';
import Contador from './components/Contador';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutPublico from './components/LayoutPublico';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<LayoutPublico />}>
          
            <Route path='home' element={<Home />}></Route>


          </Route>

        </Routes>
      </BrowserRouter>

      <Home />
    </div>
  );
}

export default App;

