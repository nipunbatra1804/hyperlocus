const tabletojson = require("tabletojson");

export function parseProperties(properties) {
  const parseData = tabletojson.convert(properties.Description, {
    useFirstRowForHeadings: true
  });
  const title = parseData[0].find(elem =>
    elem.Attributes.includes("HCI_NAME")
  )[1];
  const BLK = parseData[0].find(elem =>
    elem.Attributes.includes("BLK_HSE_NO")
  )[1];
  const STR = parseData[0].find(elem =>
    elem.Attributes.includes("STREET_NAME")
  )[1];
  const postalCode = parseData[0].find(elem =>
    elem.Attributes.includes("POSTAL_CD")
  )[1];

  return {
    name: title,
    address: `${BLK},${STR}`,
    postCode: `${postalCode}`
  };
}

export function getClinics() {
  return fetch("/chas-clinics-geojson.geojson")
    .then(res => res.json())
    .then(data => data["features"])
    .then(data => {
      data.map(element => (element.type = "clinic"));
      data.map(
        element => (element.properties = parseProperties(element.properties))
      );

      return data;
    })
    .catch(err => {
      console.error("Unable to fetch data.", err);
    });
}
