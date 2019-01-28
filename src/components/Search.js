import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { autoSearch } from '../actions/components/search';
import { bindActionCreators } from 'redux';
import { Searchbar } from 'react-native-paper';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            currency: ''
        }
    }

    componentDidMount() {
        const { autoSearch, access_token } = this.props;
        console.log('auto search raadi');   
        autoSearch(access_token);
    }
    
    render() {
        const { data } = this.props;
        
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.title}>
                    <Appbar.Content
                        title="Market search"
                    />
                </Appbar.Header>
                <Searchbar
                    style={styles.search}
                    placeholder="Search"
                    onChangeText={(currency) => this.setState({ currency })}
                    value={this.state.currency}
                />
                <View style={styles.currencys}>
                {
                    data.map(curr => {
                        <Text style={styles.currency} >{curr.name}</Text>    
                    })
                }
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ 
        login: { access_token },
        search: { data }
    }) => ({
        access_token,
        data
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    autoSearch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width:'100%',
    },
    title: {
        width:'100%',
    },
    search: {
        margin: 20
    },
    currencys: {
        flex: 1,
        backgroundColor: 'red',
        width: '100%',
    },
    currency: {
        backgroundColor: 'blue',
        width: '100%',
        height: 40
    }
});