export default function TextoLegal({tamanho="2rem", conteudo="texto padrão"}) {

    return (
        <h1 style={{fontSize:tamanho}}>{conteudo}</h1>
    )
}