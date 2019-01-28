import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {Header} from 'react-native-elements';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { withNavigation } from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Header
      containerStyle={{
        backgroundColor: '#1995AD'
      }}/>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                  require('../assets/images/blacklogo.png')
              }
              style={styles.welcomeImage}
            />
          </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}></View>
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2}}>
          <Button title="Continue" onPress={this._onPressContinue} style={styles.continueButton}
          icon={
            <Icon name='long-arrow-right' size ={15} color='black'/>
          }
          buttonStyle={{
            backgroundColor: "#1995AD",
            width: 300,
            height: 50,
            borderWidth: 0,
            borderRadius: 5}}
            />
        </View>
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <Button title="Set up Verification" onPress={this._onPressSetup} style={styles.setupButton}
          icon={
            <Icon name='send-o' size ={15} color='black'/>
          }
          buttonStyle={{
            backgroundColor: "#A1D2E6",
            width: 300,
            height: 50,
            borderWidth: 0,
            borderRadius: 5}}
            />
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2}}></View>

      </View>
    );
  }

  _onPressContinue = () => {
    this.props.navigation.navigate('Continue');
  }

  _onPressSetup = () => {

  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 0,
  },
  welcomeImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  continueButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
  setupButton: {
    position: 'absolute',
    alignSelf: 'center',
  }
});
