import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';

import languages from '../../constants/languages';
import Header from '../../components/Header';
import { goToLanguage } from '../../actions';
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';

class LanguageSwitcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewOverlay: false
		};
	}

	render() {
		const goToLanguage = this.props.goToLanguage;

		return (<View>
			<Button
				accessibilityLabel={"Current Language: " + this.props.currLanguage +
					". Select to change language."}
				buttonStyle={{
					backgroundColor: "#FFFFFF",
					borderColor: "#0000AA",
					borderWidth: 2,
					marginLeft: 8,
					padding: 5}}
				icon={
					<Icon name="language" size={18} color="#0000AA" />
				}
				title={this.props.currLanguage}
				titleStyle={{
					color: "#0000AA",
					marginLeft: 5
				}}
				onPress={() => this.setState({viewOverlay: !this.state.viewOverlay})}
			/>
			<Overlay
				isVisible={this.state.viewOverlay}
				onBackdropPress={() => this.setState({viewOverlay: !this.state.viewOverlay})}
				width="auto"
				height="auto"
			>
				<View style={{width: "100%"}}>
					<Header
						title={this.props.t('LANGUAGES_TEXT')}
						close={() => this.setState({viewOverlay: !this.state.viewOverlay})}
					/>
					<FlatList
						data={languages}
						renderItem={(item) =>
							<TouchableHighlight
								style={{padding: 5, width: 200}}
								onPress={() => {
									this.setState({viewOverlay: !this.state.viewOverlay});
									this.props.i18n.changeLanguage(item.item.key);
									goToLanguage(item.item);
								}}
							>
								<Text style={{fontSize: 18}}>{item.item.name}</Text>
							</TouchableHighlight>
						}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			</Overlay>
		</View>);
	}
}

const mapStateToProps = state => {
	
	return {
		currLanguage: state.currLanguage,
		t: state.t
	}
}

const mapDispatchToProps = dispatch => {
	return {
		goToLanguage: language => {
			dispatch(goToLanguage(language));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LanguageSwitcher));
