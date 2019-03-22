import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ToastModule from '../components/ToastModule'

/**
 * Purpose: Provide a screen where remote users can enter a code to enter a meeting
 */
export default class MeetingCodeEnterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
      textValue: ''
  }

  /**
   * Purpose: Render the code entry screen
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meeting Minutes</Text>

          <Icon onPress={this._onPressBackButton}
            name='arrow-circle-o-left'
            size={35}
            color='#FFF' 
            style={styles.backButton}
          />
        </View>
        
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F1F1F1', alignItems: 'center', justifyContent: 'center' }} behavior='padding'>
          <Image
            source={
              require('../assets/images/current_logo.png')
            }

            style={styles.welcomeImage}
          />

          <Text style={styles.instructionText}>Please create a meeting code:</Text>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter code here"
              onChangeText={(text) => this.setState({code:text})}
            />
          </View>

          <View style = {{alignSelf: 'center', justifyContent: 'center', marginVertical: 10}}>
            <Button title="Enter"  onPress={this._onPressEnter} style={styles.enterButton}
              icon={
                <Icon name='play' size={15} color='white' style={styles.buttonIconStyle}/>
              }

              buttonStyle={{
                backgroundColor: "#1995AD",
                width: 300,
                height: 45,
                borderWidth: 0,
                borderRadius: 5,
              }}
            />
          </View>

          <View style = {{height: 60}}/>
        </KeyboardAvoidingView>
      </View>
    );
  }

  /**
   * Purpose: Enter the dialog screen if the entered code is valid
   */
  _onPressEnter = () => {
    if (this.state.code == undefined || this.state.code == '') {
      ToastModule.show('Invalid input!', ToastModule.SHORT);
      return;
    }

    this.props.navigation.navigate('MeetingDialog');
  }

  /**
   * Purpose: Override the back button functionality
   */
  _onPressBackButton = () => {
    this.props.navigation.pop();
  }
}

/**
 * Purpose: Provide styling for the meeting code entry screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'source-sans-pro-regular',
    textShadowColor: "#1995ad",
    textShadowRadius: 20,
    width: window.width - 30,
    textAlign: 'center',
  },
  enterButton: {
    backgroundColor: '#1995AD',
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    paddingVertical: 35,
    justifyContent: 'flex-start',
    flex: 1
  },
  title: {
    fontSize: 25, 
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center', 
    color: '#FFFFFF',
    flex: 1
  }, 
  header: {
    backgroundColor: '#1995AD',
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: 'row',
    zIndex: 5,
    ...Platform.select({
      android: {
        elevation: 10
      }
    })
  }, 
  buttonIconStyle: {
    right: 10
  }, 
  welcomeImage: {
    height: 150,
    resizeMode: 'contain',
    marginHorizontal: 10,
    marginBottom: 25
  },
  textInputContainer: {
    height: 50,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
    borderWidth: 1,
    borderRadius: 5
  },
  textInput: {
    fontSize: 25,
    marginHorizontal: 10,
    marginVertical: 5
  }
});
