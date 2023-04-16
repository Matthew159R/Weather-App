const cityForm = document.querySelector('[data-js="change-location"]')
const containerSpan = document.querySelector('.display-4')
const cityName = document.querySelector('.cityName')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

cityForm.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.city.value
    const [{ Key, LocalizedName}] = await getCityData(inputValue)
    console.log(Key, LocalizedName)
    cityName.textContent = LocalizedName
    const cityWheater = getCityWheater(inputValue)
    cityWheater
        .then(data => {
            const temperature = data[0].Temperature.Metric.Value
            const weatherText = data[0].WeatherText
            const isDayTime = data[0].IsDayTime
            const weatherIcon = data[0].WeatherIcon
            containerSpan.querySelector('.number').textContent = temperature
            console.log(weatherIcon)

            if (isDayTime) {
                timeImg.src = './src/day.svg'
            }else {
                timeImg.src = './src/night.svg'
            }

            const timeIcon = `<img src="./src/icons/${weatherIcon}.svg"/>`
            
            timeIconContainer.innerHTML = timeIcon
        })
    
    if (cityCard.classList.contains('d-none')) {
        cityCard.classList.remove('d-none')
    }

    cityForm.reset()
})