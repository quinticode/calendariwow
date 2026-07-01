import { use, useState } from "react";
import TextoLegal from "../components/TextoLegal";
import Contador from "../components/Contador";
import { Link } from "react-router-dom";

export default function Home(){
    const [contador, setContador] = useState(0);

    return (
    <>
      <TextoLegal tamanho={"2rem"} conteudo={"OIOI"}/>
      <TextoLegal tamanho={"10rem"} conteudo={"HOME"}/>
      <Contador valor={contador} setValor={setContador} emoji="Aumentar" modo="incremento"/>
      <Contador valor={contador} setValor={setContador} emoji="Diminuir" modo="decremento"/>

      <Link to="/registrar"><button>Registrar Conta</button></Link>

    </>
    )
}