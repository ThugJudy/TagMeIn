import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext"
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { homeString } from "../Context/constants";

export const PostTrip = () => {


    const [vehicleList, setVehicleList] = useState([])
    const { currentUserEmail, currentUserId } = useContext(AuthContext)
    // console.log(currentUserId)

    const [inputs, setInputs] = useState({
        tripDate: "",
        tripTime: "",
        tripSource: "",
        tripDestination: "",
        tripVehicle: "",
        // srclat: "",
        // srclong: "",
        // destlat: "",
        // destlong: ""
    })

    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('');
    const [srclat, setSourceLat] = useState('')
    const [srclong, setSouceLong] = useState('')
    const [destlat, setDestinationLat] = useState('')
    const [destlong, setDestinationLong] = useState('')

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }

    const handleChange1 = address => {
        setAddress(address);
    };

    const handleSelect1 = value => {
        geocodeByAddress(value)
          .then(results => getLatLng(results[0]))
          .then(latLng => handleSrcLatLng(latLng))
          .catch(error => console.error('Error', error));
        setAddress(value)
    };

    const handleChange2 = address => {
        setAddress1(address);
    };

    const handleSelect2 = value => {
        geocodeByAddress(value)
          .then(results => getLatLng(results[0]))
          .then(latLng => handleDestLatLng(latLng))
          .catch(error => console.error('Error', error));
        setAddress1(value);
      };

    const handleSrcLatLng = latLng => {
    setSourceLat(latLng['lat']);
    setSouceLong(latLng['lng']);
    }

    const handleDestLatLng = latLng => {
    setDestinationLat(latLng['lat']);
    setDestinationLong(latLng['lng'])
    }

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(homeString+"/getVehicle", { params: { id: currentUserId } })
            if (response.data.length > 0) {
                setVehicleList(response.data)
            }
            else {
                setVehicleList(response.data)
            }
        }
        fetchData()
    }, [currentUserId]
    )

    const submitLogin = async () => {
        inputs['tripDestination'] = address1;
        inputs['tripSource'] = address;
        inputs['srclat'] = srclat;
        inputs['srclong'] = srclong;
        inputs['destlat'] = destlat;
        inputs['destlong'] = destlong;

        console.log(inputs)
        try {
            console.log("UI reached")
            const response = await axios.post(homeString+"/postTrip", inputs).catch((error) => { alert(error.response.data) })
            alert(response.data)
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <div className="App">
            <div className="login-form">
                <form>
                    <h1>Post Trips</h1>
                    <div className="content">
                        <div className="input-field">
                            <input type="date" placeholder="date" name="tripDate" onChange={handleChange} />
                        </div>
                        <div className="input-field">
                            <input type="time" placeholder="time" name="tripTime" onChange={handleChange} />
                        </div>
                        <div className="input-field">
                            <PlacesAutocomplete value={address} onChange={handleChange1} onSelect={handleSelect1}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Enter Source',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                        <div className="input-field">
                            <PlacesAutocomplete value={address1} onChange={handleChange2} onSelect={handleSelect2}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Enter Destination',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                        {/* <div className="input-field">
                            <input list="vehicles" placeholder="Vehicle" name="tripVehicle" onChange={handleChange}/>
                            <datalist id="vehicles">
                                {vehicleList.map((car,index)=>(
                                    <option value={car.VehicleId}/>
                                ))}
                            </datalist>
                        </div> */}
                        <div className="input-field">
                            <select name="tripVehicle" onChange={handleChange} className="input-field">
                                {vehicleList.map((car, index) => {
                                    console.log(vehicleList)
                                    return <option value={car.VehicleId}>{car.CarName}</option>
                                })}
                            </select>
                        </div>
                        <div className="action">
                            <button type="button" onClick={submitLogin}>Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}