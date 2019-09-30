import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ContactOverlay = props => {
	return (
		<View style={{width: '100%'}}>
			<Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Contact</Text>
				<View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
				<Button
					icon={
						<Icon
							name='twitter'
							size={25}
							color='black'
						/>
					}
					type='clear'
					containerStyle={{flex: 2}}
				/>
				<Text style={{flex: 5}}>Follow us on social media.</Text>
			</View>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Button
					icon={
						<Icon
							name='envelope'
							size={25}
							color='black'
						/>
					}
					type='clear'
					containerStyle={{flex: 2}}
				/>
				<Text style={{flex: 5, flexWrap: 'wrap'}}>Email us if you encounter issues or want to help out</Text>
			</View>

			<Button
				title='CLOSE'
				type='clear'
				onPress={props.onClose}
			/>

		</View>
	);
}

export default ContactOverlay;
