import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import MapGL from "../MapGL/MapGL";
import FilterMenu from "../FilterMenu/FilterMenu";
import { getOutlets } from "../../services/serviceOutlets";

import PinTable from "../PinTable/PinTable";
import geolib from "geolib";
import { getTowns } from "../../services/serviceTowns";

const sortOptions = [
  { name: "Distance", value: "distance" },
  { name: "Name", value: "name" },
  { name: "Postal Code", value: "postalcode" }
];

export default class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      towns: [],
      options: [
        { name: "All", value: "all" },
        { name: "Clinics", value: "clinics" },
        { name: "Hawker Center", value: "hawkerCentre" },
        { name: "Supermarket", value: "supermarket" }
      ],
      selectedOption: null,
      sortingOption: { name: "distance", value: "distance" },
      popInfo: null,
      currentPosition: {
        latitude: 1.3521,
        longitude: 103.8198
      },
      selectedSortOption: { name: "Distance", value: "distance" }
    };
  }

  async componentDidMount() {
    try {
      if (this.state.sites.length > 0) {
        return;
      }
      if (!(this.props.match.params.long && this.props.match.params.lat)) {
        this.geolocation();
      } else {
        this.updateViewsAndStates();
      }
      const { currentPosition } = this.state;
      const foodOutlets = await getOutlets();
      const neighbourhoods = await getTowns();
      console.log(neighbourhoods);
      this.setState({ sites: [...foodOutlets], towns: [...neighbourhoods] });
    } catch (error) {
      console.log(error);
    }
  }
  handleOptionSelect = option => {
    const finalOption = option === null ? this.state.options[0] : option;
    this.setState({
      selectedOption: finalOption
    });
  };
  handleSortSelect = option => {
    this.setState({ selectedSortOption: option });
  };

  handlePinTableClick = element => {
    this.setState({ popInfo: element });
  };
  handleTableLeave = () => {
    this.setState({ popInfo: null });
  };

  getDistance = pin => {
    const currentPosition = { ...this.state.currentPosition };
    const pinLocation = {
      longitude: pin.geometry.coordinates[0],
      latitude: pin.geometry.coordinates[1]
    };
    return geolib.getDistance(pinLocation, currentPosition);
  };

  compareDistance = (A, B) => {
    return this.getDistance(A) - this.getDistance(B);
  };

  comparePostalCode = (A, B) => {
    return A.properties.postCode - B.properties.postCode;
  };
  compareName = (A, B) => {
    return A.properties.name.localeCompare(B.properties.name);
  };

  getCompareFunction = () => {
    const { selectedSortOption } = this.state;
    switch (selectedSortOption.value) {
      case "distance":
        return this.compareDistance;
      case "postalcode":
        return this.comparePostalCode;
      case "name":
        return this.compareName;
      default:
        return this.compareDistance;
    }
  };
  filterAndSortRestaurantList = () => {
    const { sites, selectedOption } = this.state;
    let filteredByOption =
      selectedOption && selectedOption.value !== "all"
        ? sites.filter(site => selectedOption.value.includes(site.type))
        : sites;

    filteredByOption = filteredByOption.filter(
      site => this.getDistance(site) < 50000
    );
    const compareFunc = this.getCompareFunction();
    filteredByOption.length > 2 && filteredByOption.sort(compareFunc);
    return filteredByOption;
  };
  geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updatePosition);
    }
  };
  updatePosition = position => {
    const currentPosition = { ...this.state.currentPosition };
    currentPosition.longitude = position.coords.longitude;
    currentPosition.latitude = position.coords.latitude;
    this.setState({ currentPosition: currentPosition });
  };

  updateViewsAndStates = () => {
    if (!(this.props.match.params.long && this.props.match.params.lat)) {
      return;
    }
    const { long, lat, search } = this.props.match.params;
    const currentPosition = { ...this.state.currentPosition };
    const { options } = this.state;
    const selectedOption = options.find(elem => elem.value === search);
    currentPosition.longitude = parseFloat(long);
    currentPosition.latitude = parseFloat(lat);

    this.setState({
      currentPosition: currentPosition,
      selectedOption: selectedOption
    });
  };

  render() {
    let { options, popInfo, currentPosition, towns } = this.state;
    const filteredSites = this.filterAndSortRestaurantList();
    return (
      <div data-testid="explore-page">
        <Container>
          <Row>
            <Col md="12" lg="6">
              {" "}
              <MapGL
                sites={filteredSites}
                towns={towns}
                popUp={popInfo}
                position={currentPosition}
              />
            </Col>
            <Col md="12" lg="6">
              <FilterMenu
                options={options}
                selected={this.state.selectedOption}
                handleClick={this.handleOptionSelect}
                sortOptions={sortOptions}
                handleSortSelect={this.handleSortSelect}
              />
              <PinTable
                pins={filteredSites}
                handleClick={this.handlePinTableClick}
                handleMouseLeave={this.handleTableLeave}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
