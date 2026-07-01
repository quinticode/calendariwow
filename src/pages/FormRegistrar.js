import { useState } from "react";
import TextoLegal from "../components/TextoLegal";


export default function FormRegistrar(){

    const dadosPadrao = {
        nome: "",
        email: "",
        idade: "",
        aceiteTermos: false
    }
    
    const [formDados, setFormDados] = useState(dadosPadrao);

    const [enviado, setEnviado] = useState(false);

    // pega o ""objeto"" do evento de quando alguem digita, salva as informações q tao na const
    //

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormDados((anterior) => ({
            ...anterior,
            [name]: type === "checkbox" ? checked : value, 
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Dados Enviados: ", formDados);
        setEnviado(true);
    }

    function handleReset() {
        setFormDados(dadosPadrao)
        setEnviado(false)
    }

    if(enviado){
        return(
            <div>
                <h2>Cadastro Realizado!</h2>
                <p>{formDados.nome}, seu email {formDados.email} foi registrado com sucesso! </p>
                <button onClick={handleReset}>Novo cadastro</button>
            </div>
        )
    }

    return(
        <div>
            <TextoLegal conteudo="Cadastre-se!" tamanho="4rem"/>
            <form onSubmit={handleSubmit}>
                <div>

                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formDados.nome}
                        onChange={handleChange}
                        placeholder="digite seu nome"
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formDados.email}
                        onChange={handleChange}
                        placeholder="digite seu email"
                    />

                    <label htmlFor="idade">Idade:</label>
                    <input
                        type="number"
                        id="idade"
                        name="idade"
                        value={formDados.idade}
                        onChange={handleChange}
                        placeholder="digite sua idade em anos"
                        min={"1"}
                        max={"120"}
                    />

                    <input
                        type="checkbox"
                        id="aceiteTermos"
                        name="aceiteTermos"
                        value={formDados.aceiteTermos}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="aceiteTermos">Aceito os termos de uso</label>
                </div>

                <button type="submit">Cadastrar</button>
            </form>

            <div>
                <TextoLegal tamanho="1rem" conteudo="conteudo do formulario"/>
                <pre>{JSON.stringify(formDados, null, 2)}</pre>
            </div>
        </div>
       
    )
}