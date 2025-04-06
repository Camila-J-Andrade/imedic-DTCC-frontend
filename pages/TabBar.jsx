import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importação das telas
import HomeScreen from './home1';
import SettingsScreen from './configuracaoScreen';
import AlarmScreen from './alameScreen';
import GeoScreen from './geolocation';

// Importando Botões:
import ButtonHome from '../components/ButtonHome';
import ButtonAlarm from '../components/ButtonAlarm';
import ButtonSettings from '../components/ButtonSettings';
import ButtonGeo from '../components/ButtonGeo';

const Tab = createBottomTabNavigator();

export default function HomeWithTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#89EBF6',
          borderTopColor: 'transparent',
          height: 70,
          paddingBottom: 5,  // Ajustando o padding inferior
          paddingTop: 5,     // Ajustando o padding superior
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonHome size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonAlarm size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={GeoScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonGeo size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonSettings size={size} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
