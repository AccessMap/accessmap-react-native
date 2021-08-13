import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight, AccessibilityInfo } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';

import languages from '../../constants/languages';
import Header from '../../components/Header';
import { goToLanguage } from '../../actions';
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import { Buttons } from '../../styles';

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
				accessibilityLabel={"Current Language: " + 
					languages.find(lang => 
						lang.key == this.props.currLanguage.toLowerCase()).name +
						". Select to change language."}
				buttonStyle={Buttons.languageOrRegionSwitch}
				icon={
					<Icon name="language" size={18} color="#0000AA" />
				}
				title={this.props.currLanguage}
				titleStyle={{
					color: "#0000AA",
					marginLeft: 5
				}}
				onPress={() => { 
					this.setState({viewOverlay: !this.state.viewOverlay});
				}}
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
								style={{padding: 10, width: 200, height: 50}}
								onPress={() => {
									this.setState({viewOverlay: !this.state.viewOverlay});
									this.props.i18n.changeLanguage(item.item.key);
									goToLanguage(item.item);
									AccessibilityInfo.announceForAccessibility("Changed language to " + item.item.name);
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
