import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

export default class App extends React.Component {
  URL_CONTINENTS = "http://localhost:8000/app/continents"
  urlRegionsPrefix = "http://127.0.0.1:8000/app/regions?continent="
  urlCountriesPrefix = "http://127.0.0.1:8000/app/countries?region="
  urlCountryPrefix = "http://127.0.0.1:8000/app/country?country="
  urlCitiesPrefix = "http://127.0.0.1:8000/app/cities?countryCode="
  urlCityPrefix = "http://127.0.0.1:8000/app/city?city="

  constructor(props) {
    super(props);
    this.state = {
      continents: [],
      regions: [],
      countries: [],
      cities: [],
      continent: "",
      region: "",
      country: [],
      countryName: "",
      countryCode: "",
      city: [],
      cityName: ""
    };
  }

  componentDidMount() {
    fetch(this.URL_CONTINENTS)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            continents: result
          });
        }
      );
  }
/**/
  regions(continentName) {
    const url = this.urlRegionsPrefix + continentName;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("RRRRRRRRRRRr=" + result);
          this.setState({ 
            regions: result,
            continent: continentName
          });
        }
      );
  }

  countries(regionName) {
    const url = this.urlCountriesPrefix + regionName;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            countries: result,
            region: regionName
          });
        }
      );
  }  

  country(countryName) {
    const url = this.urlCountryPrefix + countryName;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            countryName: countryName,
            country: result
          });
        }
      );
  } 

  cities(countryCode) {
    const url = this.urlCitiesPrefix + countryCode;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {   
          this.setState({
            cities: result,
            countryCode: countryCode
          });
        }
      );
  }

  city(cityName) {
    const url = this.urlCityPrefix + cityName;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {   
          this.setState({
            city: result,
          });
        }
      );
  }

  render() {
    return (
    <div className="App">
      <div id="continents">
        <h1>Continents</h1>
        <span>
          {this.state.continents.map(c => (<input type="button" value={c.continent} onClick={() => {
            this.regions(c.continent);
          }} />))}
        </span> 
      </div>
        <h1>Regions in: {this.state.continent}</h1>
        <br />
        <span>
          {this.state.regions.map(r => (<input type="button" value={r.region} onClick={() => {
            this.countries(r.region);
          }} />))}
        </span> 
        <h1>Countries in: {this.state.region}</h1>
        <span className="countries">
          {this.state.countries.map(c => (
            <span>
              <input type="button" value={c.country} onClick={() => { this.country(c.country); }} />
              &nbsp;             
            </span>
          ))}
        </span>
        <h1>Country: {this.state.countryName}</h1>
        <span>
          {this.state.country.map(c => (
            <div>
              <input type="button" value="Cities" onClick={() => {this.cities(c.code);}} />
              <br />
              <span>Code {c.code}</span><br />
              <span>Name: {c.name}</span><br />
              <span>Continent: {c.continent}</span><br />
              <span>Region: {c.region}</span><br />
              <span>Surface Area{c.surfaceArea}</span><br />
              <span>Year of Independence: {c.independence}</span><br />
              <span>Population: {c.population}</span><br />
              <span>Life Expectancy: {c.lifeExpectancy}</span><br />
              <span>GNP: {c.gnp}</span><br />
              <span>GNP2: {c.gnpOld}</span><br />
              <span>Local Name: {c.localName}</span><br />
              <span>Government Form: {c.governmentForm}</span><br />
              <span>Head Of State: {c.headOfState}</span><br />
              <span>Capital: {c.capital}</span><br />
              <span>Code2: {c.code2}</span><br />     
              <hr />              
            </div>
          ))}
        </span>        
        <h1>Cities in: {this.state.countryName}</h1>
        <div id="cities">
          {
            this.state.cities.map(
              c => (
                <input type="button" value={c.city} onClick={() => { this.city(c.city); }} />
              )
            )
          }
        </div>
        <h1>City: {this.state.city.name}</h1>
        <div id="city">
          {
            this.state.city.map(
              c => (
                <div>
                  <span>Name: {c.name}</span><br />
                  <span>Country Code: {c.countryCode}</span><br />
                  <span>District: {c.district}</span><br />
                  <span>Population: {c.population}</span><br />
                </div>
              )
            )
          }          
        </div>        
    </div>        
   
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
