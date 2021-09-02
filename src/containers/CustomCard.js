// A Custom Card built off of React Native's native Modal
import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
// cardVisible [boolean: visibility state of the modal
// content: [View] content to be shown in middle of card
export default function CustomCard(props) {
  return (
    <Modal transparent={true} 
      visible={props.cardVisible} 
      animationType="slide"
      accessibilityLabel={"Popup card displayed at bottom of screen."}
    >
      <TouchableWithoutFeedback 
        onPress={props.dismissCard}
        accessibilityLabel={"Region outside popup card."}
      >
        <View
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 330,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 15,
            paddingLeft: 20,
            paddingRight: 5,
            paddingBottom: 10,
          }}
        >
          {props.content}
        </View>
      </View>
    </Modal>
  );
}
