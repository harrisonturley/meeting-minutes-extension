import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Platform,} from 'react-native';

/**
 * Purpose: Provide a landing screen after a meeting has been successfully mailed
 */
export default class SuccessScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  /**
   * Purpose: Render the success screen
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meeting Minutes</Text>
        </View>

        <TouchableOpacity onPress={this._onEndMeeting} style={styles.touchableContainer}>
          <Text style = {styles.textStyle}>SUCCESS!</Text>
          <Text style = {styles.subtextStyle}>Press anywhere to continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * Purpose: Navigate back to home screen after success
   */
  _onEndMeeting = () => {
    this.props.navigation.navigate('Home');
  }
}

/**
 * Purpose: Styles for the success screen
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
  touchableContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'source-sans-pro-regular',
    color: '#1995ad',
  }, 
  subtextStyle: {
    fontSize: 25,
    fontFamily: 'source-sans-pro-regular',
  }
});
