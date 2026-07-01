import { useState } from "react";

export default function OutroContador({emoji, valor}){

    return(
        <button onClick={() => setValor(valor - 1)}>
            {emoji} , {valor}
        </button>
    )
}