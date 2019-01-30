import React, { Component } from 'react';
import './App.css';
import Title from './Components/Title';
import Form from './Components/Form';
import Weather from './Components/Weather';

const API_KEY = '7bd6fa23476a57ef6374449688cd6f5f';

class App extends Component {

  state = {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }

  getWeather = async (e) => {
    e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
        const data = await api_call.json()

        console.log(data);


        if(city && country) {
          const roundTemp = Math.round(data.main.temp);
          const toCap = data.weather[0].description;
          const descCap = toCap.charAt(0).toUpperCase() + toCap.slice(1);
          this.setState({
            temperature: roundTemp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: descCap,
            error: ''
        });
        } else {
          this.setState({
            temperature: '',
            city: '',
            country: '',
            humidity: '',
            description: '',
            error: 'Please enter a valid city and country'
        });
    }
  }
  render() {
    return (
      
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-6 title-container">
                  <Title />
                </div>
                <div className="col-xs-5 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    );
  }
}

export default App;
