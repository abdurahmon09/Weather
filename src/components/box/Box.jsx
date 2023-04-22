import { useState } from 'react'
import './box.css'
import axios from 'axios'
import searchIcon from '../../img/search.svg'
import './nav.css'
import clearIcon from '../../img/sunny.png'
import rainyIcon from '../../img/rainy.png'
import mistIcon from '../../img/foggy.png'
import drizzleIcon from '../../img/drizzle.png'
import snowIcon from '../../img/snowy.png'
import cloudsIcon from '../../img/cloudy.png'
import sunnyBg from '../../img/sunnyBg.jpg'
import rainyBg from '../../img/rainyBg.jpg'
import snowBg from '../../img/snowBg.jpg'
import mistBg from '../../img/mistBg.jpg'
import cloudBg from '../../img/cloudBg.jpg'
import moment from 'moment/moment'
// import { useDispatch, useSelector } from 'react-redux'
// import { setData } from '../../store/setData'

export default function Box()  {
  // const data = useSelector( state => state.datas)
  const  [data, setData] =useState({
      celcius: 10,
      name: 'Tashkent',
      humidity: 10,
      speed: 2,
      clouds: 0,
      pressure: 1100,
      image: cloudsIcon,
      bg: sunnyBg
  })

  const [name, setName] = useState('');
  const [error, setError] = useState('')
  // const dispatch = useDispatch()

  const click = () => {
    if(name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=85a0e727549a8415055f045f8ba69cc1&units=metric`
       axios.get(apiUrl)
      .then(res => {
        let imgPath = ''
        let bgPath = ''
          if(res.data.weather[0].main === 'Clear') {
            imgPath = clearIcon
            bgPath = sunnyBg
          } else if(res.data.weather[0].main === 'Rain'){
            imgPath = rainyIcon
            bgPath = rainyBg
          }else if(res.data.weather[0].main === 'Snow'){
            imgPath = snowIcon
            bgPath = snowBg
          }else if(res.data.weather[0].main === 'Drizzle'){
            imgPath = drizzleIcon
            bgPath = rainyBg
          }else if(res.data.weather[0].main === 'Mist'){
            imgPath = mistIcon
            bgPath = mistBg
          }else if(res.data.weather[0].main === 'Clouds'){
            imgPath = cloudsIcon
            bgPath = cloudBg
          } else {
            imgPath = cloudsIcon
            bgPath = sunnyBg
          }

        console.log(res.data);
        // dispatch(setData({ res , imgPath, bgPath }
          setData({...data, celcius: res.data.main.temp, 
        name: res.data.name, 
        humidity: res.data.main.humidity, 
        speed: res.data.wind.speed, 
        clouds: res.data.clouds.all, 
        pressure: res.data.main.pressure,
        image: imgPath,
        bg: bgPath
      }
      )
        
      setError('')
      })
      .catch( err => {
        if(err.response.status === 404) {
          setError('Not found')
        } else {
          setError('')
        }
        console.log(err)
      })

    }
  }

  const clickCity = (city) => {
    setName(city)
     click()
  }

const today = moment().format('HH:mm - dddd D MMM')

  return (
    <div className="">
      <img className='bgImg' src={data.bg} alt=''></img>
  <div className='container'>
    <div className='smcontainer'>
        <div className="title">The.Weather</div>
        <div className="card">
          <div className="number">{Math.round(data.celcius)}°</div>
          <div className="smCard">
            <div className="location">{data.name}</div>
            <div className="time">{today}</div>
          </div>
          <div className="logo"><img src={data.image} alt='' /></div>
        </div>
    </div>
    <div className='nav'>
      <div className="locations">
        <div className="search">
          <input type="text" placeholder='Another location' onChange={e => setName(e.target.value)}/>
          <button onClick={click}><img src={searchIcon} alt="" /></button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="cities">
          <button onClick={() => clickCity('tashkent')}>Tashkent</button>
          <button onClick={() => clickCity('Andijan')}>Andijan</button>
          <button onClick={() => clickCity('Bukhara')}>Bukhara</button>
          <button onClick={() => clickCity('Fergana')}>Fergana</button>
          <button onClick={() => clickCity('Jizzakh')}>Jizzakh</button>
          <button onClick={() => clickCity('Namangan')}>Namangan</button>
          <button onClick={() => clickCity('Navoi')}>Navoi</button>
          <button onClick={() => clickCity('Qashqadaryo')}>Qashqadaryo</button>
          <button onClick={() => clickCity('Karakalpakstan')}>Karakalpakstan</button>
          <button onClick={() => clickCity('khiva')}>Khiva</button>
          <button onClick={() => clickCity('Samarkand')}>Samarkand</button>
          <button onClick={() => clickCity('Sirdaryo')}>Sirdaryo</button>
          <button onClick={() => clickCity('Termez')}>Termez</button>
        </div>
      </div>
      <div className="details">
        <h2 className="details__title">Weather Details</h2>
        <div><p>Cloudy</p> <p>{data.clouds}%</p></div>
        <div><p>Humidity</p> <p>{data.humidity}%</p></div>
        <div><p>Wind</p> <p>{Math.round(data.speed)} km/h</p></div>
        <div><p>Pressure</p> <p>{data.pressure} Pha</p></div>
      </div>
    </div>
  </div>
    </div>
  )
    
}
