// this file is converted from javascript to reactjs so some code is not optimized
import React, { useEffect, useState } from "react";
import '../../common/style.css';
import { checkType, replaceArr, randomDate, formatDate, checkIncludesArr } from "../../common/common.js";
import _ from 'lodash';

const ERROR = 'ERROR';
const SqlCompile = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // document.getElementById('txtSql').textContent = `2020-03-03 09:41:27.057 DEBUG 10495 --- [io-50006-exec-1] c.f.t.d.m.M.countByExample               : ==>  Preparing: SELECT count(*) FROM MessageRecivers WHERE ((ReciverId = ? and ReadStats = ? and ReciverMessageFolder <> ?)) 
        // 2020-03-03 09:41:27.066 DEBUG 10495 --- [io-50006-exec-1] c.f.t.d.m.M.countByExample               : ==> Parameters: 58(Long), 0(Short), 1(Short)`

    }, []);

    const extractSqlQuery = (inputLog) => {
        setMessage('');
        inputLog = document.getElementById('txtSql').value.trim();
        const arrStatement = inputLog.split('\n');
        if(!arrStatement || arrStatement.length != 2){
            setMessage('invalid statement');
            return;
        }

        let sqlStatement = arrStatement[0];
        let paramStatement = arrStatement[1];

        const SPLIT_SQL_STATEMENT = 'Preparing: ';
        const SPLIT_PARAM_STATEMENT = 'Parameters: ';


         sqlStatement = getStatementBaseOnSplitMark(sqlStatement, SPLIT_SQL_STATEMENT);
         paramStatement = getStatementBaseOnSplitMark(paramStatement, SPLIT_PARAM_STATEMENT);

        let parametersArr = extractArguments(paramStatement);
        if(ERROR == parametersArr){
            return;
        }
        console.log(sqlStatement);
        console.log(paramStatement);
        console.log(parametersArr);

        const replacedQuery = sqlStatement.split("?").map((_, index) => {
            if (index === 0) return _;
            return `'${parametersArr[index - 1]}'` + _;
        }).join("");
        console.log(replacedQuery)
        document.getElementById('txtresult').textContent = replacedQuery;
        onCoppyOutput();
    }

    const extractArguments = (inputLog) => {
        let arrStrReplace = ["(String)"]

        // const values = inputLog.split(',').map((val) => val.trim().split(/\((.*?)\)/)[0]);
        // let res = values.map((val) => isNaN(val) ? val : Number(val));

        let res = inputLog.split(',').map((val) =>{
            if (!checkIncludesArr(val, arrStrReplace, true)) {
                setMessage('type data is not defined:' + val);
                return ERROR;
            }

            return replaceArr(val.trim(), arrStrReplace, "");
        });
        console.log(res)

        return res;

    }

    const getStatementBaseOnSplitMark = (statement, splitMark) =>{
        const startIndex = statement.indexOf(splitMark) + splitMark.length;
        return statement.substring(startIndex, statement.length).trim();
    }
    const onCoppyOutput = () =>{
        navigator.clipboard.writeText(document.getElementById('txtresult').value);
    };


    return (
        <div>
            <div className="sql-body">
                <div class='message-sql-compile'>{message}</div>
                <textarea class='area-sql' id='txtSql'></textarea><br />
                <input type='submit' value = 'Submit' onClick={() => extractSqlQuery()} />
                {/* <input type='submit' value="Copy" onClick={() => onCoppyOutput()}/> */}
                <textarea class='area-sql' id='txtresult'></textarea>
            </div>
        </div>
    );
}

export default SqlCompile;