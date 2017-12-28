import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
}from 'react-native';
import PropTypes from 'prop-types';

export default class OptionItem extends Component {
    constructor(props) {
        super(props);
    }

    changeSelectedItem(num,value) {
        this.props.setActiveOption(num,value);
    }

    render() {
        let {num,value,text} = this.props.data;
        let selectedNum = this.props.selectedNum;
        return (
            <View style = { [styles.base,num == selectedNum ? styles.active : ''] }>
                <TouchableHighlight
                    onPress={ () => this.changeSelectedItem(num,value) }
                    underlayColor="rgb(210, 230,255)"
                    activeOpacity={0}
                >
                    <Text style={ styles.optionText }>{ text }</Text>
                </TouchableHighlight>
            </View>
        )
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

OptionItem.PropTypes = {
    data: PropTypes.object.isRequired, //选项数据
    selectedNum: PropTypes.number.isRequired, //选项中被选中的选项号
    text: PropTypes.string.isRequired, //选项的文本内容
    num: PropTypes.number.isRequired, //选项的编号
    val: PropTypes.number.isRequired, //选项的分值
    changeSelectedItem: PropTypes.func.isRequired, //选项点击事件
    setActiveOption: PropTypes.func.isRequired, //回调，重置被选中的选项号
}

