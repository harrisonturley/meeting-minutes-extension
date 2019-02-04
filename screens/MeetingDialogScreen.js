import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  //state = {
  //  textValue: '',
  //  dialogArr: [],
  //}

  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      dialogArr: [],
    }
    
    this.addListenerOn(DeviceEventEmitter, 'updateText', _updateText);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex: 4}}>
        <ScrollView
          style={styles.scrollView}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true});
          }}>
          {
            this.state.dialogArr.map(( item, key ) =>
            (
              <View key = { key } style = { styles.item }>
                  <Text style = { styles.item_text_style }>{ item }</Text>
                  <View style = { styles.item_separator }/>
              </View>
            ))
          }
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <Button title="End Meeting"  onPress={this._onEndMeeting} style={styles.endButton}
          icon={
            <Icon name='bell' size={15} color='black'/>
          }
      buttonStyle={{
      backgroundColor: "#1995AD",
      width: 300,
      height: 45,
      borderWidth: 0,
      borderRadius: 5,}}
      />
        </View>
      </View>
    );
  }

  /*
   * Function to update text of speech-to-text
   */
  _updateText(e) {

  }

  _onEndMeeting = () => {
    this.state.dialogArr.push("newelement" + count);
    this.setState({
      dialogArr: this.state.dialogArr,
    });

    htmlStart += "<p>newelement" + count + "</p>";

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
    this.props.navigation.navigate('SavePdf');
    console.log(htmlStart + htmlDialog + htmlEnd);
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
  scrollView: {
    top: 30,
    bottom: 100,
  },
  endButton: {
    position: 'absolute',
    bottom: 10,
    paddingVertical : 20,
    alignSelf: 'center',
  },
  item_text_style:
  {
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
    padding: 10
  },
  item_separator:
  {
    height: 1,
    width: '100%',
    backgroundColor: '#263238',
  }
});
