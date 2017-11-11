import React, {Component} from "react";
import {
    StyleSheet,
    FlatList,
}from 'react-native';
import PropTypes from 'prop-types';
import OptionItem from "./OptionItem";

// 选项集合组件
export default class OptionsList extends Component {
    constructor(props) {
        super(props);
        this.setActiveOption = this.setActiveOption.bind(this);
    }

    /**
     * 响应选项组件点击事件，回调，实现重新渲染
     * @params num number 被选中的选项的编号
     * */
    setActiveOption(num) {
        this.props.callbackResetState(num);
    }

    //绘制界面
    render() {
        let clickedNum = this.props.clickedNum;
        let options = this.props.options;
        return (
            <FlatList
                data={ options }
                updateFlag={ clickedNum }
                renderItem={ ({item}) => <OptionItem selectedNum={ clickedNum } data={ item }  setActiveOption={ this.setActiveOption } /> }
            />
        )
    }
}

OptionsList.PropTypes = {
    clickedNum: PropTypes.number.isRequired, //选项集合中被选中过的选项号
    options: PropTypes.object.isRequired, //当前题对应的所有的选项集合
    setActiveOption: PropTypes.func.isRequired, //响应选项组件点击事件，回调
    callbackResetState: PropTypes.func.isRequired //回调，重新渲染各个选项组件
}