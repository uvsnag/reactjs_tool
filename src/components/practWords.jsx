// this is a tools for studying english
import React, { useEffect, useState } from "react";
import '../common/style.css';
import _ from 'lodash';
import '../common/styleTemplate.css';
import { FaRegFrown, FaRegSmile } from 'react-icons/fa';
const PractWords = (props) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [errorMs, setErrorMs] = useState("");
    const [indexOrder, setIndexOrder] = useState(0);
    const [showAns, setShowAns] = useState('');

    useEffect(() => {
        onChangeQuestion();
    }, []);


    const onChangeQuestion = () => {
        if(!_.isEmpty(props.items)){
            var item =null;
            if(props.oderRandom ==='random'){
                item = props.items[Math.floor(Math.random()*props.items.length)];
            }else{
                setIndexOrder(indexOrder+1);
                item= props.items[indexOrder];

            }
            if(_.isEmpty(item.customDefine)){
                setQuestion(item.vi);
            }else{
                setQuestion(item.customDefine);
            }
            setAnswer(item.eng);
            setShowAns("");
        }
    };
    const onCheck = () => {
        var ans=document.getElementById('answer').value ;
        if(!_.isNull(ans)&&!_.isNull(answer)){
            if(ans.trim().toUpperCase()===answer.toUpperCase()){
                onChangeQuestion();
                setErrorMs('correct!');
                document.getElementById('answer').value='';
            }else{
                setErrorMs('wrong!');
            }
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onCheck();
        }
    }
    const onShow = () => {
        if(_.isEmpty(showAns)){
            setShowAns(answer);
        }else{
            setShowAns("");
        }
    }

    return (
        <div className ='prac'>
            <div>{question}</div><br/>
            <input type="text" id='answer' onKeyDown={e => handleKeyDown(e)}/><br />
            <div class='msg'>{errorMs==='wrong!'?<FaRegFrown/>:<FaRegSmile/>}</div>
            <input className='button-33' type='submit' value="Check" id='btnSubmit' onClick={() => onCheck()} />
            <input className='button-12' type='submit' value="Show Ans" id='btnShowAns' onClick={() => onShow()} />
            <div>{showAns}</div>
        </div>
    );
}

export default PractWords;