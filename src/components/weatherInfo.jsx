import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Input from './input';
import Button from './button';

class WeatherInfo extends Component {

    state = {
        inputObject: {
            location: ''
        },
        responseObject: {
            temperature: '',
            cityName: '',
            text: ''
        },
        errors: {}
    };
    
    componentDidMount() {
        const helsinkiKey = "133328";
        const cityName = "Helsinki"
        const apiKey = process.env.REACT_APP_API_KEY;
        this.searchCity(helsinkiKey, apiKey, cityName);
    };

    validate = () => {
        const errors = {};

        if (this.state.inputObject.location.trim() === '')
            errors.location = 'Location is required';

        return Object.keys(errors).length === 0 ? null : errors;
    };

    validateResponse = (data) => {
        const errors = {};
        
        if (!Array.isArray(data) || !data.length)
            errors.location = 'Location is not found';

        return Object.keys(errors).length === 0 ? null : errors;
    };

    async fetchKey(location) {
        const apiKey = process.env.REACT_APP_API_KEY;

        const cityName = location;

        const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=` + apiKey + `&q=${location}`);

        const data = response.data;

        const errors = this.validateResponse(data);
        this.setState({ errors: errors || {} });
        if (errors) return;

        const cityKey = response.data[0].Key;
        this.searchCity(cityKey, apiKey, cityName);
    };

    async searchCity(cityKey, apiKey, cityName) {
        const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=` + apiKey);
        const temperature = response.data[0].Temperature.Metric.Value;
        const text = response.data[0].WeatherText;

        const responseObject = {...this.state.responseObject};
        responseObject.temperature = Math.ceil(temperature);
        responseObject.text = text;
        responseObject.cityName = cityName;
        this.setState({ responseObject });
    };

    handleSubmit = e => {
        e.preventDefault();
        const location = e.currentTarget.querySelector('input').value;
        
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.fetchKey(location);

    };

    handleSearch = e => {
        const inputObject = {...this.state.inputObject};
        inputObject.location = e.currentTarget.value;
        this.setState({ inputObject });
    };

    render() { 
        return ( 
            <div >
                <div className="container d-flex align-items-center justify-content-center mt-5">
                    <form className="row g-3" onSubmit={this.handleSubmit}>
                        <Input 
                            value={this.state.inputObject.location} 
                            onChange={this.handleSearch} 
                            name="location"
                            error={this.state.errors.location}
                        />
                        <Button
                            type="submit"
                            label="Search"
                        />
                    </form>
                </div>
                <div>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-10 col-lg-8 col-xl-6">
                                <div className="card text-dark p-5">
                                    <h4 className="mb-0">{this.state.responseObject.cityName}</h4>
                                    <p className="display-2 my-3">{this.state.responseObject.temperature}°C</p>
                                    <h5>{this.state.responseObject.text}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default WeatherInfo;