import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { login } from '../actions/components/login';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: 'mitar-djakovic2401993@hotmail.com',
            password: 'Mitar1234'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { login } = this.props;
        console.log(this.state.username, this.state.password);
        login(this.state.username, this.state.password);
        // .then(access_token => {
        //     search(access_token);
        // });
    }
    render() {
        const { loading } = this.props;

        return (
            <KeyboardAvoidingView 
                //contentContainerStyle={} 
                behavior='padding' 
                style={styles.container}
            >
                <Text style={styles.welcome}>Welcome</Text>
                <TextInput 
                    style={styles.inputOne}
                    label='Email'
                    onChangeText={(username) => this.setState({username})}
                    name='username'
                    value={this.state.username}
                />
                <TextInput 
                    style={styles.inputTwo}
                    label='Password'
                    onChangeText={(password) => this.setState({password})}
                    name="password"
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    style={styles.button} 
                    mode="contained" 
                    onPress={this.handleSubmit}
                >
                    {loading ? 'loading...' : 'Sign in'}
                </Button>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = ({ login: { loading } }) => ({
    loading
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    login
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width:'90%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#555',
        position: 'absolute',
        top: 150
    },
    inputOne: {
        width: '100%',
        marginBottom: 0,
        marginTop: 0,
        paddingTop: 5,
        backgroundColor: 'transparent',
        position: 'relative',
        top: '40%'
    },
    inputTwo: {
        width: '100%',
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: '#fff',
        position: 'relative',
        top: '45%'
    },
    button: {
        width: '100%',
        borderRadius: 2,
        paddingTop: 10,
        paddingBottom: 10,
        position: 'relative',
        top: '60%'
    }
});
