// this is a tools for studying english
import React, { useEffect, useState, useRef  } from "react";
import '../../common/style.css';
import _ from 'lodash';
import '../../common/styleTemplate.css';
import { FaRegFrown, FaRegSmile, FaVolumeUp } from 'react-icons/fa';

const PractWords = (props) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [errorMs, setErrorMs] = useState("");
    const [showAns, setShowAns] = useState('');
    const [lastAnsw, setLastAnsw] = useState('');
    const [mode, setMode] = useState(1);
    const [arrLineTemp, setArrLineTemp] = useState([]);
    const inputAns = useRef(null)

    useEffect(() => {
        console.log("useEffect []");
        
    }, []);
    useEffect(() => {

        setArrLineTemp(_.cloneDeep(props.items));
        console.log("useEffect [props.items]");
    }, [props.items]);

    useEffect(() => {
        if (props.isLoadQuestion) {
            onChangeQuestion();
        }
        console.log("useEffect [props.isLoadQuestion]");

        inputAns.current.focus()
        // eslint-disable-next-line
    }, [props.isLoadQuestion]);
   

    const onChangeQuestion = () => {
        
        if (!_.isEmpty(props.items)) {
            let item = null;
            let arrTemp = _.isEmpty(arrLineTemp) ? _.cloneDeep(props.items) : _.cloneDeep(arrLineTemp);
            if (props.oderRandom === 'random') {
                let index = Math.floor(Math.random() * arrTemp.length);

                item = arrTemp[index];
                arrTemp.splice(index, 1);

            } else {
                item = arrTemp[0];
                arrTemp.shift();
            }
            setArrLineTemp(arrTemp);

            if (_.isEmpty(item.customDefine)) {
                setQuestion(item.vi);
            } else {
                setQuestion(item.customDefine);
            }
            setAnswer(item.eng);
            setShowAns("");


        }
    };
    const onCheck = () => {
        var ans = document.getElementById('answer').value;
        if (!_.isNull(ans) && !_.isNull(answer)) {
            var answ = answer.replaceAll('.', '');
            if (ans.trim().toUpperCase() === answ.toUpperCase().trim()) {
                onChangeQuestion();
                setErrorMs('correct!');
                document.getElementById('answer').value = "";
                setLastAnsw(answer);
                if(mode === 1){
                    props.speakText(answer, true);
                }
            } else {
                setErrorMs('wrong!');
            }
        }
    };
    const handleKeyDown = (e) => {
        console.log(e.key)
        console.log(e.nativeEvent.code)
        if (e.key === 'Enter') {
            onCheck();
        }
        if (e.nativeEvent.code === 'ShiftLeft') {
            onShow();
        }
        if (e.nativeEvent.code === 'ControlLeft') {
            setMode(mode===0?1:0);
        }
        if (e.nativeEvent.code === 'ControlRight') {
            props.speakText(lastAnsw, true);
        }
        if (e.nativeEvent.code === 'ShiftRight') {
            props.speakText(answer, true);
        }
    }
    const onShow = () => {
        if (_.isEmpty(showAns)) {
            setShowAns(answer);
        } else {
            setShowAns("");
        }
        
    }

    return (
        <div className='prac'>
            <div>{question}</div><br />
            <input type="text" id='answer' ref={inputAns} onKeyDown={e => handleKeyDown(e)} /><br />
            <div className='msg'>{errorMs === 'wrong!' ? <FaRegFrown /> : <FaRegSmile />}</div>
            <input className='button-33' type='submit' value="Check" id='btnSubmit' onClick={() => onCheck()} />
            <input className='button-12' type='submit' value="Show Ans" id='btnShowAns' onClick={() => onShow()} />
            <div>{showAns}{_.isEmpty(showAns) ? <div></div> : <FaVolumeUp className='iconSound' onClick={() => props.speakText(showAns, true)} />}</div>
            <div>{_.isEmpty(lastAnsw) ? <div></div> : <div>Last : {lastAnsw}<FaVolumeUp className='iconSound' onClick={() => props.speakText(lastAnsw, true)} /></div>} </div>
            <br/>
            <div><button className='button-12' onClick={() => setMode(mode===0?1:0)}>{mode}</button></div>
        </div>
    );
}

export default PractWords;