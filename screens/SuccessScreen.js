import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class SuccessScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onEndMeeting} style={styles.container}>
        <Text style = {styles.textStyle}>SUCCESS!</Text>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    
  }

  _onEndMeeting = () => {
        this.props.navigation.navigate('Home');
    }
}


const styles = StyleSheet.create({
  container: {
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
  }
});
