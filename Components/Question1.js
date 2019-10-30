import React, { Component } from "react";
import { Container, Header, Content, Button, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Question1 extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Row>
          <Grid>
            <Col style={{ backgroundColor: "#BC0000", height: 50 }}></Col>
            <Col style={{ backgroundColor: "#838BEB", height: 200 }}></Col>
          </Grid>
        </Row>
        <Grid>
          <Content>
            <Col style={{ backgroundColor: "#635DB7", height: 200 }}></Col>
            <Col style={{ backgroundColor: "#00CE9F", height: 200 }}></Col>
            {/* <Button large>
              <Text>Start</Text>
            </Button> */}
          </Content>
        </Grid>
      </Container>
    );
  }
}
