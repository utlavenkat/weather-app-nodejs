const request = require('request')
const access_token = 'pk.eyJ1IjoidXRsYXZlbmthdCIsImEiOiJja2Y1Z2hkbWEwaXRvMnRxZDhmbDMxaGUzIn0.L20nq2QGrDARGCRYQmu28w'

const getGeoCodes = (location,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token='+ access_token
    request({url,json:true},(error,{body}) => {
        if(error) {
            callback(error,undefined)
        } else if(body.features === undefined || body.features == null  || body.features.length === 0) {
            callback('Location Not found',undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const responseData = {
                latitude,
                longitude
            }
            callback(undefined,responseData)
        }
    })
}

module.exports = {
    getGeoCodes: getGeoCodes
}

