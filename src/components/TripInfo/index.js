// Shows trip information with elevation changes graph
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import {
  AreaChart,
  LineChart,
  Grid,
  XAxis,
  YAxis,
} from "react-native-svg-charts";
import { useTranslation } from "react-i18next";
import { metersToFeet, metersToMiles } from "../../utils/metric-imperial-conversion";

import Header from "../Header";

const InfoText = (props) => {
  return (
    <View accessible={true} style={{ marginBottom: 20 }}>
      <Text>{props.info}</Text>
      <Text style={{ color: "black" }}>{props.value}</Text>
    </View>
  );
};

const TripInfo = (props) => {
  const { t, i18n } = useTranslation();
  const route = props.route.routes[0];
  const data = route.legs[0];
  const nRoutes = [...Array(data.length + 1).keys()];

  var routeDistance = props.usingMetricSystem ? 
    route.distance.toFixed(1) : metersToMiles(route.distance); // total distance in miles
  var units = props.usingMetricSystem ? t("METERS_TEXT") : t("MILES_TEXT");

  const dist = nRoutes.map((i) => {
    if (i == 0) {
      return 0;
    }
    var metersDistance = data[i - 1].properties.length;
    return (props.usingMetricSystem ? metersDistance : metersToFeet(metersDistance));
  });

  var maxUphill = -200;
  var maxDownhill = 200;
  const elevChange = nRoutes.map((i) => {
    if (i == 0) {
      return 0;
    }
    if (data[i - 1].properties.hasOwnProperty("incline")) {
      maxUphill = Math.max(data[i - 1].properties.incline, maxUphill);
      maxDownhill = Math.min(data[i - 1].properties.incline, maxDownhill);
      var metersHigh =
        data[i - 1].properties.incline * data[i - 1].properties.length;
        return (props.usingMetricSystem ? metersHigh : metersToFeet(metersHigh));
    }
    return 0;
  });
  const xInc = [...Array(10).keys()];
  const xAxis = xInc.map((i) => (i * dist[dist.length - 1]) / 9);
  for (var i = 1; i < dist.length; i++) {
    dist[i] += dist[i - 1];
    elevChange[i] += elevChange[i - 1];
  }
  return (
    <View style={{ height: "50%", backgroundColor: "white" }}>
      <View style={{marginLeft:10}}>
        <Header title={t("ROUTE_INFO_TEXT")} close={props.close}/>
      </View>
      <ScrollView style={{ paddingHorizontal: 10}}>
        <Text>Experienced elevation gain</Text>
        <View
          style={{
            width: "90%",
            height: 200,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <View
            style={{
              left: -50,
              position: "absolute",
              transform: [{ rotate: "270deg" }],
            }}
          >
            <Text>
              {t("GRAPH_Y_AXIS")}
              {"("}
              {props.usingMetricSystem ? t("METERS_TEXT") : t("FEET_TEXT")}
              {")"}
            </Text>
          </View>
          <YAxis
            style={{ marginLeft: 10 }}
            data={elevChange}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
          />
          <AreaChart
            style={{ flex: 1, marginLeft: 10}}
            data={elevChange}
            yAccessor={({ item }) => item}
            xAccessor={({ index }) => dist[index]}
            svg={{
              fill: "rgb(240, 150, 20, 0.5)",
              stroke: "black",
              strokeWidth: 3,
            }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </AreaChart>
        </View>
        <XAxis
          style={{ marginLeft: 45, width: "80%" }}
          data={xAxis}
          formatLabel={(index) => `${xAxis[index].toFixed(1)}`}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: "black" }}
        />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text>
            {t("GRAPH_X_AXIS")}
            {"("}
            {props.usingMetricSystem ? t("METERS_TEXT") : t("FEET_TEXT")}
            {")"}
          </Text>
        </View>
        <InfoText
          value={`${routeDistance} ${units}`}
          info={t("TOTAL_DISTANCE_TEXT")}
        />
        <InfoText
          value={`${(route.duration / 60).toFixed(1)} minutes`}
          info={t("ESTIMATED_TIME_TEXT")}
        />
        <InfoText
          value={`${Math.round(100 * maxUphill)} %`}
          info={t("STEEPEST_UPHILL_INCLINE_TEXT")}
        />
        <InfoText
          value={`${Math.round(100 * maxDownhill)} %`}
          info={t("STEEPEST_DOWNHILL_INCLINE_TEXT")}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    usingMetricSystem: state.usingMetricSystem,
  };
};

export default connect(mapStateToProps)(TripInfo);
