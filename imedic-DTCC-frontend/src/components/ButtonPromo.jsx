import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function ButtonPromo({ size, focused }) {
    return (
        <View style={[
            styles.container, 
            {
                backgroundColor: focused ? '#FFFFFF' : '#DEDEDE',
                borderWidth: 2,
                borderColor: '#4682B4'
            }
        ]}>
            <MaterialIcons 
                name="medication" // ícone de promoção
                color={focused ? '#4682B4' : '#4169E1'} 
                size={size} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }
});
