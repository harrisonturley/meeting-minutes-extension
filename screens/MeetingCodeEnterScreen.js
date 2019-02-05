import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
import {Button} from 'react-native-elements';
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

          <Icon onPress={this._onPressBackButton}
            name='arrow-circle-o-left'
            size={35}
            color='#000000'
            style={styles.backButton}
          />
        </View>
        
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2, top: 20}}>
          <Image
            source={
                require('../assets/images/current_logo.png')
            }
            
            style={styles.welcomeImage}
          />
          
          <Text style = {styles.instructionText}>Please enter{"\n"}your meeting{"\n"}code:</Text>
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
            <Text style = {styles.incorrectCodeText}>{this.state.textValue}</Text>
        </View>

        <View style = {styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter code here"
            onChangeText={(text) => this.setState({code:text})}
          />
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <Button title="Enter"  onPress={this._onPressEnter} style={styles.enterButton}
            icon={
              <Icon name='play' size ={15} color='black' style={styles.buttonIconStyle}/>
            }

            buttonStyle={{
            backgroundColor: "#1995AD",
            width: 300,
            height: 45,
            borderWidth: 0,
            borderRadius: 5,}}
          />
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}></View>
      </View>
    );
  }


  _onPressEnter = () => {
    // If nothing entered return
    if (this.state.code == undefined || this.state.code == '')
        return;

    this.props.navigation.navigate('MeetingDialog');
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
  instructionText: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center',
    textShadowColor: "#1995ad",
    textShadowRadius: 20,
  },
  incorrectCodeText: {
    color: '#cc0000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: "#1995ad",
    textShadowRadius: 20,
  },
  textBox: {
    position: 'absolute',
    fontSize: 35,
    textAlign: 'center',
  },
  enterButton: {
    position: 'absolute',
    paddingVertical : 20,
    alignSelf: 'center',
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
    flexDirection: 'row'
  }, 
  buttonIconStyle: {
    right: 10
  }, 
  welcomeImage: {
    width: 150,
    height: 125,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textInputContainer: {
    alignSelf: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    borderLeftWidth: 1, 
    borderRightWidth: 1, 
    borderTopWidth: 1, 
    borderBottomWidth: 1,
    borderRadius: 5, 
  },
  textInput: {
    fontSize: 25,
    paddingLeft: 15,
    paddingRight: 15
  }
});
