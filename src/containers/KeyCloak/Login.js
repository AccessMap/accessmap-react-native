import React from 'react';
import { View, Text } from "react-native"
import { useKeycloak } from '@react-keycloak/native';
import BottomCardButton from '../../components/BottomCardButton';
import { p } from '../../styles/fonts';
// import { universalSideMargin } from '../../styles/positioning';
import { ScrollView } from 'react-native-gesture-handler';
import { Views } from '../../styles';

export default () => {
  const { keycloak } = useKeycloak();

  function showButton() {
    return (<BottomCardButton 
      title={!!keycloak.authenticated ? "Logout" : "Login"}
      pressFunction={() => !!keycloak.authenticated ? 
        keycloak.logout(): keycloak.login()} 
      />);
  }

  return (
    <ScrollView style={Views.scrollView}>
      <Text style={p}>{`Authentication: ${keycloak?.authenticated}, Token: ${keycloak?.token}`}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 25
        }}
      >
        { showButton() }
      </View>
    </ScrollView>
  );
};