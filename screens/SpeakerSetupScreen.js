import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

export default class SpeakerSetupScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Meeting Minutes</Text>

                    <Icon onPress={this._onPressBackButton}
                        name='arrow-circle-o-left'
                        size={35}
                        color='#FFF' 
                        style={styles.backButton}
                    />
                </View>
            </View>
        );
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
        flexDirection: 'row',
        zIndex: 5,
        ...Platform.select({
            android: {
                elevation: 10
            }
        })
    }, 
    backButton: {
        position: 'absolute',
        left: 10,
        paddingVertical: 35,
        justifyContent: 'flex-start',
        flex: 1
    },
});