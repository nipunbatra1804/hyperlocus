import React, { Component } from "react";
import ReactMapGL, { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import WebMercatorViewport from "viewport-mercator-project";
import bbox from "@turf/bbox";
import { getTowns } from "../../services/serviceTowns";
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class EstatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 1.3521,
        longitude: 103.8198,
        zoom: 10
      },
      popupInfo: null,
      towns: null
    };
  }

  _getLayer = town => {
    return new GeoJsonLayer({
      id: `geojson-layer-${town.name}`,
      data: {
        type: "Feature",
        geometry: {
          type: town.location.type,
          coordinates: town.location.coordinates
        }
      },
      lineWidthScale: 4,
      opacity: 0.4,
      filled: true,
      stroked: true,
      lineWidth: 2,
      lineColor: [255, 0, 0],
      lineWidthMinPixels: 2,
      wireframe: true,
      getLineColor: f => [255, 0, 0],
      getFillColor: f => [255, 0, 0, 0],
      pickable: true,
      onClick: info => {
        this._onClickTown(info, town);
      }
    });
  };
  _renderNeighborhood = (towns, viewport) => {
    return (
      <DeckGL {...viewport} layers={towns.map(town => this._getLayer(town))} />
    );
  };

  async componentDidMount() {
    const townId = this.props.match.params.town;
    const estate = await getTowns(townId);
    console.log(estate[0].location);
    if (estate) {
      const [minLng, minLat, maxLng, maxLat] = bbox(estate[0].location);
      console.log(estate.location);
      const viewport = new WebMercatorViewport(this.state.viewport);
      const { longitude, latitude, zoom } = viewport.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]],
        { padding: 40 }
      );
      this.setState({
        viewport: {
          ...this.state.viewport,
          longitude,
          latitude,
          zoom
        },
        towns: estate
      });
    }
  }

  render() {
    const { viewport, towns } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        height={600}
        width={550}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API_KEY}`}
      >
        {towns && this._renderNeighborhood(towns, viewport)}
      </ReactMapGL>
    );
  }
}
