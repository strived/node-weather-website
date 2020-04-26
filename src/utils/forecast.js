const request=require('request')

const forecast=(latitude,longitude,Callback)=>{

    const url='http://api.weatherstack.com/current?access_key=6cb4d61dfc8945fd7704b5574f3bd74b&query='+ latitude + ','+longitude + '&units=f'
request({ url, json:true},(error,{body})=>{ 

    if(error)
    {
        Callback('unable to connect to weather service!',undefined)
    }
    else if(body.error)
    {
        Callback('unable to find location. try another search',undefined)
    }
    else
    {
        const curData=body.current;
        Callback(undefined,curData.weather_descriptions[0] + '. It is currently '+ curData.temperature + ' degrees out. It feels like '+ curData.feelslike + ' degrees.')
       
    }
 
 })

}

module.exports=forecast