import React from 'react';
import ReactDOM from 'react-dom';

import './dsc.css';

export default class DataSourceClient extends React.Component {
  URL_CONTINENTS = "http://localhost:8000/app/continents"
  URL_CITY_ADD = "http://localhost:8000/app/add"
  URL_CITY_UPDATE = "http://localhost:8000/app/update"
  URL_CITY_DELETE = "http://localhost:8000/app/delete"
  urlRegionsPrefix = "http://127.0.0.1:8000/app/regions?continent="
  urlCountriesPrefix = "http://127.0.0.1:8000/app/countries?region="
  urlCountryPrefix = "http://127.0.0.1:8000/app/country?name="
  urlCitiesPrefix = "http://127.0.0.1:8000/app/cities?countryName="
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
      cityName: "",
      add: "",
      newCity: "",
      newCountryCode: "",
      district: "",
      population: -1,
      update: "",
      delete: ""
    };
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  async componentDidMount() {
    let response = await fetch(this.URL_CONTINENTS);
    let result = await response.json();
    
    this.setState({
      continents: result
    });
  }

  regions(continentName) {
    const url = this.urlRegionsPrefix + continentName;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
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
for (var e of result) {          
console.log("DSC/COUNTRY/code = " + e.code);
}
          this.setState({
            country: result,
            countryCode: result[0].code,
            countryName: countryName
          });
        }
      );
  } 

  cities(countryName) {
    const url = this.urlCitiesPrefix + countryName;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {   
          this.setState({        
            cities: result
          });
        }
      );
  }

  city(cityName) {
    const url = this.urlCityPrefix + cityName + "&countryCode=" + this.state.countryCode;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {   
          this.setState({
            city: result
          });
        }
      );
  }

  add(event) {
    const data = new FormData(document.getElementById("addForm"));

    fetch(
      this.URL_CITY_ADD, {
      method: "POST",
      body: data
    })
    .then((response) => { response.json(); })
    .then((result) => {
      console.log("RESULT: " + result);
      this.setState({
        add: result
      })
    })
    .catch(error => console.log("ADD/error: " + error));

    event.preventDefault();
  }

  update(data) {
    fetch(this.URL_CITY_UPDATE, {method: "PUT", data: data})
      .then((res) => { res.json(); })
      .then(
        (result) => {
          this.setState({
            update: result
          });
        }
      );
  }

  delete(event) {
    const url = this.URL_CITY_DELETE + "/" + event.target.name;

    fetch(url, {method: "DELETE"})
      .then((res) => { res.json(); })
      .then(
        (result) => {
          console.log("DELETE: " + result);
          this.setState({
            delete: result
          });
        }
      );
  }

  render() {
    return (
    <div className="dss">
      <div id="continents">
        <h1>Continents</h1>
        <span>
          {this.state.continents.map(c => (<input type="button" value={c.continent} onClick={() => {
            this.regions(c.continent);
          }} />))}
        </span> 
      </div>
        <h1>Regions in: {this.state.continent}</h1>
        
        <span>
          {this.state.regions.map(r => (<input type="button" value={r.region} onClick={() => {
            this.countries(r.region);
          }} />))}
        </span> 
        <h1>Countries in: {this.state.region}</h1>
        <span className="countries">
          {
            this.state.countries.map(c => (
            <span>
              <input type="button" value={c.country} onClick={() => { this.country(c.country); 
                document.getElementById("cities").innerHTML = "";
                document.getElementById("cities").style.display = "inline";
                this.cities(this.state.countryName); }} />
              &nbsp;             
            </span>
          ))}
        </span>
        <h1>Country: {this.state.countryName}</h1>
        <span>
          {
            <table>
              <thead>
                <th>Code</th>
                <th>Name</th>
                <th>Continent</th>
                <th>Region</th>
                <th>Surface Area</th>
                <th>Year of Independence</th>
                <th>Population</th>
                <th>Life Expectancy</th>
                <th>GNP</th>
                <th>GNP2</th>
                <th>Local Name</th>
                <th>Government Form</th>
                <th>Head Of State</th>
                <th>Capital</th>
                <th>Code2</th>     
              </thead>
              <tbody>
                {
                  this.state.country.map(
                    c => (
                    <tr>
                      <td>{c.code}</td>
                      <td>{c.name}</td>
                      <td>{c.continent}</td>
                      <td>{c.region}</td>
                      <td>{c.surfaceArea}</td>
                      <td>{c.independence}</td>
                      <td>{c.population}</td>
                      <td>{c.lifeExpectancy}</td>
                      <td>{c.gnp}</td>
                      <td>{c.gnpOld}</td>
                      <td>{c.localName}</td>
                      <td>{c.governmentForm}</td>
                      <td>{c.headOfState}</td>
                      <td>{c.capital}</td>
                      <td>{c.code2}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          }
          <input type="button" id="cities" value="Cities" onClick={
            () => { 
              this.cities(this.state.countryName);
              document.getElementById("add").style.display = "inline";
            }} 
          />
        </span>        
        <h1 id="cityContainer">Cities:</h1>
        <div>
          {
            this.state.cities.map(
              c => (
                <span>
                  <input type="button" value={c.city} onClick={() => { this.city(c.city); }} />
                </span>
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
                  <span>Name: {c.name}</span>
                  <span>Country Code: {c.countryCode}</span>
                  <span>District: {c.district}</span>
                  <span>Population: {c.population}</span>
                  <span>Update</span>
                  <button name={c.id} onClick={this.delete}>Delete</button>
                </div>
              )
            )
          }          
        </div>
        <div>
        <h1>Add City in {this.state.countryName}</h1>
      {
        <form id="addForm" onSubmit={this.add}>
          <label for="newCity">Name: </label>
          <input name="newCity" type="text" value={this.state.newCity} required onChange={(e) => {this.setState({newCity: e.target.value});}} />
          <label for="newCountryCode">Country Code: </label>
          <input name="newCountryCode" type="text" value={this.state.newCountryCode} onChange={(e) => {this.setState({newCountryCode: e.target.value});}} />
          <label for="newDistrict">District: </label>
          <input name="district" type="text" value={this.state.district} onChange={(e) => {this.setState({district: e.target.value});}} />
          <label for="population">Population: </label>
          <input name="population" type="number" value={this.state.population} onChange={(e) => {this.setState({population: e.target.value});}} />
          <input type="submit" value="Add" />
        </form>
      }
    </div>      
    </div>        
    
    );
  }
}

ReactDOM.render(<DataSourceClient />, document.getElementById("root"));
