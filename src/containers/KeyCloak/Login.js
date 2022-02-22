import React, { useEffect } from 'react';
import { View, Text, Image } from "react-native"
import { useKeycloak } from '@react-keycloak/native';
import BottomCardButton from '../../components/BottomCardButton';
import { h1, p } from '../../styles/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { greyLight } from '../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "./reducers";
import { signIn, signOut } from '../../reducers/signin';

export default () => {
  const { keycloak } = useKeycloak();
  let signedIn = useSelector(
    (state: RootState) => state.signIn.isLoggedIn
  );
  const dispatch = useDispatch();
  var token = keycloak?.token;

  useEffect(() => {
    if (!keycloak?.authenticated) {
      dispatch(signOut())
    } else {
      dispatch(signIn())
    }
  }, [keycloak?.authenticated])
  
  console.log("USER SIGNED IN ? " + signedIn + ", Token = " + token)

  function showButton() {
    return (<BottomCardButton
      title={signedIn ? "Logout" : "Login"}
      pressFunction={() => signedIn ?
        keycloak.logout(): keycloak.login()} 
      />);
  }

  return (
    <ScrollView style={{backgroundColor: "white"}}>
      <View style={{backgroundColor: greyLight, height: 120}}>
      </View>
      <View style={{padding: 20, height: "100%", marginTop: -65}}>
        <Image
            accessibilityLabel="Accessmap logo"
            style={{width: 90, height: 90, alignSelf: "center",
              borderRadius: 45, marginBottom: 25, marginTop: 0,
            }}
            source={signedIn ? require("../../../res/images/dog.png") : 
            require("../../../res/images/placeholder-profile.png")}
            resizeMode="cover"
            resizeMethod="scale"
          />
        <Text style={h1}>{signedIn ? "Test User" : 
          "Welcome to Accessmap! Please Login or Register below to Save Your Mobility Profile."}</Text>
        
        { signedIn &&
          <View>
            <Text style={[p, {}]}>Use Frequency</Text>
            <Text>Custom:  Wheelchair:  Cane: </Text>
          </View>
        }
        
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25
          }}
        >
          { showButton() }
        </View>
      </View>
    </ScrollView>
  );
};