const request = require('request')
let baseurl = 'http://api.weatherstack.com/current?access_key=62617206a668cb65046ea87e94bb5c31'

const getWeatherInfo = (latitude,longitude,callback) => {
    baseurl = baseurl + '&query='+latitude+','+longitude+'&units=m'
    request({url:baseurl, json:true},(error,{body}) => {
        if(error) {
            callback(error,undefined)            
        } else if(body.error) {
            callback(body.error.info,undefined)
        } else {
            const temporature = body.current.temperature
            const feelLikeTemparature = body.current.feelslike
            const weatherForecast = (body.current.weather_descriptions != undefined && body.current.weather_descriptions != null && body.current.weather_descriptions.length > 0) ? body.current.weather_descriptions[0]:''
            
            const responseData = {
                temporature,
                feelLikeTemparature,
                weatherForecast
            }
            callback(undefined,responseData)
        }
    })
}

module.exports = {
    getWeatherInfo: getWeatherInfo
}