import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Header } from 'react-native-elements';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

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
          <Button title="Set up Verification" onPress={this._onPressVerification} style={styles.setupButton}
            icon={
              <Icon name='send-o' size ={15} color='black'/>
            }
            buttonStyle={{
              backgroundColor: "#A1D2E6",
              width: 300,
              height: 50,
              borderWidth: 0,
              borderRadius: 5
            }}
          />
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2}}></View>
      </View>
    );
  }

  _onPressContinue = () => {
    this.props.navigation.navigate('Continue');
  }

  _onPressVerification = () => {

  }
}

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
    fontSize: 25,
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center', 
    color: '#000000',
  },
  continueButton: {
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
    flexDirection: 'row'
  }
});
