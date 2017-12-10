import React, {Component} from "react";
import {
    Text,
    View,
    Image,
    StyleSheet
}from 'react-native';
import PropTypes from 'prop-types';

export default class QuestionItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        console.log(data.url);
        if(data.url) {
            return (
                <View>
                    <Image style={{width: 100, height: 100}} source={{ uri:data.url }} />
                </View>
            )
        }
        if(data.text) {
            return (
                <View>
                    <Text style={{textAlign: "center", fontSize: 16, padding: 20}}>{ data.text }</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    base: {
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    active: {
        opacity: 0.6,
        backgroundColor: "#5d611e"
    },
    optionText: {
        padding: 5,
        color: '#ffffff',
        textAlign: 'center'
    }
})


