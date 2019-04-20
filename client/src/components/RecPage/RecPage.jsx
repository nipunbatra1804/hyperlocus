import React, { Component } from "react";
import InsightForm from "./InsightForm";
//import { Container } from "semantic-ui-react";
import { Container, Col, Row } from "reactstrap";
import { getRecommendation } from "../../services/serviceRecommend";
import RecTable from "./RecTable";

export default class RecPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      recommendations: null
    };
  }
  sendReco = (formData, about) => {
    const location = { coordinates: [1.297323, 103.802705] };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        location.coordinates[0] = pos.coords.latitude;
        location.coordinates[1] = pos.coords.latitude;
      });
    }
    
    const preferences = formData;
    console.log({ location, preferences });
    getRecommendation({
      placesOfInterest: [location],
      preferences,
      about
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
    return <Container>
        <Row className="justify-content-center mt-3">
          <Col sm="12" md={{ size: 8 }}>
      {(recommendations == null) ? (
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
  }
}
