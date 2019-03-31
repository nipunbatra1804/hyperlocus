function getApiRequest(searchString) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${searchString},SG&key=${
    process.env.REACT_APP_GMAPS_API_KEY
  }`;
}

export function getAddress(addressStr) {
  const searchString = addressStr.replace(/ /i, "+");
  return fetch(getApiRequest(searchString))
    .then(response => {
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      return response.json();
    })
    .then(data => {
      return data.results[0].geometry;
    })
    .catch(error => console.log(error));
}
