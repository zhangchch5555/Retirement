import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Button
}from 'react-native';
import PropTypes from 'prop-types';

// 按钮组件
export default class PrevNextBtn extends Component {
    constructor(props) {
        super(props);
    }

    onPrevClick(index) {
        let prevIndex = index-1;
        this.props.callback(prevIndex);
    }

    onNextClick(index,clickedFlag) {
        if(clickedFlag >=0) {
            let nextIndex = index+1;
            this.props.callback(nextIndex);
        } else {
            alert('请选题');
        }
    }

    /**
     * 渲染 prev button,next button
     * @params num currentIndex 当前按钮号
     * @params num lastIndex 按钮数量
     * @params num 是否点击过FLag
     * @return render 渲染结果
     * */
    rendPrevNextBtn(currentIndex,lastIndex,clickedFlag) {
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
                return (
                    <View style={ styles.btnBox }>
                        <Button
                            title="prev"
                            color="#ffffff"
                            onPress={ () => this.onPrevClick(currentIndex) } />
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
        let lastIndex = this.props.lastIndex-1;
        let clickedFlag = this.props.clickedFlag;
        return this.rendPrevNextBtn(currentIndex,lastIndex,clickedFlag);
    }
}

const styles = StyleSheet.create({
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
})

PrevNextBtn.propTypes = {
    currentIndex: PropTypes.number.isRequired, //当前按钮号
    lastIndex: PropTypes.number.isRequired, // 按钮数量
    clickedFlag: PropTypes.func.isRequired, //是否点击过FLag
    onPrevClick: PropTypes.func.isRequired, //点击Prev事件
    onNextClick: PropTypes.func.isRequired, //点击Next事件
    callback: PropTypes.func.isRequired //点击执行回调，更新数据
}