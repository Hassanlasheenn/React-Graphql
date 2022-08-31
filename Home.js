import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import {GET_WEATHER_QUERY} from '../graphql/Queries';
import '../../src/App.css';

function Home() {

    const [citySearched, setCitySearched] = useState('');

    const [getWeather, { loading, data, err }] = useLazyQuery(GET_WEATHER_QUERY, {
        variables: { name: citySearched },
    });

    if(err) return <h1> Error found</h1>
    if(data) {
        console.log(data);
    }
    if(loading) return <p className='loading'>LoAdInG ...</p>;


  return (
    <div className='home'>
        <h1>Search For Weather</h1>
        <div className='form'>
                <input className='input' type="text" placeholder='City name...' onChange={(event) => {setCitySearched(event.target.value)}}/>
                <button onClick={() => getWeather()}> Search</button>
        </div>
      
      <div className='weather'>
        {data && (
            <>
                <h1> City: <h2 className="h2">{data.getCityByName.name}</h2> </h1>
                <h1> Temperature: <h2 className="h2">{data.getCityByName.weather.temperature.actual} °K</h2></h1>
                <h1> Description: <h2 className="h2">{data.getCityByName.weather.summary.description}</h2> </h1>
                <h1> Wind Speed: <h2 className="h2">{data.getCityByName.weather.wind.speed}</h2></h1>
            </>
            
        )}
        
      </div>
    </div>
  );
}

export default Home
