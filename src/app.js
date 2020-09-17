const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const geocodeService = require('./utils/geocodeservice')
const weatherService = require('./utils/weatherservice')

const publicDirPath = path.join(__dirname,'../public')
const partialsDirPath = path.join(__dirname,'../partials')

const app = express()
app.use(express.static(publicDirPath))
app.set('view engine','hbs')

hbs.registerPartials(partialsDirPath)

app.get('',(request,response) => {
    response.render('index',{
        title: 'Weather Application',
        name: 'Venkat Utla' 
    })
})
app.get('/weather', (request,response) => {
    const location = request.query.location
    if(location) {
        geocodeService.getGeoCodes(location, (error,{latitude,longitude} = {})  => {
            if(error) {
                response.send({error})
            } else {
                weatherService.getWeatherInfo(latitude,longitude,(error,forecast) => {
                    if(error) {
                        response.send({error})
                    }  else {
                        response.send(forecast)
                    }
                })
            }
        })
    } else {
        response.send({
            error: 'Location is missing'
        })
    }

})

app.get('/about', (request,response) => {
    response.render('about',{
        title: 'Weather Application',
        name: 'Venkat Utla' 
    })
})
app.get('/help', (request,response) => {
    response.render('help',{
        title: 'Weather Application',
        name: 'Venkat Utla' 
    })
})

app.get('*',(request,response) => {
    response.status(404).render('404',{
        title: 'Weather Application',
        name: 'Venkat Utla' 
    })
})
app.listen(3000,() => {
    console.log(chalk.green('Server is up'))
})