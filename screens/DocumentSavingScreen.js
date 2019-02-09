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

        <Text style = {styles.instructionText}>Meeting Title:</Text>
        
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter code here"
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
  instructionText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'source-sans-pro-regular',
    textShadowColor: "#1995ad",
    textShadowRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5, 
    width: window.width - 30,
    textAlign: 'center'
  },
  title: {
    fontSize: 25, 
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center', 
    color: '#FFFFFF',
    flex: 1
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
