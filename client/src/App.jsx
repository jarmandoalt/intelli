import { useState, useEffect } from 'react'
import './App.css'
import { Button, CircularProgress } from '@mui/material'
import { saveData } from './services/Routes'
import screen from '../../server/puppeteer/screen.jpg'

function App() {
  const [data, setData] = useState({
    precio: '',
    descripcion: ''
  })
  const [load, setLoad] = useState(false)
  const [load2, setLoad2] = useState(false)
  const [img, setImg] = useState("")
  const [progress, setProgress] = useState(0)

  const handlerData = (e) => {
    setLoad(false)
    setLoad2(false)
    const { name, value } = e.target;
    setData({...data, [name]: value})
  }

  const save = async (e) => {
    e.preventDefault()
    setLoad(true)
    setLoad2(false)
    progressCount()
    const response = await saveData(data)
    if (response.status == 201) {
      setProgress(100)
      setTimeout(() => {
        setLoad2(true)
        setImg(response.data)
        setProgress(0)
      }, 2000);
    } 
    if (response == undefined) {
      setLoad(false)
    }
  }

  useEffect(() => {
    if (load) {
      progressCount()
    }
  }, [progress])
  

  const progressCount = () => {
    setTimeout(() => {
      setProgress(progress + 1)
      }, 1000);
  }

  return (
    <div className="App">
      <form onSubmit={save} >
        <div>
          <h1>Vende tu Vehiculo</h1>
        </div>
        <div>
          <h3>Precio</h3>
        </div>
        <div>
          <input required type="tesxt" title='Solo ingresar numeros' pattern="[0-9]+" value={data.precio} name='precio' onChange={handlerData}/>
        </div>
        <div>
          <h3>Descripción</h3>
        </div>
        <div>
          <textarea required id="" cols="20" rows="5" value={data.descripcion} name='descripcion' onChange={handlerData}></textarea>
        </div>
        <div>
          <Button variant="outlined" type='submit' >Publicar</Button>
        </div>
      </form>
      <div>
        {
          load ?
          <div>
            {
              load2 ?
              <div>
                <img src={screen} alt="" />
              </div> :
              <div>
                <h2>Publicando Anuncio</h2>
                <h2> {progress}%</h2>
                <CircularProgress />
              </div>
            }
          </div>:
          <div>
            
          </div>
        }
      </div>
    </div>
  )
}

export default App
