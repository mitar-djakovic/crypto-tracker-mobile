import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Home extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Currency</Text>
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
    },
    title: {
        backgroundColor: 'blue'
    },

});