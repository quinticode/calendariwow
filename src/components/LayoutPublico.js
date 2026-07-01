import TextoLegal from "./TextoLegal";
import { Link, Outlet } from 'react-router-dom';

export default function LayoutPublico(){
    

    return(
        <div>
            <nav>
                <Link to="/home"><TextoLegal conteudo="Página Inicial" /></Link>
                <Link to="/sobre"><TextoLegal conteudo="Sobre" /></Link>
                <Link to="/registrar"><TextoLegal conteudo="Registrar Conta" /></Link>
            </nav>

            <hr />

            <Outlet />
            
        </div>
    )
}