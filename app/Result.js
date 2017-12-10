import React, {Component} from "react";
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity
}from 'react-native';
import PropTypes from 'prop-types';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: true
        }
    }

    showModal() {
        this.setState({
            isModal:true
        })
    }

    onRequestClose() {
        this.setState({
            isModal:false
        })
    }

    render() {
        return (
            <Modal
                animationType='slide'           // 从底部滑入
                transparent={false}             // 不透明
                visible={this.state.isModal}    // 根据isModal决定是否显示
                onRequestClose={() => {this.onRequestClose()}}  // android必须实现
            >
                <View>
                    <TouchableOpacity
                        onPress={() => {{
                            this.setState({
                                isModal:false
                            })
                        }}}
                    >
                        <Text>关闭页面</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}


