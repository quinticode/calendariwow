import { format } from "mysql2";
import { useState } from "react";


export default function FormRegistrar(){
    
    const [formDados, setFormDados] = useState({
        nome: "",
        email: "",
        idade: "",
        aceiteTermos: false
    });

    const [enviado, setEnviado] = useState(false);

    
    return(
        <form>
            
        </form>
    )
}