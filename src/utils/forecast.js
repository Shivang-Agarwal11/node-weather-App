const request=require('request')
const API_KEY='bf1a770e2109011f5369a36dbf2435d8'
const forecast=(latitude,longitude,callback)=>{
    
    url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    request({url,json:true},(error,{body})=>{
            if(error){
                    callback("Unable to connect to Weather Services",undefined)
                }
                else if(body.error){
                        callback('Unable to find location',undefined)
                    }
                    else{
                            callback(undefined,{temperature:(body.main.temp).toFixed(2),rainfall:body.main.humidity,forecast:body.weather[0].description})
                        }
                    })
    
}
module.exports=forecast;