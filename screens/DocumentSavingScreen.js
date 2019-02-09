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
  TextInput,
} from 'react-native';

export default class MeetingCodeEnterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
      textValue: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meeting Minutes</Text>
        </View>

        <Icon onPress={this._onPressBackButton}
          name='arrow-circle-o-left'
          size={35}
          color='black'
          style={styles.icon}
        />

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}></View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <Text style = {styles.text}>Title:</Text>
        </View>
        
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <View style={styles.textBox}>
            <TextInput
              style={{fontSize: 35}}
              placeholder="Enter title here"
              onChangeText={(text) => this.setState({code:text})}
            />
          </View>
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 3}}>
          <Button title="Save Meeting Notes" onPress={this._onPressSaveDocument} style={styles.saveButton}
            icon={
              <Icon name='file-pdf-o' style={styles.buttonIcon} size ={15} color='white'/>
            }
            buttonStyle={{
              backgroundColor: "#1995AD",
              width: 300,
              height: 45,
              borderWidth: 0,
              borderRadius: 5
            }}
          />
        </View>
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2}}></View>
      </View>
    );
  }

  _onPressSaveDocument = () => {
    this.props.navigation.navigate('SuccessScreen');

  }
  _onPressBackButton = () => {
    this.props.navigation.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
  },
  header: {
    backgroundColor: '#1995AD',
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: 'row',
    zIndex: 5
  }, 
  title: {
    fontSize: 25, 
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center', 
    color: '#FFFFFF',
    flex: 1
  },
  text: {
    color: '#000',
    fontSize: 44,
    fontWeight: 'bold',
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center',
    textShadowColor: "#1995ad",
    textShadowRadius: 20,
  },
  textBox: {
    position: 'absolute',
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
  },
  saveButton: {
    position: 'absolute',
    paddingVertical : 20,
    alignSelf: 'center',
  },
  buttonIcon: {
    right: 10
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  }
});
