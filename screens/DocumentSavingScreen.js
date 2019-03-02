import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import ToastModule from '../components/ToastModule';
import Mailer from 'react-native-mail';
import Message from '../components/Message';

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

        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F1F1F1', alignItems: 'center', justifyContent: 'center', height: window.height / 2}} behavior='padding'>
          <Image
            source={
              require('../assets/images/current_logo.png')
            }

            style={styles.welcomeImage}
          />
          
          <Text style = {styles.instructionText}>Enter Meeting Title:</Text>
           
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter title here"
              onChangeText={(text) => this.setState({title:text})}
            />
          </View>
        

          <View style = {{alignSelf: 'center', justifyContent: 'center', marginVertical: 10}}>
            <Button title="Save Meeting Notes" onPress={this._onPressSaveDocument} style={styles.saveButton}
              icon={
                <Icon name='file-pdf-o' style={styles.buttonIcon} size={15} color='white'/>
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

          <View style = {{alignSelf: 'center', justifyContent: 'center'}}>
            <Button title="Cancel" onPress={this._onPressCancelButton} style={styles.cancelButton}
              icon={
                <Icon name='ban' style={styles.buttonIcon} size={15} color='white'/>
              }

              buttonStyle={{
                backgroundColor: "#A1D2E6",
                width: 300,
                height: 45,
                borderWidth: 0,
                borderRadius: 5
              }}
            />
          </View> 

          <View style = {{height: 60}}/>
        </KeyboardAvoidingView>
      </View>
    );
  }

  craftEmail() {
    const textFromMeeting = this.props.navigation.state.params.dialogArr;
    var paragraphForm = '';
    console.log(textFromMeeting); 
    for (i = 0; i < textFromMeeting.length; i++) {
      paragraphForm.concat('<p>[' + textFromMeeting[i].name + '] ' + textFromMeeting[i].text + '</p>');
      console.log('Message: ' + textFromMeeting[i]);
      console.log('Current paragraph form: ' + textFromMeeting[i]);
    }

    /*
    textFromMeeting.forEach(message => {
      paragraphForm.concat('<p>[' + message.name + '] ' + message.text + '</p>');
      console.log('Message: ' + message);
      console.log('Current paragraph form: ' + paragraphForm);
    });*/

    this.handleEmail(paragraphForm);
  }

  handleEmail(message) {
    console.log('Final message passed: ' + message);
    Mailer.mail({
      subject: 'Meeting Minutes: ' + this.state.title,
      recipients: [],
      ccRecipients: [],
      bccRecipients: [],
      body: '<p>Please find attached the notes from our meeting earlier entitled: ' + this.state.title + '</p>' + message,
      isHTML: true,
      attachment: {
        path: this.state.filePath,  
        type: 'pdf',   
        name: this.state.title,   
      }
    }, (error, event) => {
      console.log('Error sending email: ' + error.message);
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

  _onPressSaveDocument = () => {
    if (this.state.title == undefined || this.state.title == '') {
      ToastModule.show('Invalid input!', ToastModule.SHORT);
      //console.log(this.props.navigation.state.params);
      return;
    }

    this.craftEmail(); 
    this.props.navigation.navigate('SuccessScreen');

  }
  _onPressCancelButton = () => {
    ToastModule.show('Meeting saving cancelled!', ToastModule.SHORT);
    this.props.navigation.navigate('Home'); 
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
    zIndex: 5,
    ...Platform.select({
      android: {
        elevation: 10
      }
    })
  },
  welcomeImage: {
    height: 150,
    resizeMode: 'contain', 
    marginHorizontal: 10,
    marginBottom: 25
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
    marginHorizontal: 15, 
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
    marginHorizontal: 10,
    marginVertical: 15,
    width: window.width - 30,
  },
  cancelButton: {
    marginHorizontal: 10,
    marginVertical: 15,
    width: window.width - 30
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
