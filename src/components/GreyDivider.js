import React from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Colors } from "../styles";

export default function GreyDivider() {
    return <Divider orientation="horizontal" color={Colors.grey} style={{marginVertical: 20}}/>;
}