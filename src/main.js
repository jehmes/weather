//Communication backend API and external API
const inputSearch = document.getElementById('search')
const buttonSearch = document.getElementById('buttonSearch')

renderTable()

buttonSearch.onclick = ev => {

    //Fields treatment 
    if (!inputSearch.value) {
        alert("Preencha o campo")
        return
    }
    ev.preventDefault()
    //Consuming back-end API 
    const url = `http://localhost:4567/city/?query=${inputSearch.value}`
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            const obj = {
                name: data.location.name,
                temperature: data.current.temperature,
                humidity: data.current.humidity,
                airSpeed: data.current.wind_speed,
                date: new Date().toLocaleString('pt-BR', { month:'numeric', day:'numeric', hour: 'numeric', minute: 'numeric' }),
                weather : data.current.weather_icons
            }
            //Update the card and save at localStorage
            informations(obj)
            //Quando pesquisa, inseri no html a cidade pesquisada
            addInformation(obj)
        })
}

const city = document.getElementById('cityContent')
const temperature = document.getElementById('temperatureContent')
const weatherIcon = document.getElementById('weatherIcon')
const humidity = document.getElementById('humidity')
const speed = document.getElementById('speed')

//Update the card and save at localStorage
const informations = data => {
    //Modify the card weather
    city.innerHTML = data.name
    temperature.innerHTML = `${data.temperature}°C`
    weatherIcon.src = data.weather
    humidity.innerHTML = `${data.humidity}%`
    speed.innerHTML = `${data.airSpeed}km/h`

    inputSearch.value = ''

    //Saving  weather's informations at localStorage
    const date = new Date().toLocaleString('pt-BR', { month:'numeric', day:'numeric', hour: 'numeric', minute: 'numeric' })
    const weatherInformation = {
        'name': data.name,
        'temperature': data.temperature,
        'humidity': data.humidity,
        'airSpeed': data.airSpeed,
        'date': date
    }
    //If there's no information at localstorage, return [], if does attach in dataStorage
    let dataStorage = JSON.parse(localStorage.getItem('weatherInformation')) || []
    dataStorage.push(weatherInformation)
    localStorage.setItem('weatherInformation', JSON.stringify(dataStorage))
}


//Renders the table with all data from localStorage
function renderTable() {
    //If there's no information at localstorage, return [], if does attach in dataStorage
    const informationLocalStoraga = localStorage.getItem('weatherInformation') ?
    JSON.parse(localStorage.getItem('weatherInformation')) : [] 
    informationLocalStoraga.forEach(w => addInformation(w))
}

//Create the table in HTML
function addInformation(wt) {

    const row = document.createElement('tr')

    row.innerHTML = `
    <td>${wt.name}</td> 
    <td>${wt.temperature}</td>     
    <td>${wt.humidity}</td> 
    <td>${wt.airSpeed}</td> 
    <td>${wt.date}</td>     
    <button id="delete">x</button>
    `
    document.getElementById('table').appendChild(row)
}

//styling CSS. Keep mark the tagMenu from navBar
window.addEventListener("hashchange", (x) => {

    const oldURL = x.oldURL.split('#')[1]
    const newURL = x.newURL.split('#')[1]


    const oldMenu = document.querySelector(`.menu a[href='#${oldURL}']`)
    const newMenu = document.querySelector(`.menu a[href='#${newURL}']`)

    oldMenu.classList.remove('selected')
    newMenu.classList.add('selected')
})