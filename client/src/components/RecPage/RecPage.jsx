import React, { Component } from "react";
import InsightForm from "./InsightForm";
//import { Container } from "semantic-ui-react";
import { Container, Col, Row } from "reactstrap";
import { getRecommendation } from "../../services/serviceRecommend";
import RecTable from "./RecTable";
import { getAddress } from "../../services/serviceGMapsGeocode";

export default class RecPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      recommendations: null
    };
  }
  sendReco = async (formData, about, address, tweets) => {
    const location = { coordinates: [1.297323, 103.802705] };
    if (!address && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        location.coordinates[0] = pos.coords.latitude;
        location.coordinates[1] = pos.coords.latitude;
      });
    } else {
      try {
        location.coordinates = await getAddress(address).then(data => {
          const long = data.location.lng;
          const lat = data.location.lat;
          return [lat, long];
        });
      } catch (err) {
        console.log(err.message);
      }
    }

    const budget = formData.budget.value;
    const preferences = {};
    for (const key of Object.keys(formData)) {
      if (key !== "budget" && formData[key]) {
        preferences[key] = formData[key].value;
      }
    }
    console.log({ tweets });
    getRecommendation({
      placesOfInterest: [location],
      preferences: preferences,
      budget: budget,
      twitterPersonality: tweets,
      about,
    }).then(data => {
      console.log(data.recommendations);
      this.setState({
        recommendations: data.recommendations,
        formLoading: false
      });
    });
    this.setState({ formLoading: true });
  };

  render() {
    const { formLoading, recommendations } = this.state;
    console.log(recommendations);
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col sm="12" md={{ size: 8 }}>
            {recommendations == null ? (
              <InsightForm
                sendRecommendation={this.sendReco}
                formLoading={formLoading}
              />
            ) : (
              <RecTable towns={recommendations} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
