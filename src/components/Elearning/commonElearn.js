import { isEqualStr, setCharAt } from "../../common/common.js";
import _ from 'lodash';

export const TYPE_CORRECT  = 0
export const TYPE_WRONG = 1
export const TYPE_HINT = 2

export  const arrStrCheckToStr = (arrStrCheck) =>{
    let strRes = ""
    let lastType = null
    for(let i=0; i<arrStrCheck.length; i++){
        let obj = arrStrCheck[i]
        if(_.isEqual(lastType, obj.type)){
            strRes += obj.char
        }else{
            if(lastType != null){
                strRes += "</span>"
            }
            if(_.isEqual(obj.type, TYPE_CORRECT)){
                strRes += "<span class ='ans-check-right'>"
            }else if(_.isEqual(obj.type, TYPE_WRONG)){
                strRes += "<span class ='ans-check-wrong'>"
            }else if(_.isEqual(obj.type, TYPE_HINT)){
                strRes += "<span class ='ans-check-hint'>"
            }
            strRes += obj.char
        }
    }
    strRes += "</span>"
    return strRes
}
export const validateArrStrCheck = (inputAns, answ) =>{
    let arrStrCheck = []
    let arrAns = answ.split('')
    let arrInput = inputAns.split('')

    for( let i=0; i<arrInput.length; i++){
        let objChar ={
            index: i,
            char:arrInput[i],
            type: ""
        }
        if(isEqualStr(arrAns[i], arrInput[i], true)){
            objChar.type =  TYPE_CORRECT
        }else{
            objChar.type =  TYPE_WRONG
        }
        if(arrInput[i]){
            arrStrCheck.push(objChar)
        }
    }
    if(arrAns.length > arrInput.length){
        arrStrCheck.push({
            index: arrStrCheck.length,
            char:'_',
            type: TYPE_WRONG
        })
    }
    return arrStrCheck;
}

export const genHintStrAns = (nameInput, answer) => {
    let inputAns = document.getElementById(nameInput).value;
    let arrStrCheck = validateArrStrCheck(inputAns, answer)
    for(let i=0; i< arrStrCheck.length; i++){
        if(_.isEqual(arrStrCheck[i].type, TYPE_WRONG)){
            let charCorrect = answer.substring(i, i+1)
            arrStrCheck[i].type = TYPE_HINT;
            arrStrCheck[i].char = charCorrect;
            break;
        }
    }
    return arrStrCheck;
}
export const autoCorrectLetter = (nameInput, answer) => {
    let inputAns = document.getElementById(nameInput).value;
    let arrStrCheck = validateArrStrCheck(inputAns, answer)
    for(let i=0; i< arrStrCheck.length; i++){
        if(_.isEqual(arrStrCheck[i].type, TYPE_WRONG)){
            inputAns = setCharAt(inputAns, i, answer.substring(i, i+1));
            document.getElementById(nameInput).value = inputAns;
            break;
        }
    }
    return arrStrCheck;
}