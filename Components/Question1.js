import React, { Component } from "react";
import { Container, Header, Content, View, Button, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet } from "react-native";

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Row
            style={{
              // vertical
              alignItems: "center",
              // horizontal
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Futura",
                fontWeight: "800",
                color: "#BC0000"
              }}
            >
              Meal type?
            </Text>
          </Row>

          <Row>
            <Col>
              <Button style={{ height: 100, weight: 100 }}>
                <Text>Breakfast</Text>
              </Button>
              <Button style={{ height: 100, weight: 100 }}>
                <Text>Lunch</Text>
              </Button>
            </Col>
            <Col>
              <Button style={{ height: 100, weight: 100 }}>
                <Text>Dinner</Text>
              </Button>
              <Button style={{ height: 100, weight: 100 }}>
                <Text>Dessert</Text>
              </Button>
            </Col>
          </Row>

          <Row></Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#BC0000",
    alignSelf: "center",
    justifyContent: "center"
  }
});
