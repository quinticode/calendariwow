import { useState } from "react";

export default function SalaDeEstar(){

    const [logado, setLogado] = useState(true);

    {/* if(logado){return(<h3>Bem vindo, usuário</h3>)}
    else {return(<h3>Por favor, faça login.</h3>)} */}

    return(
        <>
        <p>Olá, tudo bem? Aqui é a sala de estar!</p>
        <ComponenteMassa nome="joao"/>
        <ComponenteMassa nome="cleber!"/>
        <ComponenteMassa nome="jorge!!"/>
        <ComponenteMassa nome="dasdsa!!!"/>
        <BotaoAlternarTema />
        <BotaoAlternarTema />
        <Ocultativo />
        <Ajuda />
        </>
    )
}

function ComponenteMassa({nome}){
    return (
        <h2>Oi, meu nome é {nome}!</h2>
    )
}

function BotaoAlternarTema(){
    const [tema, setTema] = useState(false)
    tema ? console.log("O tema atual é claro") : console.log("O tema atual é escuro")

    return(
        <button onClick={() => setTema(!tema)}>
            Tema atual: {tema ? "claro" : "escuro"}
        </button>
    )
}

export function Saudacao({nome}){
    if(nome){
        return(<h2>Saudações, {nome}!</h2>)
    } else {
        console.log("nao tem nome")
    }
}

function Ocultativo(){
    const [oculto, setOculto] = useState(true);

    if(oculto){
        return(
            <button onClick={() => setOculto(false)}>Mostrar conteúdo</button>
        ) 
    } else {
        return(
            <>
            <h2>Conteúdo</h2>
            <button onClick={() => setOculto(true)}>Esconder conteúdo</button>
            </>
        )
    }
}

function Ajuda(){

    const [mostrarAjuda, setMostrarAjuda] = useState(false);

    function BotaoAjuda(){
         return( 
        <button onClick={() => setMostrarAjuda(!mostrarAjuda)}>Ajuda</button>
        )
    }

    
    if(mostrarAjuda){
        return(
            <div>
            <h1>Dica: preencha todos os campos corretamente!</h1>
            <BotaoAjuda />
            </div>
        )
        
    }
    return( 
        <div>
        <BotaoAjuda />
        </div>
    )
}

