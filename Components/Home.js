import React, { Component } from "react";
import { Container, Header, Content, View, Button, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";


class Home extends Component {
  render() {
    if (!this.props.loading && !this.props.tagsLoading) {
      // console.log("restaurants", this.props.restaurants);
      // console.log("tags", this.props.tags);
    }
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
                fontWeight: "800",
                color: "#BC0000"
              }}
            >
              Not sure where to eat?
            </Text>
          </Row>
          <Row>
            <Content>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  this.props.navigation.replace("Question1Screen");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    flexDirection: "column",

                    fontWeight: "800",
                    color: "white",
                    fontSize: 50
                  }}
                >
                  Wain?
                </Text>
              </TouchableOpacity>
            </Content>
          </Row>
          <Row />
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
    backgroundColor: "#c92020",
    alignSelf: "center",
    justifyContent: "center"
  }
});
const mapStateToProps = state => ({
  restaurants: state.restaurantsReducer.restaurants,
  loading: state.restaurantsReducer.loading,
  tagsLoading: state.tagsReducer.loading,
  tags: state.tagsReducer.tags
});
export default connect(mapStateToProps)(Home);
