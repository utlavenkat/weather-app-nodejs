const weatherForm = document.querySelector('form')
const resultEl = document.querySelector('p#result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = e.target.elements.location.value
    resultEl.textContent = 'Loading...'
    getForecast(location, (error,response) => {
        resultEl.textContent = response != null ? response.weatherForecast: error
    })
    
})
const getForecast = (location,callback) => {
    fetch('http://localhost:3000/weather?location='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                callback(data.error,undefined)
            } else {
                callback(undefined,data)
            }
        })
    })
}
