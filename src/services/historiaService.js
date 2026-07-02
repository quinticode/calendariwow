export async function publicarHistoria(dados) {
    validarHistoria(dados);


    const resposta = await fetch("http://localhost:3001/historias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    const dadosServidor = await resposta.json();


    if (!resposta.ok) {
        throw new Error(dadosServidor.erro || "Não foi possível publicar a história.");
    }

    return dadosServidor;
}


function validarHistoria(dados) {
    const erros = [];

    if (!dados.titulo?.trim()) erros.push("O título é obrigatório!");
    if (!dados.autor?.trim()) erros.push("O nome do autor é obrigatório!");
    if (!dados.genero?.trim()) erros.push("O gênero é obrigatório!");
    
    if (!dados.texto?.trim() || dados.texto.trim().length < 50) {
        erros.push("Sua história está muito curta! Escreva pelo menos 50 caracteres.");
    }

    if (erros.length > 0) {
        throw new Error(erros.join("\n"));
    }
}