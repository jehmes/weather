//Communication backend API and external API
const inputSearch = document.getElementById('search')
const buttonSearch = document.getElementById('buttonSearch')

buttonSearch.onclick = ev => {
    
    ev.preventDefault()

const url =`http://localhost:4567/city/?query=${inputSearch.value}`
fetch(url)
.then(resp => resp.json())
.then(data => {
    informations(data)
    })
}

//Changing elements on page
const informations = data => {
    const city = document.getElementById('cityContent')
    const temperature = document.getElementById('temperatureContent')
    const weatherIcon = document.getElementById('weatherIcon')
    const humidity = document.getElementById('humidity')
    const speed = document.getElementById('speed')

    const nameValue = data.location.name
    const currentTemperatureValue = data.current.temperature
    const weather = data.current.weather_icons
    const humidityValue = data.current.humidity
    const speedValue = data.current.wind_speed

    city.innerHTML = nameValue
    temperature.innerHTML = `${currentTemperatureValue}°C`
    weatherIcon.src = weather
    humidity.innerHTML = `${humidityValue}%`
    speed.innerHTML = `${speedValue}km/h`

    inputSearch.value = ''
    
    //PARO AQUI. TEM Q CRIAR UMA FORMA DE N SALVAR NO LOCALSTORAGE POR CIMA

    localStorage.setItem('historic', JSON.stringify({
        'name': nameValue,
        'temperature': currentTemperatureValue,

    }))
}


// buttonSearch.onclick = ev => {

//     ev.preventDefault()
//     const query = inputSearch.value
//     const options = {
//         method: 'GET',
//         mode: 'cors',
//         cache: 'default'
//     }

//     fetch(`http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`, options)
//         .then(res => {
//             res.json()
//                 .then(data => informations(data))
//         })
//         .catch(e => console.log(e))

// }

//Marcar o menu de acordo com os #

window.addEventListener("hashchange", (x) => {

    const oldURL = x.oldURL.split('#')[1]
    const newURL = x.newURL.split('#')[1]


    const oldMenu = document.querySelector(`.menu a[href='#${oldURL}']`)
    const newMenu = document.querySelector(`.menu a[href='#${newURL}']`)

    oldMenu.classList.remove('selected')
    newMenu.classList.add('selected')
})