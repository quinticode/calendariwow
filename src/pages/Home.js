import { use, useState } from "react";
import TextoLegal from "../components/TextoLegal";
import Contador from "../components/Contador";

export default function Home(){
    const [contador, setContador] = useState(0);

    return (
    <>
      <TextoLegal tamanho={"2rem"} conteudo={"OIOI"}/>
      <TextoLegal tamanho={"10rem"} conteudo={"TESTE"}/>
      <Contador valor={contador} setValor={setContador} emoji="Aumentar" modo="incremento"/>
      <Contador valor={contador} setValor={setContador} emoji="Diminuir" modo="decremento"/>


    </>
    )
}