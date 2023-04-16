// Minha api key e uma função com query parameters api key e o nome da cidade
const APIkey = 'muGNtd0hTFg1PROD5zEyNNLckRwz437k'
const getCityUrl = cityName => 
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIkey}&q=${cityName}`

// Função async
const getCityData = async cityName => {
    try {
        const cityUrl = getCityUrl(cityName)
        // Pegando os dados com a cityUrl
        const response = await fetch(cityUrl)

        // Checa se o request foi mal sucedido com o status diferente de 200 e lança um erro se retornar true
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }

        const cityData = await response.json()
        
        return cityData

    }catch (error) {
        alert(`${error.name} : ${error.message}`)
    }
}

const getCityWheater = async cityName => {
    try {
        const [{ Key }] = await getCityData(cityName)
        const cityWeatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIkey}&language=pt-br`
        
        const response = await fetch(cityWeatherUrl)
        
        
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }
        const weatherData = await response.json()

        return weatherData

    }catch ({ name, message }) {
        console.log(`${name} : ${message}`)
    }
}

