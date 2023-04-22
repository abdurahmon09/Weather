export const setData = ({data, img, bg}) => {
    return {
        celcius: data.data.main.temp, 
        name: data.data.name, 
        humidity: data.data.main.humidity, 
        speed: data.data.wind.speed, 
        clouds: data.data.clouds.all, 
        pressure: data.data.main.pressure,
        image: img,
        bg: bg
    }
}