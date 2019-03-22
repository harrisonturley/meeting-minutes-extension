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

/**
 * Purpose: Provide a screen where the dialog in the meeting is recorded
 */
export default class MeetingDialogScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  /**
   * Purpose: Intialize any required state params
   */
  constructor(props) {
    super(props);

    this.state = {
      dialogArr: [],
      updatingDialogArr: false,
    }

    this.setupComponent();
  }

  /**
   * Purpose: Render the dialog screen, updating everytime new audio is detected
   */
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
                  <Text style = { styles.itemTextStyle }>{ message.text }</Text>
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

  /**
   * Purpose: Unmount listeners when leaving the screen, so no new messages will be recorded
   */
  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners();
  }

  /**
   * Purpose: Set up listeners for getting text from native code
   */
  setupComponent() {
    AndroidMic.getAudio();
    DeviceEventEmitter.addListener('updatedText', this.handleUpdateText.bind(this));
    DeviceEventEmitter.addListener('completedText', this.handleCompletedText.bind(this));
  }

  /**
   * Purpose: Update some pre-existing message with new dialog
   */
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

  /**
   * Purpose: Add the finalized message to the dialog array
   */
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

  /**
   * Purpose: Complete the meeting, storing the completed dialog in state
   */
  _onEndMeeting = () => {
    this.setState({
      dialogArr: this.state.dialogArr,
    });
    
    AndroidMic.cancelSpeechToText();
    this.props.navigation.navigate('SavePdf', { dialogArr: this.state.dialogArr });
  }
}

/**
 * Purpose: Styles for the dialog screen
 */
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
