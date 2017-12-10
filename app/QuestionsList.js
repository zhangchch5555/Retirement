import React, {Component} from "react";
import {
    StyleSheet,
    FlatList,
}from 'react-native';
import PropTypes from 'prop-types';
import QuestionItem from "./QuestionItem";

// 题目集合组件
export default class QuestionsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let questions = this.props.questions;
        console.log(questions);
        return (
            <FlatList
                data={ questions }
                renderItem={ ({item}) => <QuestionItem data={ item } /> }
            />
        )
    }
}
