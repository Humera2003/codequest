import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../pages/Userprofile/Userprofile.css'

const Maps = () => {
  useEffect(() => {
    // Function to load the Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCBI1MV7aauOB_F_5f2UL0hwBtIBYq7SOg&callback=initMap&v=weekly`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      // Debugging: Check if script is loaded
      script.onload = () => {
        console.log("Google Maps script loaded successfully");
      };

      script.onerror = () => {
        console.error("Error loading Google Maps script");
      };
    };

    // Debugging: Check if window object and google maps are available
    window.initMap = () => {
      if (!window.google) {
        console.error("Google Maps object not found");
        return;
      }

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
      });

      const infoWindow = new window.google.maps.InfoWindow();
      const locationButton = document.createElement("button");

      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
    };

    const handleLocationError = (browserHasGeolocation, infoWindow, pos, map) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '650px', width: '100%' }}></div><br/>
      <button style={{ backgroundColor:"#ef8236"}} ><Link to="/" className='go-to-home btn' style={{textDecoration:"none", fontSize:"20px",  color:"black", borderColor:"white"}}>Go to Home</Link></button>
    </div>
  );
};

export default Maps;
