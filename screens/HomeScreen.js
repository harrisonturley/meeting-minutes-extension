import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {
  Image,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Platform,
} from 'react-native';

/**
 * Purpose: Provide the initial landing screen, prior to a meeting starting
 */
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  /**
   * Purpose: Render the home screen
   */
  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}/>

        <View style={styles.welcomeContainer}>
          <Image
            source={
                require('../assets/images/current_logo.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={styles.title}>Meeting Minutes</Text>
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', padding: 10, flex: 1}}>
          <Button title="Start New Meeting" onPress={this._onPressMeetingSetup} style={styles.meetingSetupButton}
            icon={
              <Icon name='long-arrow-right' size ={15} color='white' style={styles.buttonIconStyle}/>
            }

            buttonStyle={{
              backgroundColor: "#1995AD",
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

  /**
   * Purpose: Move to dialog recording screen on setup being pressed
   */
  _onPressMeetingSetup = () => {
    this.props.navigation.navigate('MeetingDialog');
  }

  /**
   * Purpose: Add a listener for the hardware back button to override usual functionality
   */
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
  }

  /**
   * Purpose: Ignore normal functionality of the hardware back button
   */
  handleBackPress = () => {
    return true;
  }
}

/**
 * Purpose: Provide the styles required for the home screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
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
  }, 
  title: {
    fontSize: 35,
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center', 
    fontWeight: 'bold',
    color: '#000000',
  },
  meetingSetupButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
  setupButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
  header: {
    backgroundColor: '#1995AD',
    height: 75,
    flexDirection: 'row',
    ...Platform.select({
      android: {
        elevation: 10
      }
    })
  },
  buttonIconStyle: {
    right: 10
  }
});
