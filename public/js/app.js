console.log("Client side js file is loaded")

fetch('http://puzzle.mead.io/puzzle').then((response)=> {
    response.json().then((data) => {
        console.log(data)
    })
})

// This fetches the first form element from the index.hbs page
const weatherForm = document.querySelector('form')
// This fetches the first input element from the index.hbs page
const locationElement = document.querySelector('input')

const statusText = document.querySelector("#statusText")
const messageText = document.querySelector("#messageText")
const placeText = document.querySelector("#placeText") 
const weatherText = document.querySelector("#weatherInformation").querySelector("#weatherText")
const temperatureText = document.querySelector("#temperatureText")
const feelsLikeText = document.querySelector("#feelsLikeText")
const humidityText = document.querySelector("#humidityText")
const weatherIcon = document.querySelector("#weatherInformation").querySelector('#weatherIcon')
// errorMessage.textContent = 'Error message to be displayed here'



weatherForm.addEventListener('submit', (e) =>{

    // This prevents the default behaviour of the browser which is to refresh the page 
    e.preventDefault()

    const location = locationElement.value

    statusText.textContent = 'Loading'
    messageText.textContent = ''

    if( location.length == 0 ){
        console.log('Please enter a location.')
        statusText.textContent = 'Error : '
        messageText.textContent = 'Please enter a location.'
        placeText.textContent = ''
        weatherText.textContent = ''
        temperatureText.textContent = ''
        feelsLikeText.textContent = ''
        humidityText.textContent = ''
        weatherIcon.setAttribute('src','')
        weatherIcon.setAttribute('style','display: none;')
    }
    else{

        // fetch('http://localhost:3000/weather?address='+location).then((response) => {
        // We change the above command to the one shown below so that it runs on Heroku and localhost
        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
    
                if( data.error ){
                    console.log('Error : ')
                    console.log(data.error)
                    statusText.textContent = 'Error : '
                    messageText.textContent = data.error
                    placeText.textContent = ''
                    weatherText.textContent = ''
                    temperatureText.textContent = ''
                    feelsLikeText.textContent = ''
                    humidityText.textContent = ''
                    weatherIcon.setAttribute('src','')
                    weatherIcon.setAttribute('style','display: none;')

                }                
                else{
                    console.log("Place: " + data.place)
                    console.log("Weather: " + data.weather)
                    console.log("Temperature: " + data.temperature)
                    console.log("Feels Like: " + data.feelsLike)
                    console.log("Humidity: " + data.humidity)
                    console.log(data.weather_icon)

                    const degreeTemperature = (data.temperature - 32) * (5/9)
                    const degreeFeelsLike = (data.feelsLike - 32) * (5/9)

                    statusText.textContent = ''
                    messageText.textContent = 'The weather information is : '
                    placeText.textContent = 'Place : ' + data.place
                    weatherText.textContent = 'Weather : ' + data.weather
                    temperatureText.textContent = 'Temperature : ' + data.temperature+'°F/' + degreeTemperature.toFixed(2) + "°C"
                    feelsLikeText.textContent = 'Feels Like : ' + data.feelsLike+'°F/' + degreeFeelsLike.toFixed(2) + "°C"
                    humidityText.textContent = 'Humidity : ' + data.feelsLike
                    weatherIcon.setAttribute('src',data.weather_icon )
                    weatherIcon.setAttribute('style','visible')
                }
            })
        
        })

    }



    


   
})

