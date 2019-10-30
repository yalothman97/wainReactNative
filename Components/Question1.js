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
              <Button style={styles.btnStyle}>
                <Text style={styles.btnText}>Breakfast</Text>
              </Button>
              <Button style={styles.btnStyle}>
                <Text style={styles.btnText}>Lunch</Text>
              </Button>
            </Col>
            <Col>
              <Button style={styles.btnStyle}>
                <Text style={styles.btnText}>Dinner</Text>
              </Button>
              <Button style={styles.btnStyle}>
                <Text style={styles.btnText}>Dessert</Text>
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
  },
  btnStyle: {
    backgroundColor: "#F2F2F2",
    height: 170,
    width: 170,
    alignSelf: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 25
  },
  btnText: {
    fontFamily: "Futura",
    color: "#7B7B7B",
    fontSize: 20,
    fontWeight: "700"
  }
});
