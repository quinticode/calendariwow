export default function Contador({valor, setValor, emoji, modo}){

    function acao(modo){
        if(modo === "decremento"){
            setValor(valor - 1)
        } else {
           setValor(valor + 1)
        }
    }

    return (
        <button onClick={() => acao(modo)}>
            {emoji}, {valor}
        </button>
    );
}