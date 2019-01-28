import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

class Favrites extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.title}>
                    <Appbar.Content
                        title="Favorites"
                    />
                </Appbar.Header>
                
            </View>
        );
    }
}

export default Favrites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width:'100%',
    },
    title: {
        width: '100%'
    },
});