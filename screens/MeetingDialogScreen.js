import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AndroidMic from '../components/SpeechToTextListener';
import Message from '../components/Message';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

let count = 0;

let htmlStart = "<html lang=\"en\"> \
<head>\
<title>Page Title</title>\
<meta charset=\"UTF-8\">\
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\
<style>\
body {\
  font-family: Arial;\
  margin: 0;\
}\
.header {\
  padding: 10px;\
  text-align: center;\
  background: #1abc9c;\
  color: white;\
  font-size: 30px;\
}\
.content {padding:20px;}\
</style>\
</head>\
<body>\
<div class=\"header\">\
  <h1>Meeting Transcription</h1>\
</div>\
<div class=\"content\">";

let htmlDialog = '';

let htmlEnd = "</body></html>";

export default class MeetingMenuScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogArr: [],
      updatingDialogArr: false,
    }

    this.setupComponent();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meeting Minutes</Text>
        </View>

        <View style = {{flex: 4}}>
          <ScrollView 
            style={styles.scrollView}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{
              this.scrollView.scrollToEnd({animated: true});
            }}> 
            {
              this.state.dialogArr.map(( message, key ) => (
                <View key = { key } style = { styles.item }>
                  <Text style = { styles.itemTextStyle }>[{ message.name }] { message.text }</Text>
                  <View style = { styles.itemSeparator }/>
                </View>
              ))
            }
          </ScrollView>
        </View> 

        <View style={{borderWidth: 1, width: window.width}}/>

        <View style={{alignSelf: 'center', justifyContent: 'center', marginVertical: 25}}>
          <Button title="End Meeting" onPress={this._onEndMeeting} style={styles.endButton}
            icon={
              <Icon name='bell' style={styles.buttonIcon} size={15} color='white'/>
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
      </View>
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners();
  }

  setupComponent() {
    AndroidMic.getAudio();
    DeviceEventEmitter.addListener('updatedText', this.handleUpdateText.bind(this));
    DeviceEventEmitter.addListener('completedText', this.handleCompletedText.bind(this));
  }

  handleUpdateText = (event) => {
    console.log("Update");
    console.log(event.updatedText);

    this.setState(state => {
      const message = new Message();
      message.text = event.updatedText;
      if (state.updatingDialogArr == true && state.dialogArr.length > 0) {
        state.dialogArr.pop();
      }

      const dialogArr = state.dialogArr.concat(message);
      
      return {
        dialogArr,
        updatingDialogArr: true
      }
    });
  }

  handleCompletedText = (event) => {
    console.log("Complete");
    console.log(event.completedText);

    this.setState(state => {
      const message = new Message();
      let dialogArr = state.dialogArr;
      message.text = event.completedText;
      if (message.text.trim() === "") {
        return {
          dialogArr,
          updatingDialogArr: false
        }
      } else if (state.updatingDialogArr == true && state.dialogArr.length > 0) {
        state.dialogArr.pop();
      }

      dialogArr = dialogArr.concat(message);

      return {
        dialogArr,
        updatingDialogArr: false
      }
    });
  }

  _onEndMeeting = () => {
    this.setState({
      dialogArr: this.state.dialogArr,
    });

    //htmlStart += "<p>newelement" + count + "</p>";

    // var RNFS = require('react-native-fs');
    // // create a path you want to write to
    // var path = RNFS.DocumentDirectoryPath + '/test.html';

    // // write the file
    // RNFS.writeFile(path, '<text>Boys we got him</text>', 'utf8')
    // .then((success) => {
    // console.log('FILE WRITTEN!');
    // })
    // .catch((err) => {
    // console.log(err.message);
    // });

    // this.setState(prevState => ({
    //   dialogArr: [...prevState.dialogArr, newelement]
    // }))
    
    count++;
    AndroidMic.cancelSpeechToText();
    this.props.navigation.navigate('SavePdf', { dialogArr: this.state.dialogArr });
    //console.log(htmlStart + htmlDialog + htmlEnd);
    this.createPDF; 
  }

  async createPDF() {
    let options = {
      html: htmlStart + htmlDialog + htmlEnd,
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);
    alert(file.filePath);
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
  title: {
    fontSize: 25, 
    fontFamily: 'source-sans-pro-regular',
    textAlign: 'center', 
    color: '#FFFFFF',
    flex: 1
  },
  scrollView: {
    top: 0,
    bottom: 0
  },
  itemTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
    padding: 10
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#263238',
  },
  endButton: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30, 
  },
  buttonIcon: {
    right: 10
  }
});
