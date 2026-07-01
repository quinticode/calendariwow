import TextoLegal from "./TextoLegal";
import { Link, Outlet } from 'react-router-dom';

export default function LayoutPublico(){
    

    return(
        <div>
            <nav>
                <Link to="/"><TextoLegal conteudo="Página Inicial" /></Link>
                <Link to="/sobre"><TextoLegal conteudo="Sobre" /></Link>
            </nav>

            <hr />

            <Outlet />
            
        </div>
    )
}