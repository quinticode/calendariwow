export default function TextoLegal({tamanho=12, conteudo="texto padrão"}) {

    return (
        <h1 style={{fontSize:tamanho}}>{conteudo}</h1>
    )
}