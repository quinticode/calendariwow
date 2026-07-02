import './App.css';
import TextoLegal from './components/TextoLegal';
import Contador from './components/Contador';
import Home from './pages/Home';
import Sobre from './pages/Sobre'
import { BrowserRouter, Route, Routes, Outlet, } from 'react-router-dom';
import LayoutPublico from './components/LayoutPublico';
import FormRegistrar from './pages/FormRegistrar';
import UsuariosPage from './pages/UsuariosPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import UploadPage from './pages/UploadPage';
import HistoriasPage from './pages/HistoriasPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          {/* rotas publicas */}
          <Route path='/' element={<LayoutPublico />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='sobre' element={<Sobre />} />
            <Route path='registrar' element={<FormRegistrar/>} />
            <Route path='login' element={<LoginPage />} />
            <Route path='historias' element={<HistoriasPage />} />

          {/* rotas privadas */}
            <Route 
              path="usuarios"
                element={
                  <PrivateRoute>
                    <UsuariosPage />
                  </PrivateRoute>
                }
            />

            <Route 
              path="upload"
                element={
                  <PrivateRoute>
                    <UploadPage />
                  </PrivateRoute>
                }
            />

            <Route 
              path="formHistoria"
                element={
                  <PrivateRoute>
                    <formHistoria />
                  </PrivateRoute>
                }
            />

        
          </Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;

