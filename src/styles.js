import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: "#F5FCFF",
	},
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF",
	},
	map: {
		flex: 1,
	},
	geocoder: {
		flex: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		margin: 10,
		zIndex: 20,
	},
	searchresult: {
		backgroundColor: "#F5FCFF",
		fontSize: 18,
		padding: 5,
	},
	zooms: {
		flex: 1,
		flexDirection: "column",
		position: "absolute",
		right: 0,
		bottom: 0,
		margin: 10,
		zIndex: 20,
	},
	button: {
		backgroundColor: "white",
		borderRadius: 30,
		paddingTop: 15,
		paddingRight: 15,
		paddingBottom: 15,
		paddingLeft: 15,
		margin: 5,
	},
});
