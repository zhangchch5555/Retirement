import React, {Component} from "react";
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity
}from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import PropTypes from 'prop-types';

export default class Result extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let navigation = this.props.navigation.state.params.sum;
        let tableHead = Object.keys(navigation);
        tableHead.unshift('');
        tableHead.push('sum');
        const DEFAULT_VAL = [1,1,1,1,1,1];
        let val = Object.values(navigation);
        let sum = 0;
        for(let item of val){
            sum = sum+item;
        }
        val.push(sum);
        const tableData = [val,DEFAULT_VAL];
        const tableTitle = ['Title', 'Title2'];
        return (
            <View>
                <Table style={{ paddingTop: 60 }}>
                    <Row data={ tableHead } flexArr={[1,1,1,1,1,1,1]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={{flexDirection: 'row'}}>
                        <Col data={tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text} />
                        <Rows data={tableData} flexArr={[1,1,1,1,1,1]} style={styles.row} />
                    </TableWrapper>
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    title: {
        flex: 1,
        backgroundColor: '#f6f8fa'
    },
    row: {
        height: 28,
        textAlign: 'center'
    },
    text: {
        textAlign: 'center'
    }
})

