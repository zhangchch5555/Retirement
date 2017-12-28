import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';
import PropTypes from 'prop-types';

// 按钮组件
export default class PrevNextBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false
        }
    }

    onPrevClick(index) {
        this.props.callback(--index);
    }

    onNextClick(index,clickedFlag) {
        if(clickedFlag) {
            this.props.callback(++index);
        } else {
            alert('请选题');
        }
    }

    toResultpage(typeSum,navigation) {
        let sum = {};
        typeSum.forEach(function (index) {
            sum[index] = 0;
        });
        typeSum.forEach(function (item) {
            for(let index in typeSum[item]) {
                sum[item] = sum[item] + typeSum[item][index];
            }
        });
        navigation.navigate('PageB',{ sum: sum });
    }

    /**
     * 渲染 prev button,next button
     * @params num currentIndex 当前按钮号
     * @params num lastIndex 最后一个按钮的index
     * @params bool 当前按钮是否点击过FLag
     * @return render 渲染结果
     * */
    rendPrevNextBtn(currentIndex,lastIndex,clickedFlag,typeSum) {
        switch(currentIndex) {
            case 0:
                return (
                    <View style={ styles.btnBox }>
                        <Button
                            title="next"
                            color="#ffffff"
                            onPress={ () => this.onNextClick(currentIndex,clickedFlag) } />
                    </View>
                );
            case lastIndex:
                const navigation = this.props.navigation;
                return (
                    <View style={ styles.btnBox }>
                        <Button
                            title="prev"
                            color="#ffffff"
                            onPress={ () => this.onPrevClick(currentIndex) } />
                        <Button
                            title="测试"
                            color="#ffffff"
                            onPress={ () => this.toResultpage(typeSum,navigation) } />
                    </View>
                );
            default :
                return (
                    <View style={ styles.btnBox }>
                        <Button
                            title="prev"
                            color="#ffffff"
                            onPress={ () => this.onPrevClick(currentIndex) } />
                        <Button
                            color="#ffffff"
                            title="next"
                            onPress={ () => this.onNextClick(currentIndex,clickedFlag) } />
                    </View>
                );
        }
    }

    //绘制界面
    render() {
        let currentIndex = this.props.currentIndex;
        let lastIndex = this.props.btnSum-1;
        let clickedFlag = this.props.clickedFlag;
        let typeSum = this.props.typeSum;
        return this.rendPrevNextBtn(currentIndex,lastIndex,clickedFlag,typeSum);
    }
}

const styles = StyleSheet.create({
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
});

PrevNextBtn.propTypes = {
    currentIndex: PropTypes.number.isRequired, //当前按钮的index（从0开始）
    btnSum: PropTypes.number.isRequired, // 按钮总数量
    clickedFlag: PropTypes.bool, //当前题目是否已经回答过
    onPrevClick: PropTypes.func, //点击Prev事件
    onNextClick: PropTypes.func, //点击Next事件
    showModel: PropTypes.func, // show Model
    callback: PropTypes.func.isRequired //点击执行回调，更新数据
};