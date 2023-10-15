import { DropHalf, ThermometerSimple, Wind } from '@phosphor-icons/react'
import { useState } from 'react'
import { Empty } from './components/Empty'

export function App() {
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState(null)

  const apiKey = '2925bc2c8fa7783264acf86a9feccb07'
  const apiIconUrl = 'http://openweathermap.org/img/wn/'
  const apiCountryBRL = 'https://flagcdn.com/'

  function handleChangeLocale(event) {
    setLocation(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  function getWeatherLocation() {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&lang=pt_br`,
      )
        .then((response) => {
          if (!response.ok) {
            alert('Local não encontrado')
            setLocation('')
            throw new Error('City not found')
          }
          return response.json()
        })
        .then((data) => {
          setWeather(data)
          setLocation('')
        })
    } catch (error) {
      alert('Cidade não encontrada!')
    }
  }

  return (
    <div className="bg-slate-900 w-full h-screen flex items-center justify-center text-slate-100">
      <div className="max-w-xl w-[90%]">
        <h1 className="text-4xl font-bold text-center mb-4">Weather io</h1>

        <form
          className="w-full bg-slate-800 p-4 rounded flex"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full bg-transparent p-4 outline-none border-b-2 focus-within:border-indigo-600 transition-all"
            onChange={handleChangeLocale}
            value={location}
            type="text"
            placeholder="Digite aqui o nome da cidade"
          />
          <button
            className="bg-indigo-600 p-4 font-bold text-lg"
            onClick={getWeatherLocation}
          >
            Pesquisar
          </button>
        </form>

        <div>
          {weather ? (
            <div className="transition-all">
              <h2 className="flex items-center justify-center gap-4 mt-10 text-2xl font-bold">
                {weather.name}, {weather.sys.country}
                <img
                  className="w-10"
                  src={
                    apiCountryBRL + weather.sys.country.toLowerCase() + '.svg'
                  }
                  alt=""
                />
              </h2>

              <div className="flex items-center justify-center gap-6">
                <p className="text-4xl font-bold flex items-center gap-1">
                  <ThermometerSimple />
                  {parseInt(weather.main.temp)}Cº
                </p>
                <p className="flex items-center gap-1 text-xl font-bold my-6">
                  {weather.weather[0].description}
                  <img
                    className="w-16"
                    src={apiIconUrl + weather.weather[0].icon + '.png'}
                    alt=""
                  />
                </p>
              </div>
              <div className="flex items-center justify-center my-6">
                <div className="flex items-center gap-1 pr-4 mr-5 border-r border-slate-50">
                  <DropHalf className="text-2xl" />
                  <p className="text-xl font-bold">{weather.main.humidity}%</p>
                </div>
                <div className="flex items-center gap-1 -ml-1">
                  <Wind className="text-2xl" />
                  <p className="text-xl font-bold">{weather.wind.speed}km/h</p>
                </div>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  )
}
