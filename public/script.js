
navigator.geolocation.getCurrentPosition( async (pos)=>{
    
    const latitude = pos.coords.latitude
    const longitude  = pos.coords.longitude
    const API = `/weather/${latitude},${longitude}`
    const response = await fetch(API)
    const json = await response.json()
    console.log(json)
     const headLine = `It is ${json.current.condition.text} feels like ${json.current.feelslike_c}°C at ${latitude},${longitude}`
     document.querySelector("#head-line").textContent = headLine
     
     

})

document.querySelector("#check-in").addEventListener("click", ()=>{
    

    navigator.geolocation.getCurrentPosition(  async (pos)=>{
        

        const latitude = pos.coords.latitude
        const longitude  = pos.coords.longitude
        let condition
        let feelslike_c

        const API = `/weather/${latitude},${longitude}`
        const response_weather = await fetch(API)
        const json = await response_weather.json()

    
         const headLine = `It is ${json.current.condition.text} feels like ${json.current.feelslike_c}°C at ${latitude},${longitude}`
         document.querySelector("#head-line").textContent = headLine
         
         condition = json.current.condition.text
         feelslike_c = json.current.feelslike_c

         const data = {
            latitude: latitude,
            longitude: longitude,
            condition: condition,
            feelslike_c: feelslike_c,
        }
        console.log(data)
        options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data),
        }
    
        const response_post = await fetch("/api",options)
        
        window.location.href = "./check_in_log";
    })    
    
})

