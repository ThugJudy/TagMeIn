import React, { useState, useEffect, useLoadScript, useContext } from "react";
import Axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { AuthContext } from "../Context/authContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { homeString } from "../Context/constants";

export const RequestRide = () => {

  const [srclat, setSourceLat] = useState('')
  const [srclong, setSouceLong] = useState('')
  const [destlat, setDestinationLat] = useState('')
  const [destlong, setDestinationLong] = useState('')
  const [rides, setRides] = useState([]);
  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [requestDate, setRequestDate] = useState('')
  const [requestTime, setRequestTime] = useState('')

  // handling trip request
  const { currentUserId } = useContext(AuthContext)
  const [requestSeats, setRequestSeats] = useState('')
  const [requestTripID, setRequestTripID] = useState('')
  const navigate = useNavigate();

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = value => {
    geocodeByAddress(value)
      .then(results => getLatLng(results[0]))
      .then(latLng => handleSrcLatLng(latLng))
      .catch(error => console.error('Error', error));
    setAddress(value)
  };

  const handleChange1 = address => {
    setAddress1(address);
  };

  const handleSelect1 = value => {
    geocodeByAddress(value)
      .then(results => getLatLng(results[0]))
      .then(latLng => handleDestLatLng(latLng))
      .catch(error => console.error('Error', error));
    setAddress1(value);
  };

  const handleSrcLatLng = latLng => {
    console.log(latLng['lat'])
    setSourceLat(latLng['lat']);
    setSouceLong(latLng['lng']);
  }

  const handleDestLatLng = latLng => {
    setDestinationLat(latLng['lat']);
    setDestinationLong(latLng['lng'])
  }

  const submitSearch = async () => {
    const response = await Axios.get(homeString+"/requestRides", { params: { sourceLat: srclat, sourceLong: srclong, destLat: destlat, destlong: destlong, requestTime:requestTime, requestDate:requestDate } }).then(response => { return response })
    console.log(response.data[0])
    setRides(response.data[0])
  }

  const bookRide = async (e) => {
    //const selectedIndex = e.target.options.selectedIndex;
    const TID = e.target.id
    const id = "select" + TID
    const el = document.getElementById(id)
    const Tseat = el.value
    const riderID = currentUserId
    console.log(TID, Tseat, riderID)
    const response = await axios.post(homeString+"/booking", {TripId:TID, RiderID:riderID, seats:Tseat}).then(()=>navigate("/home")).catch((error)=>(alert(error.reposnse.data)))
  }

  return (
    <div className="Rides">
      <div className="login-form">
        <form>
          <h1>Request Rides</h1>
          <div className="content">
            <div className="input-field">
              <input type="date" placeholder="date" name="tripDate" onChange={(e) => {
                setRequestDate(e.target.value)
              }} />
            </div>
            <div className="input-field">
              <input type="time" placeholder="time" name="tripTime" onChange={(e) => {
                setRequestTime(e.target.value)
              }} />
            </div>

            <div className="input-field">
              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
              >
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
              <PlacesAutocomplete
                value={address1}
                onChange={handleChange1}
                onSelect={handleSelect1}
              >
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
            <div className="action">
              <button type="button" onClick={submitSearch}>Request</button>
            </div>
          </div>
        </form>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Source</th>
            <th>Source Dist</th>
            <th>Destination</th>
            <th>Destination Dist</th>
            <th>Driver Name</th>
            <th>Car Name</th>
            <th>CarType</th>
            <th>Seats</th>
            <th>Rating</th>
            <th>Total Dist</th>
            <th>Book Ride</th>
          </tr>
        </thead>

        <tbody>
          {rides.map((ride, index) => (
            <tr>
              <td>{ride.Source}</td>
              <td>{ride.DistanceFromSource}</td>
              <td>{ride.Destination}</td>
              <td>{ride.DistanceFromDestination}</td>
              <td>{ride.Name}</td>
              <td>{ride.CarName}</td>
              <td>{ride.CarType}</td>
              <td>
                <select name="tripVehicle" id= {"select" + ride.TripID} onChange={(e) => {
                  setRequestSeats(e.target.value)
                  setRequestTripID(ride.TripID)
                }}>
                  {[...Array(ride.Seats).keys()].map((index) => {
                    return <option value={index + 1}>{index + 1}</option>
                  })}
                </select>
              </td>
              <td>{ride.AvgRating}</td>
              <td>{ride.TotalDist}</td>
              <td>
                <button type="button" id={ride.TripID} onClick={bookRide}>Book</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}