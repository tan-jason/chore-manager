import { createStackNavigator } from "@react-navigation/stack";
import ViewHome from "../appflow/ViewHome";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

const Footer = createStackNavigator();

const NavigationFooter = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Footer.Navigator>
        <Footer.Screen name="Home" component={ViewHome} />
      </Footer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationFooter;
