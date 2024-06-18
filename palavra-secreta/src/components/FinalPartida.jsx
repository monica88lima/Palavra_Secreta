import "./FinalPartida.css"

const FinalPartida = ({reiniciar} ) => {
  return (
    <div><p>Final</p>
      <button onClick={reiniciar}>Recomeçar</button>
    </div>
  )
}

export default FinalPartida