import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./src/pages/splash.jsx";
import DashboardScreen from "./src/pages/TelaComecar.jsx";
import Login from "./src/pages/login.jsx";
import TabBar from "./src/pages/TabBar.jsx";
import Cadastro from "./src/pages/cadastro.jsx";
import inserirTratamento from "./src/pages/InserirTratamento.jsx";
import QRCode from "./src/pages/QRCode.jsx";

import { TreatmentProvider } from "./src/components/TreatmentContext.jsx"; // Certifique-se do caminho

const Stack = createStackNavigator();

export default function App() {
  return (
    <TreatmentProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="TabBar" component={TabBar} />
          <Stack.Screen name="inserirTratamento" component={inserirTratamento} />
          <Stack.Screen name="QRCode" component={QRCode} />
        </Stack.Navigator>
      </NavigationContainer>
    </TreatmentProvider>
  );
}
