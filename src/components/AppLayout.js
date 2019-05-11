import React from "react";
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { AntDesign } from '@expo/vector-icons';
import { getCurrentPrices } from '../actions/';

class AppLayout extends React.Component {
    componentDidMount() {
        this.props.getCurrentPrices();
    }
    render() {
        return(
            <View style={styles.container} >
                <View style={styles.header} >
                    <Text style={styles.headerTitle}>CRYPTO TRACKER</Text>
                </View>
                <View style={styles.currencyBlock}>
                    {
                        this.props.dataLoaded ? Object.entries(this.props.currentPrice).map(([key, value]) => {
                            if(key === 'BTC') {
                                value.color = '#FFC300';
                            } else if (key === 'ETH') {
                                value.color = '#2E86C1';
                            } else {
                                value.color = '#49D359';
                            }
                            return(
                                <View style={styles.currencyContainer} key={key}>
                                    <View 
                                        style={{
                                            backgroundColor: value.color,
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginLeft: 15,
                                            marginTop: 20
                                        }}
                                    >
                                        <Text style={styles.currencyIcon}>
                                            {key}
                                        </Text>
                                    </View>
                                    <View style={styles.currencyValContainer}>
                                        <View>
                                            <Text style={styles.currencyVal}>
                                                {value['USD']} $ 
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                backgroundColor: value.color,
                                                height: '100%',
                                                paddingTop: 30,
                                                borderTopRightRadius: 10,
                                                borderBottomRightRadius: 10,
                                                paddingLeft: 4,
                                                paddingRight: 4
                                            }}
                                        >
                                            <AntDesign
                                                name='doubleright' 
                                                size={30}
                                                color='#FFF'
                                                onPress={() => this.props.navigation.navigate(
                                                    'Diagram', { 
                                                        currency: key,
                                                        // currencyValue: value  
                                                    })
                                                } 
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                        : null
                    }
                </View>
                {
                    this.props.dataLoaded ? 
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Text 
                                    style={styles.buttonText}
                                    onPress={() => this.props.getCurrentPrices()}
                                >
                                    {this.props.requestSent ? 'LOADING...' : 'GET CURRENT PRICE'}
                                </Text>
                            </View>
                        </View>
                    : null
                }
            </View>
        )
    }
}

const mapStateToProps = ({ data: { currentPrice, test, dataLoaded, requestSent } }) => ({
    currentPrice,
    test,
    dataLoaded,
    requestSent
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrentPrices
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFDFDF',
    },
    header: {
        backgroundColor: '#1730B7',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 25
    },
    currencyBlock: {
        padding: 30,
    },
    buttonContainer: {
        padding: 30,
    },
    button: {
        backgroundColor: '#1730B7',
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center'
    },
    currencyContainer: {
        backgroundColor: '#FFF',
        height: 90,
        marginTop: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currencyIcon: {
        color: '#FFF',
    },
    currencyValContainer: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currencyVal: {
        fontSize: 30,
        marginRight: 15,
        marginTop: 25
    }
});