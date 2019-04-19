import hyperlocusApi from "./hyperlocusApi";

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export async function getOutlets() {
  try {
    const outlets = await hyperlocusApi.get("/places");
    console.log(outlets.data);
    let data = outlets.data.filter(elem => !!elem.location);
    data = shuffle(data).slice(1, 400);
    data = data.map(elem => {
      elem.properties = {};
      elem.properties.name = elem.name;
      elem.properties.address = elem.address;
      elem.properties.postCode = elem.postalCode;
      elem.geometry = {};
      elem.geometry.coordinates = [];
      elem.geometry.coordinates[0] = elem.location.coordinates[0];
      elem.geometry.coordinates[1] = elem.location.coordinates[1];
      return elem;
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createOutlet(outlet, id) {
  try {
    const place = {};
    const re = new RegExp("^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$");
    place.category = outlet.category;
    place.name = outlet.name;
    place.type = outlet.type;
    place.address = outlet.address;
    place.postalCode = outlet.postalCode;
    if (re.test(outlet.openingTime)) place.openingTime = outlet.openingTime;
    if (re.test(outlet.closingTime)) place.closingTime = outlet.closingTime;
    place.tags = outlet.tags.split(/[\s,#]+/);
    if (!id) {
      place.location = null;
      await hyperlocusApi.post("/places", { place: place });
    } else {
      await hyperlocusApi.patch(`/places/${id}`, place);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getOutlet(id) {
  console.log(id);
  try {
    const foodOutlets = await hyperlocusApi.get(`/places/${id}`);
    console.log(foodOutlets.data);
    let data = [foodOutlets.data];
    data = data.filter(elem => !!elem.location);
    data = data.map(elem => {
      elem.type = "foodOutlet";
      elem.properties = {};
      elem.properties.name = elem.name;
      elem.properties.address = elem.address;
      elem.properties.postCode = elem.postalCode;
      elem.geometry = {};
      elem.geometry.coordinates = [];
      elem.geometry.coordinates[0] = elem.location.coordinates[0];
      elem.geometry.coordinates[1] = elem.location.coordinates[1];
      return elem;
    });

    return data[0];
  } catch (err) {
    console.log(err.message);
  }
}

export async function getOutletByTown(id) {
  console.log(id);
  try {
    const outlets = await hyperlocusApi.get(`/estateinfo/${id}`);
    let data = outlets.data.filter(elem => !!elem.location);
    data = data.map(elem => {
      elem.properties = {};
      elem.properties.name = elem.name;
      elem.properties.address = elem.address;
      elem.properties.postCode = elem.postalCode;
      elem.geometry = {};
      elem.geometry.coordinates = [];
      elem.geometry.coordinates[0] = elem.location.coordinates[0];
      elem.geometry.coordinates[1] = elem.location.coordinates[1];
      return elem;
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

/*

try {
    const outlets = await hyperlocusApi.get("/places");
    console.log(outlets.data);
    let data = outlets.data.filter(elem => !!elem.location);
    data = shuffle(data).slice(1, 400);
    data = data.map(elem => {
      elem.properties = {};
      elem.properties.name = elem.name;
      elem.properties.address = elem.address;
      elem.properties.postCode = elem.postalCode;
      elem.geometry = {};
      elem.geometry.coordinates = [];
      elem.geometry.coordinates[0] = elem.location.coordinates[0];
      elem.geometry.coordinates[1] = elem.location.coordinates[1];
      return elem;
    });
    return data;
  } catch (err) {
    console.log(err);
  }


*/
