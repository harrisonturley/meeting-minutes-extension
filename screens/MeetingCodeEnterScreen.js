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
      <Header centerComponent={{ text: 'Minitum', style: { fontSize: 25, fontFamily: 'source-sans-pro-regular' }}}
      containerStyle={{
        backgroundColor: '#1995AD'
      }}/>
      <Icon onPress={this._onPressBackButton}
          name='arrow-circle-o-left'
          size={35}
          color='black'
          style={styles.icon}/>
        
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 2, top: 20}}>
            <Text style = {styles.text}>Please enter{"\n"}your meeting{"\n"}code:</Text>
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
            <Text style = {styles.incorrectCodeText}>{this.state.textValue}</Text>
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
            <View>
                <TextInput
                style={{fontSize: 35}}
                placeholder="Enter code here"
                onChangeText={(text) => this.setState({code:text})}
                />
            </View>
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
            <Button title="Enter"  onPress={this._onPressEnter} style={styles.enterButton}
            icon={
            <Icon name='play' size ={15} color='black'/>
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
  text: {
    color: '#000',
    fontSize: 44,
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
  }
});
