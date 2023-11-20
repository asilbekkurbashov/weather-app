let setQuote = async ()=>{
    let API = 'https://type.fit/api/quotes/'
    
    let quote = await  fetch(API)
    let quoteJson = await quote.json()
    return quoteJson
}



let setImage = (when,number)=> {
    let API = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${when}/${number}.jpg`;
    return API
}




let setWeather = async (city)=> {
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;

    let weahter = await fetch(API);
    if(weahter.status != 200){
        throw new Error(`City not found for "${city}"`)
    }
    let weatherJson = await weahter.json();

    return weatherJson
}




