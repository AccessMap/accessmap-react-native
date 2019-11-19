import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AboutOverlay = props => {
	return (
		<View style={{width: "100%"}}>
			<Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10}}>About</Text>

			<View style={{flexDirection: "row", alignItems: "center"}}>
				<Button
					icon={
						<Icon
							name="github"
							size={25}
							color="black"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>AccessMap is an open source project.</Text>
			</View>
				<View style={{flexDirection: "row", alignItems: "center"}}>
				<Button
					icon={
						<Icon
							name="graduation-cap"
							size={25}
							color="black"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>AccessMap is developed via the Taskar Center at the University of Washington.</Text>
			</View>
				<Text>AccessMap has received support from many organizations.</Text>
			<View style={{flexDirection: "row", alignItems: "center"}}>
				<Button
					icon={
						<Icon
							name="heart"
							size={25}
							color="red"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>Contribute to AccessMap development by donating to the Taskar Center. Mention AccessMap in the comment.</Text>
			</View>
			<Button
				title="CLOSE"
				type="clear"
				onPress={props.onClose}
			/>
		</View>
	);
}

export default AboutOverlay;
