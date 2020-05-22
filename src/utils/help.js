const request=require("request")

var obj={};
obj.temp=(place,callback)=>{
const url2="https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=pk.eyJ1IjoicmJhaXJhZ2kxNjUiLCJhIjoiY2s5ZTFzcmdmMDE1ZDNtbzYxbmJyYzQ4aSJ9.YZNGDiYWGcDqOzoi5nImZQ";
var long;
var lat;

request({url : url2,json : true},(error, response)=>
{
  try{
        long=response.body.features[0].center[1];
        lat=response.body.features[0].center[0];
        console.log(long,lat);
        const url= "http://api.weatherstack.com/current?access_key=39f5a37f69adb842a9f085838602c8f5&query="+long+","+lat;
    //http://api.weatherstack.com/current?access_key=39f5a37f69adb842a9f085838602c8f5&query=23.43,76.27
        request({url : url,json:true},(error, response)=>
            {
                if(error)
                {
                    console.log("there is prblm in conn");
                    callback("there is prblm in conn")
                    
                }
                else if(response.body.error)
                {
                    console.log("problm in long and lat");
                }  
                else  
                {   
                    //console.log(response.body.current.temperature);
                    callback([response.body.current.temperature,
                    response.body.location.country,
                    response.body.location.region,
                    response.body.location.localtime]);
                }
            });
    }
    catch(e)
    {

        console.log("there is prblm in conn");
        callback("there is prblm in conn");
    }
})
}
//http://api.weatherstack.com/current?access_key=39f5a37f69adb842a9f085838602c8f5&query=23.43,76.27
 



// var x=temp("shajapur",(data)=>{
//     console.log("temp is"+data);
// })

module.exports=obj;
