const initailState = {
    datas: [{
      celcius: 10,
      name: 'Tashkent',
      humidity: 10,
      speed: 2,
      clouds: 0,
      pressure: 1100,
      image: '',
      bg: ''
    }]
  }

export const info = (state = initailState, data) => {
    return {...state, datas: data}
  }