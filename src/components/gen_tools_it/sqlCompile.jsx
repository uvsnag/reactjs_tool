// this file is converted from javascript to reactjs so some code is not optimized
import React, { useEffect, useState } from "react";
import '../../common/style.css';
import { checkType, replaceArr, randomDate, formatDate, checkIncludesArr } from "../../common/common.js";
import _ from 'lodash';

const SqlCompile = () => {
    // const [result, setResult] = useState('');

    useEffect(() => {
        // document.getElementById('txtSql').textContent = `2020-03-03 09:41:27.057 DEBUG 10495 --- [io-50006-exec-1] c.f.t.d.m.M.countByExample               : ==>  Preparing: SELECT count(*) FROM MessageRecivers WHERE ((ReciverId = ? and ReadStats = ? and ReciverMessageFolder <> ?)) 
        // 2020-03-03 09:41:27.066 DEBUG 10495 --- [io-50006-exec-1] c.f.t.d.m.M.countByExample               : ==> Parameters: 58(Long), 0(Short), 1(Short)`

    }, []);

    const extractSqlQuery = (inputLog) => {

        inputLog = document.getElementById('txtSql').value;

        const startIndex = inputLog.indexOf("Preparing: ") + "Preparing: ".length;
        const sqlQuery = inputLog.substring(startIndex, inputLog.length);

        const paramLog = document.getElementById('txtparam').value.trim();
        let parameters = extractArguments(paramLog.trim());
        console.log(sqlQuery);
        console.log(paramLog);
        console.log(parameters);

        const replacedQuery = sqlQuery.split("?").map((_, index) => {
            if (index === 0) return _;
            return `'${parameters[index - 1]}'` + _;
        }).join("");
        console.log(replacedQuery)
        document.getElementById('txtresult').textContent = replacedQuery;
        // return replacedQuery;
    }

    const extractArguments = (inputLog) => {
        const startIndex = inputLog.indexOf("Parameters: ") + "Parameters: ".length;
        const str = inputLog.substring(startIndex, inputLog.length);

        const values = str.split(',').map((val) => val.trim().split(/\((.*?)\)/)[0]);
        let res = values.map((val) => isNaN(val) ? val : Number(val));
        console.log(res)

        return res;

    }



    return (
        <div>
            <div className="sql-body">
                <textarea class='area-sql' id='txtSql'></textarea><br />
                <textarea class='area-sql' id='txtparam'></textarea><br />
                <textarea class='area-sql' id='txtresult'></textarea>
            </div>
            <input type='submit' onClick={() => extractSqlQuery()} />
        </div>
    );
}

export default SqlCompile;