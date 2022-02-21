const request=require('request')

const iplocation=(ip,callback)=>{
    url=`http://ip-api.com/json/${ip}`
    request({url,json:true},(error,{body})=>{
            if(error){
                callback('Not Found',undefined)
            }
            else if(body.status==="fail"){
                callback('Not Found',undefined)
            }
            else{
                callback(undefined,{
                    country:body.country,
                    city:body.city
                })
            }
    })
}
module.exports=iplocation