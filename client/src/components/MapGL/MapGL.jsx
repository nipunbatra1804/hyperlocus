import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import LocationPin from "./LocationPin";
import PinInfo from "./PinInfo";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import EstateInfo from "./EstateInfo";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class MapGL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 1.3521,
        longitude: 103.8198,
        zoom: 10
      },
      popupInfo: null,
      popupTown: null
    };
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };
  _renderMarker = (item, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={item.geometry.coordinates[0]}
        latitude={item.geometry.coordinates[1]}
      >
        <LocationPin
          size={10}
          onClick={() => this.setState({ popupInfo: item })}
          type={item.category}
        />
      </Marker>
    );
  };
  _renderPosition = (longitude, latitude) => {
    return (
      <Marker key={`marker-center`} longitude={longitude} latitude={latitude}>
        <LocationPin size={10} type={"location"} />
      </Marker>
    );
  };

  _renderPopup = () => {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PinInfo properties={popupInfo.properties} type={popupInfo.type} />
        </Popup>
      )
    );
  };
  _displayPopup = popupInfo => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => {
            popupInfo = null;
          }}
        >
          <PinInfo properties={popupInfo.properties} type={popupInfo.type} />
        </Popup>
      )
    );
  };

  _onClickTown = (info, town) => {
    this.setState({ popupTown: { info, town } });
  };

  _renderTownPopup = () => {
    const { popupTown } = this.state;
    if (!popupTown) {
      return;
    }
    const { town, info } = popupTown;
    return (
      popupTown && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={info.coordinate[0]}
          latitude={info.coordinate[1]}
          closeOnClick={true}
          onClose={() => this.setState({ popupTown: null })}
        >
          <EstateInfo name={town.name} address={"Singapore"} />
        </Popup>
      )
    );
  };

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

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.position.longitude === prevProps.position.longitude &&
      this.props.position.latitude === prevProps.position.latitude
    ) {
      return;
    }
    const { position } = this.props;
    const viewport = { ...this.state.viewport };
    viewport.longitude = position.longitude;
    viewport.latitude = position.latitude;
    viewport.zoom = 14;
    this.setState({ viewport: viewport });
  }

  render() {
    const { sites, popUp, position, towns } = this.props;
    const { longitude, latitude } = position;
    //const { longitude, latitude } = this.state.viewport;
    const dropPing = sites.length > 0 ? true : false;
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        height={600}
        width={550}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API_KEY}`}
      >
        {this._renderNeighborhood(towns, viewport)}
        {this._renderPosition(longitude, latitude)}
        {dropPing && sites.map(this._renderMarker)}
        {this._renderPopup()}
        {this._renderTownPopup()}
        {/* {popUp && this._displayPopup(popUp)} */}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </ReactMapGL>
    );
  }
}
//{this._renderPosition(longitude, latitude)}
