import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {Header} from 'react-native-elements';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



export default class MeetingMenuScreen extends React.Component {


  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
      <Header centerComponent={{ text: 'Minitum', style: { fontSize: 25, fontFamily: 'source-sans-pro-regular' }}}
      containerStyle={{
        backgroundColor: '#1995AD'
      }}/>
    <Icon onPress={this._onPressBackButton}
        name='arrow-circle-o-left'
        size={35}
        color='black'
        style={styles.icon}/>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2}}></View>
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <Button title="New Meeting"  onPress={this._onPressNewMeeting} style={styles.continueButton}
          icon={
            <Icon name='group' size ={15} color='black'/>
          }
          buttonStyle={{
          backgroundColor: "#1995AD",
          width: 300,
          height: 45,
          borderWidth: 0,
          borderRadius: 5}}
          />
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <Button title="Join Meeting"  onPress={this._onPressJoinMeeting} style={styles.setupButton}
          icon={
            <Icon name='group' size ={15} color='black'/>
          }
          buttonStyle={{
          backgroundColor: "#A1D2E6",
          width: 300,
          height: 45,
          borderWidth: 0,
          borderRadius: 5,}}
          />
        </View>
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2}}></View>

      </View>
    );
  }

  _onPressNewMeeting = () => {
    var generatedCode = "GU7FJ";
    this.props.navigation.navigate('NewMeeting', {data: {code: generatedCode}});
  }

  _onPressJoinMeeting = () => {
    this.props.navigation.navigate('EnterCode');
  }

  _onPressBackButton = () => {
    this.props.navigation.pop();
  }

  }
  function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
  },
  continueButton: {
    position: 'absolute',
    //top: 175,
    //paddingVertical : 20,
    alignSelf: 'center',

  },
  setupButton: {
    position: 'absolute',
    //top: 240,
    //paddingVertical : 20,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  }
});
