import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet
}from 'react-native';
import PropTypes from 'prop-types';
import QuestionsList from "./QuestionsList";
import OptionsList from "./OptionsList";
import PrevNextBtn from "./PrevNextBtn";
import HttpData from "./HttpData";

// 规定的抽题数量
//const QUESTION_NUM = 4;

// 存储抽中的题库数据
var questionsData = [];
// 题库数量初始化
var questionsSum = 0;

export default class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            currentData: null,
            isModal: true
        };
        this.setCurrentData = this.setCurrentData.bind(this);
        this.setSelectedNum = this.setSelectedNum.bind(this);
    }

    /**
     * 记录已经选择的题目的选项号
     * @params num number 选项号
     * @return setQuestionsData array 当前题目数据
     * */
    setSelectedNum(num) {
        let index = this.state.currentIndex;
        let typeSum = new Set();
        questionsData.forEach(function (index,item) {
            typeSum.add(questionsData[index]['type']);
        });
        console.log(typeSum);
        typeSum.forEach(function (index,item) {
            typeSum[item]++;
        });
        questionsData[index]['clickedFlag'] = true;
        questionsData[index]['clickedNum'] = num;
        this.setCurrentData(index);
    }

    /**
     * state数据设置
     * params index int 当前题号
     * */
    setCurrentData(index) {
        this.setState({
            currentIndex: index,
            currentData: questionsData[index]
        });
    }

    //get api data after mount
    componentDidMount() {
        const url = 'https://private-b4dc1-zhang2.apiary-mock.com/questions';
        HttpData.fetchApiListData(url).then((result) => {
            questionsData = result;
            questionsSum = questionsData.length;
            this.setCurrentData(this.state.currentIndex);
        },(e) => {
            // error
        });
    }

    //render
    render() {
        let data = this.state.currentData;
        if (data) {
            return this.renderItem(data);
        }
        return (
            <Text style={{textAlign: "center", fontSize: 16, padding: 20}}>加载中...</Text>
        )
    }

    //绘制展示数据的界面
    renderItem(data) {
        let clickedFlag = data['clickedFlag'];
        let clickedNum = data['clickedNum'];
        return (
            <View style={ styles.container }>
                <Text style={ styles.currentNum }>{ this.state.currentIndex+1 }/{ questionsSum }</Text>
                <View style={ styles.contents }>
                    <Text style={ styles.title }>{ data.title }</Text>
                    <QuestionsList style={ styles.questions } questions={ data.quetions } />
                    <OptionsList style={ styles.options } clickedNum={ clickedNum } options={ data.options } callbackResetState={ this.setSelectedNum } />
                    <PrevNextBtn currentIndex={ this.state.currentIndex } btnSum={ questionsSum } clickedFlag={ clickedFlag } callback={ this.setCurrentData } />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3bb1eb",
        flex: 1
    },
    currentNum: {
        position: 'absolute',
        right: 10,
        top: 30
    },
    contents: {
        flexDirection: 'column',
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: "center"
    },
    title: {
        textAlign: 'center',
        padding: 10,
        fontSize: 30,
        margin: 10
    },
    options: {
        flexDirection: "column"
    }
})

StartUp.PropTypes = {
    currentIndex: PropTypes.number.isRequired, //当前题的index（从0开始）
    currentData: PropTypes.number.isRequired, //当前题对应的数据
    clickedFlag: PropTypes.bool, //当前题目是否已经回答过
    clickedNum: PropTypes.number, //当前题目已经回答过的前提下，记录被选择的选项号
    setSelectedNum: PropTypes.func.isRequired, //响应点击事件，设置选择的选项号
    setCurrentData: PropTypes.func.isRequired //更新当前题目数据
}