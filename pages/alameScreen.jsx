import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default function AlarmScreen() {
  return (
    <SafeAreaView style={styles.container}>
			<View style={styles.row}>
				<Image
					source = {require("../assets/icon de relogio.png")} 
					resizeMode = {"stretch"}
					style={styles.image}
				/>
				<View style={styles.box}>
				</View>
				<Text style={styles.text}>
					{"Meus alarmes:"}
				</Text>
			</View>
		<View style={styles.view2}>
			<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
				<Text style={styles.text2}>
					{"Adicionar  alarme"}
				</Text>
			</TouchableOpacity>
		</View>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF6EE",
	},
	box: {
		flex: 1,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#89EBF6",
		borderRadius: 14,
		paddingVertical: 8,
		paddingHorizontal: 55,
		shadowColor: "#00000040",
		shadowOpacity: 0.3,
		shadowOffset: {
		    width: 0,
		    height: 4
		},
		shadowRadius: 4,
		elevation: 4,
    marginTop: 300,
	},
	image: {
		width: 70,
		height: 70,
	},
	image2: {
		width: 360,
		height: 97,
		marginBottom: 4,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 36,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFF6EE",
	},
	text: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 28,
		marginRight: 42,
	},
	text2: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
	},
	view: {
		paddingTop: 54,
		paddingBottom: 5,
		marginBottom: 498,
	},
	view2: {
		alignItems: "center",
		marginBottom: 41,
	},
}); 