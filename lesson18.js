let hour = document.querySelector('#hour')
let minute = document.querySelector('#minute')
let second = document.querySelector('#second')

let weekDay = document.getElementById('weekDay');
let month = document.getElementById('month');
let day = document.getElementById('day');

let inputName = document.querySelector('#name')

let quoteButton = document.querySelector('.change-quote');
let quoteText = document.querySelector('.quote')
let quoteAuthor = document.querySelector('.author')

let sliderNext = document.querySelector('.slide-next');
let sliderPrev = document.querySelector('.slide-prev');
let i = 1

let weather = document.querySelector('.weather')
let inputCity = document.querySelector('.city');
let temp = document.querySelector('.temperature');
let weatherDescription = document.querySelector('.weather-description');
let wind = document.querySelector('.wind p');
let humidity = document.querySelector('.humidity p');
let weatherIcon = document.querySelector('.weather-icon')
let weatherError = document.querySelector('.weather-error p')

let audio = document.querySelector('audio')
let play = document.querySelector('.play');
let playNext = document.querySelector('.play-next');
let playPrev = document.querySelector('.play-prev');
let playItems = document.querySelectorAll('.play-item')
let audios = ['./assets/sounds/Aqua Caelestis.mp3','./assets/sounds/River Flows In You.mp3','./assets/sounds/Summer Wind.mp3','./assets/sounds/Ennio Morricone.mp3']
let a = 0






// FUNCTIONS

// play Music
play.addEventListener('click', ()=> {
    play.classList.toggle('pause');
    if(audio.paused){
        audio.play()
    } else{
        audio.pause()
    }
    playItems[a].classList.add('active')
})

function playMusic(){
    audio.src = audios[a];
    for(let i =0 ; i<playItems.length; i++){
        playItems[i].classList.remove('active')
    }
    playItems[a].classList.add('active')
    audio.play()
    play.classList.add('pause');
}

playNext.addEventListener('click', ()=> {
    a++;
    a = a > 3 ? 0 : a ; 
    playMusic() 
})

playPrev.addEventListener('click', ()=> {
    a--;
    a = a < 0 ? 3 : a;
    playMusic()
})




// time
setInterval(()=>{
    let date = new Date();
    let hr = date.getHours();
    let mn = date.getMinutes();
    let sc = date.getSeconds();

    sc = sc < 10 ? "0" + sc : sc
    mn = mn < 10 ? "0" + mn : mn
    hr = hr < 10 ? "0" + hr : hr

    hour.innerHTML = hr
    minute.innerHTML = mn
    second.innerHTML = sc

    
},1000)


//date
let date = new Date()
let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
weekDay.innerHTML = week[date.getDay()] + ", "

month.innerHTML = 'July'
day.innerHTML = date.getDate()


//name localstorage
inputName.addEventListener('change', function(){
    let value = inputName.value
    localStorage.setItem('name', value)
})
inputName.value = localStorage.getItem('name')





// quotes
quoteButton.addEventListener('click', ()=> {
    let random = Math.floor(Math.random() * (200 - 1)) + 1;
    setQuote()
        .then((data) => upLoad(data[random]) )
})

let upLoad = (data)=> {
    quoteText.innerHTML = data.text
    quoteAuthor.innerHTML = data.author
}



//slider
function slider(){
    let when;
    i = i < 10 ? "0" + i : i;
    let time = new Date().getHours()
    if(time >= 8 && time < 12){
        when = 'morning';
    } else if (time >=12 &&  time<18){
        when = 'afternoon'
    } else if (time >=18 &&  time<23){
        when = 'evening'
    } else{
        when = 'night'
    }

    let url = setImage(when, i)
    document.body.style.backgroundImage = `url(${url}`
}

sliderNext.addEventListener('click', ()=> {
    i++;
    i = i > 20 ? "01" : i;
    slider()
})

sliderPrev.addEventListener('click', ()=> {
    i--;
    i = i < 1 ? "20" : i
    slider()
})




// weather
inputCity.addEventListener('keypress', (e)=> {
    if(e.key == 'Enter'){
        let value = inputCity.value;
        setWeather(value)
            .then((data) => getData(data))
            .catch((data) => (weatherError.innerHTML = data ))
    }
})

let getData = (data)=> {

    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    weatherDescription.innerHTML = data.weather[0].main;
    wind.innerHTML = "Wind Speed: " + Math.round(data.wind.speed) + "m/s";
    humidity.innerHTML = "Humidity: " + data.main.humidity + "%"

    weatherError.innerHTML = ""
}









