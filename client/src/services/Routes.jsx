import Axios from 'axios'

const baseUrl = 'http://localhost:5050/v1'

export async function saveData (data) {
  
  try {
    const response = await Axios({
      url: `${baseUrl}/sendAd`,
      method: 'POST', params: {
        precio: data.precio,
        descripcion: data.descripcion
    }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}
