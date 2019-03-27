//import { readFile } from "fs";
// const fs = require("fs");
// const superMarketsPath = "../data/supermarkets/supermarkets-geojson.geojson";
const tabletojson = require("tabletojson");

export function parseProperties(properties) {
  const parseData = tabletojson.convert(properties.Description, {
    useFirstRowForHeadings: true
  });
  const title = parseData[0].find(elem =>
    elem.Attributes.includes("LIC_NAME")
  )[1];
  const BLK = parseData[0].find(elem =>
    elem.Attributes.includes("BLK_HOUSE")
  )[1];
  const STR = parseData[0].find(elem =>
    elem.Attributes.includes("STR_NAME")
  )[1];
  const postalCode = parseData[0].find(elem =>
    elem.Attributes.includes("POSTCODE")
  )[1];

  return {
      name: title,
      address: `${BLK},${STR}`,
      postCode: `${postalCode}`
  };
}

export function getSuperMarkets() {
  return fetch("/supermarkets-geojson.geojson")
    .then(res => res.json())
    .then(data => data["features"])
    .then(data => {
      data.map(element => (element["type"] = "supermarket"));
      data.map(element => (element.properties = parseProperties(element.properties)));
      return data;
    })
    .catch(err => {
      console.error("Unable to fetch data.", err);
    });
}
