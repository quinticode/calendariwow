import './App.css';
import TextoLegal from './TextoLegal';

function App() {
  return (
    <div className="App">
      <TextoLegal tamanho={15} conteudo={"OIOI"}/>
      <TextoLegal tamanho={40} conteudo={"TESTE"}/>
      <TextoLegal tamanho={100}/>
    </div>
  );
}

export default App;

