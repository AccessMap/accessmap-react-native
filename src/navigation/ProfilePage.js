//
//  Login.js describes the appearance of the profile tab's contents where
//  a user may login or view their existing profile.
//
import React from "react";
import { View, Text, Image } from "react-native";
import { useKeycloak } from "@react-keycloak/native";
import BottomCardButton from "../components/atoms/Button/BottomCardButton";
import { h1 } from "../styles/fonts";
import { ScrollView } from "react-native-gesture-handler";
import { greyLight } from "../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { signIn, signOut } from "../reducers/signin";
import { deleteProfile, uploadProfile, loadProfile } from "../utils/authentication";

export default function ProfilePage() {
  const { keycloak } = useKeycloak();
  // keycloak?.onTokenExpired = () => {
  //   console.log('token expired', keycloak?.token);
  //   keycloak?.updateToken(30).success(() => {
  //       console.log('successfully get a new token', keycloak.token);
  //   }).error((e) => console.log(e));
  // }

  let signedIn = useSelector((state: RootState) => state.signIn.isLoggedIn);
  let access_token = useSelector((state: RootState) => state.signIn.token);
  let username = useSelector((state: RootState) => state.signIn.username);

  let customUphill = useSelector(
    (state: RootState) => state.mobility.customUphill
  );
  let customDownhill = useSelector(
    (state: RootState) => state.mobility.customDownhill
  );
  let avoidRaisedCurbs = useSelector(
    (state: RootState) => state.mobility.avoidRaisedCurbs
  );

  const dispatch = useDispatch();
  console.log("USER SIGNED IN ? " + signedIn + ", Username = " + username);

  const loginOut = () => {
    if (signedIn) {
      keycloak.logout()
      .then(() => dispatch(signOut()) )
    } else {
      keycloak.login()
      .then(() => dispatch(signIn(keycloak)) )
    }
  }

  function showLoginLogoutButton() {
    return (
      <BottomCardButton
        title={signedIn ? "Logout" : "Login"}
        pressFunction={() => loginOut()}
      />
    );
  }

  function showSaveProfilesButton() {
    return (
      <BottomCardButton
        title={"Save Mobility Profile"}
        pressFunction={() => uploadProfile(access_token)}
      />
    );
  }

  function showDeleteProfilesButton() {
    return (
      <BottomCardButton
        title={"Delete Mobility Profile"}
        pressFunction={() => deleteProfile(access_token)}
      />
    );
  }

  function showLoadSavedProfile() {
    return (
      <BottomCardButton
        title={"Load Saved Profile"}
        pressFunction={() => loadProfile(access_token)}
      />
    );
  }

  if (signedIn) {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: greyLight, height: 120 }}></View>
        <View style={{ padding: 20, height: "100%", marginTop: -65 }}>
          <Image
            accessibilityLabel="Accessmap logo"
            style={{
              width: 90,
              height: 90,
              alignSelf: "center",
              borderRadius: 45,
              marginBottom: 25,
              marginTop: 0,
            }}
            source={require("../../res/images/dog.png")}
            resizeMode="cover"
            resizeMethod="scale"
          />
          <Text style={h1}>{username}</Text>
          {/* <View>
            <Text style={[p, {}]}>Use Frequency</Text>
            <Text>Custom: , Wheelchair: , Cane: </Text>
          </View> */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            {showSaveProfilesButton()}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            {showLoadSavedProfile()}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            {showDeleteProfilesButton()}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            {showLoginLogoutButton()}
          </View>

        </View>
      </ScrollView>
    );
  }

  // User is not signed in
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: greyLight, height: 120 }}></View>
      <View style={{ padding: 20, height: "100%", marginTop: -65 }}>
        <Image
          accessibilityLabel="Accessmap logo"
          style={{
            width: 90,
            height: 90,
            alignSelf: "center",
            borderRadius: 45,
            marginBottom: 25,
            marginTop: 0,
          }}
          source={require("../../res/images/placeholder-profile.png")}
          resizeMode="cover"
          resizeMethod="scale"
        />
        <Text style={h1}>
          "Welcome to Accessmap! Please Login or Register below to Save Your
          Mobility Profile."
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          {showLoginLogoutButton()}
        </View>
      </View>
    </ScrollView>
  );
};
