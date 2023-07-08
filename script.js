window.addEventListener('DOMContentLoaded',()=>{
    const api = {
        key: "6a0b40b6abde493f83e84825230807",
        urlBase: "http://api.weatherapi.com/v1/forecast.json"
    }

    let city=document.querySelector('.city'),
        date=document.querySelector('.date'),
        temp=document.querySelector('.temp'),
        weather=document.querySelector('.weather'),
        highLow=document.querySelector('.high-low'),
        searchBox = document.querySelector('.search-box')


    searchBox.addEventListener('keypress', function (event) {
        let searchData = searchBox.value
        if (event.key === 'Enter' && searchData) {
            fetchApi(searchData)
            searchBox.value=''
        }
    })


    function changeWeatherDetails(data) {
        let dateInfo=new Date(data.location.localtime).toLocaleDateString('en-us',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
        city.textContent=data.location.name+","+data.location.country
        date.textContent=dateInfo.replaceAll(","," ",)
        weather.textContent=data.current.condition.text
        temp.innerHTML=`${data.current.temp_c}<strong>°C</strong>`
        highLow.textContent=`${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°C/${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°C`

    }

    function fetchApi(searchData) {
        fetch(`${api.urlBase}?key=${api.key}&q=${searchData}`)
            .then(response => response.json())
            .then(function (data) {
                if(data.location){
                    changeWeatherDetails(data)
                }
            })
    }

})

