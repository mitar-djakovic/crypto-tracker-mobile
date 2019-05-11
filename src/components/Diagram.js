import React, { Fragment } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import RNPickerSelect from 'react-native-picker-select';
import { LineChart } from 'react-native-chart-kit';
import { AntDesign } from '@expo/vector-icons';
import { getCurrencyChart, getPoint } from '../actions/';

class Diagram extends React.Component {
    constructor() {
        super();
        this.state = {
            activeCurrency: '',
            activeColor: '',
            currencys: [
                {
                    label: 'BTC',
                    value: 'BTC',
                },
                {
                    label: 'ETH',
                    value: 'ETH',
                },
                {
                    label: 'XRP',
                    value: 'XRP',
                },
            ],
            activePoint: ''  
        }
    }
    async componentDidMount() {
        const { getCurrencyChart } = this.props;
        const { activeCurrency } = this.state;

        await this.setState({
            activeCurrency: this.props.navigation.state.params.currency
        });
        await getCurrencyChart(activeCurrency)
    }

    handleSelect = (value) => {
        const { getCurrencyChart } = this.props;
        const { activeCurrency } = this.state;

        if (value === 'BTC') {
            color = '#FFC300';
        } else if (value === 'ETH') {
            color = '#2E86C1';
        } else {
            color = '#49D359'
        }
        this.setState({
            activeCurrency: value,
            activeColor: color
        })
        getCurrencyChart(activeCurrency)
    }

    render() {
        const { chartData, dataLoaded, getPoint, activePoint, pointLoaded } = this.props;
        const { activeCurrency, currencys, activeColor } = this.state;

        const placeholder = {
            label: activeCurrency,
            value: activeCurrency,
            color: 'gray',
        };
        const days = [];
        const price = [];
        (chartData || []).map(data => {
            days.push(data.d);
            price.push(data.p);
        })
        return(
            <View style={{ flex: 1, backgroundColor: activeColor}}>
                <View style={styles.diagramHeader}>
                    <View style={styles.diagramTitleContainer}>
                        <AntDesign
                            name='doubleleft' 
                            size={30}
                            color='#FFF'
                            onPress={() => this.props.navigation.navigate('Home')} 
                        />
                    </View>
                    <View style={styles.currencySelect}>
                        <RNPickerSelect
                            items={currencys}
                            value={activeCurrency}
                            placeholder={placeholder}
                            style={{
                                ...pickerSelectStyles,
                                color: '#FFF'
                            }}
                            onValueChange={value => this.handleSelect(value)}
                        />
                    </View>
                </View>
                
                {
                    dataLoaded ?
                        <Fragment>
                            <LineChart
                                data={{
                                    labels: days,
                                    datasets: [{
                                        data: price
                                    }]
                                }}
                                width={Dimensions.get('window').width} // from react-native
                                height={Dimensions.get('window').height - 80}
                                yAxisLabel={'$'}
                                chartConfig={{
                                    backgroundColor: activeColor,
                                    backgroundGradientFrom: activeColor,
                                    backgroundGradientTo: activeColor,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    }
                                }}
                                onDataPointClick={(e) => getPoint(e.value)} 
                            />
                            <View style={styles.pointContainer}>
                                <View style={styles.point}>
                                    <Text style={styles.pointText}>
                                        {pointLoaded ? `${activePoint} $` : 'SELECT POINT'}
                                    </Text>
                                </View>
                            </View>
                        </Fragment>
                    : null
                }
            </View>
        )
    }
}

const mapStateToProps = ({ chart: { 
    requestSent, 
    chartData, 
    dataLoaded, 
    activePointReqSent,
    pointError,
    activePoint,
    pointLoaded,
}}) => ({
    requestSent,
    chartData,
    dataLoaded,
    activePointReqSent,
    pointError,
    activePoint,
    pointLoaded
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrencyChart,
    getPoint
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    diagramHeader: {
        width: '100%',
        paddingTop: 40,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#D8D8D8'
    },
    diagramTitle: {
        color: '#FFF',
        fontSize: 20
    },
    diagramTitleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    currencySelect: {
        width: '33%',
        backgroundColor: 'rgba(3,3,3,0.3)',
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    pointContainer: {
        padding: 30,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    point: {
        backgroundColor: '#FFF',
        width: '100%',
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
    pointText: {
        textAlign: 'center',
        fontSize: 20
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: 'red'
    },
    inputAndroid: {
        color: 'red'
    },
});