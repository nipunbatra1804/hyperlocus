import React, { useState } from "react";
import { getAddress } from "../../services/serviceGMapsGeocode";
import "./HomePage.css";

function HomePage(props) {
  const options = [
    { name: "Live", value: "all" },
    { name: "Health", value: "clinics" },
    { name: "Eat", value: "hawkerCentre" },
    { name: "Shop", value: "supermarket" }
  ];
  const [location, setLocation] = useState("18 Cross Street");

  const handleLocationInput = event => {
    setLocation(event.target.value);
  };

  const handleClick = option => {
    getAddress(location).then(data => {
      const long = data.location.lng;
      const lat = data.location.lat;
      props.history.push(`/explore/${long}/${lat}/${option.value}`);
    });
  };

  return (
    <div data-testid="home-page">
      <div style={{ marginBottom: "20px" }}>
        <div className="bg d-flex justify-content-center">
          <div
            className="input-group justify-content-center align-items-center transparent-input"
            style={{ color: "white", width: "800px" }}
          >
            <input
              type="text"
              className="form-control "
              placeholder="Where to ??"
              aria-label=""
              aria-describedby="basic-addon2"
              style={{ maxWidth: "50%", opacity: "20%" }}
              onChange={handleLocationInput}
              value={location}
            />
            <div className="input-group-append">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="btn btn-outline-light"
                  type="button"
                  onClick={() => handleClick(option)}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="media mt-10" style={{ width: "45%", margin: "5%" }}>
          <img
            src="http://www.gstatic.com/tv/thumb/persons/1474/1474_v9_ba.jpg"
            className="align-self-start mr-3"
            alt="..."
            style={{ width: "128px", height: "128px" }}
          />

          <div className="media-body">
            <h5 className="mt-0">Angeline</h5>
            <p>
              Finding a Home was never easier. Changed my life when I moved to
              Singapore. Cant believe Google maps has not been able to offer me
              this.
            </p>
          </div>
        </div>
        <div className="media mt-10" style={{ width: "45%", margin: "5%" }}>
          <img
            src="http://4.bp.blogspot.com/_9DRIQ9xf9U4/TC0CgvEiqaI/AAAAAAAAAqw/_XymQC2rCgM/s400/download-besplatne-slike-pozadine-za-mobitele-brad-pitt.jpg"
            className="align-self-start mr-3"
            alt="..."
            style={{ width: "128px", height: "128px" }}
          />
          <div className="media-body">
            <h5 className="mt-0">Jesstern</h5>
            <p>
              Dont know how my maids could have handled my 6 kids without this
              app. I love living here now
            </p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="media mt-10"
          style={{ width: "45%", margin: "5%", justifyContent: "center" }}
        >
          <img
            src="https://www.thenational.ae/image/policy:1.27002:1498914221/image/jpeg.jpg?f=1x1&w=128&$p$f$w=cf769b6"
            className="align-self-start mr-3"
            alt="..."
            style={{ width: "128px", height: "128px" }}
          />

          <div className="media-body">
            <h5 className="mt-0">Gordon</h5>
            <p>This is Awesome!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
