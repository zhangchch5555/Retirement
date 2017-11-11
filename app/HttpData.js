class HttpData {
    /**
     * 获取规定范围内任意数的集合
     * @params questions int 抽题数量
     * @params dbSize int 题库数量
     * @return setRandomData set 抽题随机数
     * */
    static _generateRandom(questions,dbSize) {
        let randomData = new Set();
        if(questions <= dbSize) {
            for(;randomData.size < questions;) {
                randomData.add(Math.round(Math.random()*questions));
            }
        }
        return randomData;
    }

    /**
     * 根据随机数获取对应的题目数据，对题库数据加工
     * @params setRandomData set 随机数集合
     * @params entities json 所有题库数据
     * @return setQuestionsData array 加工后的题目数据
     * */
    static _setQuestionsData(randomData,entities) {
        let questionsDataTemp = [];
        for(let item of randomData.values()) {
            questionsDataTemp.push(entities[item]);
        }
        for(let index=0,len=questionsDataTemp.length;index < len;index++) {
            questionsDataTemp[index]['index'] = index;
        }
        return questionsDataTemp;
    }

    /**
     * 获取整形后的数据
     * @params question_num number 随机题目总数
     * @params url string api请求地址
     * @return object promise object
     * */
    static fetchApiListData(url,question_num) {
        return fetch(url)
            .then((response)=>response.json())
            .then(
                (responseJson)=> {
                    let entities = responseJson;
                    // 产生规定数目的随机数
                    let randomData = this._generateRandom(question_num,entities.length);
                    // 根据随机数获取对应的题目数据
                    let questionsData = this._setQuestionsData(randomData,entities);
                    return questionsData;
                }
            )
            .catch((error)=>console.error(error))
    }
}
export default HttpData;