const dev = "localhost:3000";
const prod = "hyperlocus-server.herokuapp.com";

const hosts = {
  [dev]: "localhost:4000/api",
  [prod]: "hyperlocus-server.herokuapp.com/api"
};

const isValidHost = host => Object.keys(hosts).indexOf(host) !== -1;

export { hosts, isValidHost };

//http://www.hyperloc.us:4000/api/places
