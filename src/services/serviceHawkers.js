const tabletojson = require("tabletojson");

export function parseProperties(properties) {
  const parseData = tabletojson.convert(properties.Description, {
    useFirstRowForHeadings: true
  });
  const title = parseData[0].find(elem => elem.Attributes.includes("NAME"))[1];
  const BLK = parseData[0].find(elem =>
    elem.Attributes.includes("ADDRESSBLOCKHOUSENUMBER")
  )[1];
  const STR = parseData[0].find(elem =>
    elem.Attributes.includes("ADDRESSSTREETNAME")
  )[1];
  const postalCode = parseData[0].find(elem =>
    elem.Attributes.includes("ADDRESSPOSTALCODE")
  )[1];
  return {
    name: title,
    address: `${BLK},${STR}`,
    postCode: `${postalCode}`
  };
}

export function getHawkerCenters() {
  return fetch("/hawker-centres-geojson.geojson")
    .then(res => res.json())
    .then(data => data["features"])
    .then(data => {
      data.map(element => (element.type = "hawkerCentre"));
      data.map(
        element => (element.properties = parseProperties(element.properties))
      );
      return data;
    })
    .catch(err => {
      console.error("Unable to fetch data.", err);
    });
}
