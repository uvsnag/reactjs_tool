// this file is converted from javascript to reactjs so some code is not optimized
import React, { useEffect, useState } from "react";
import '../common/style.css';
import {checkType, replaceArr, randomDate, formatDate, checkIncludesArr} from "../common/common.js";
import _ from 'lodash';

const SqlProcess = () => {

    const SPLIT_LINE_INPUT_FIELD = '^';
    // const INDENT_FIELD_NAME = '\"';
    const INDENT_BEGIN_FIELD_LENGTH = '(';
    const INDENT_FIELD_LENGTH_END = ')';
    const INDENT_COMMA = ',';
    const INDENT_SPACE = ' ';
    const DATA_NULL = 'NULL';
    const CREATE_TABLE = 'CREATE TABLE';

    const ARR_NOT_FIELDNAME=['PRIMARY ', CREATE_TABLE+' ', 'ENGINE=','ENGINE =', 'CHARSET =', 'CHARSET='];

    const NUMBER_TYPE = [' NUMBER', ' NUMERIC', ' LONG', ' INT', ' INTEGER'];
    const DATE_TYPE = [' DATE', ' TIMESTAMP'];
    const NOT_NULL = ['NOT NULL'];

    const [defaultValueInt, setDefaultValueInt] = useState(9);
    const [lineNumber, setLineNumber] = useState(1);
    const [dataChar, setDataChar] = useState('|');
    const [tableName, setTableName] = useState('');

    useEffect(() => {
        document.getElementById('txtField').textContent = '"FFSFD" NUMBER(3,0|fgfgfgd|),';

    },[]);

   
    const onProcess =()=>{
        var chkDeleteOldData = document.getElementsByClassName('chkDeleteOldData');
        var sqlResult = '';
        var txtField = document.getElementById('txtField').value;
        // var lineNumber = lineNumber;
        var cmbType = document.getElementById("cmbType").value;

        if (cmbType === 'ddl') {
            txtField = txtField.replaceAll('\n', SPLIT_LINE_INPUT_FIELD)
            var lineInputs = txtField.split(SPLIT_LINE_INPUT_FIELD);
            for (var i = 1; i <= lineNumber; i++) {
                sqlResult += genData(lineInputs) + '\n';
            }
            if (chkDeleteOldData[0].checked) {
                document.getElementById('output').value = sqlResult;
            } else {
                document.getElementById('output').value += '\n' + sqlResult;
            }
        }
    }
    const checkLineIsField =(trLine)=>{
        if(trLine.length===0 || checkIncludesArr(trLine, ARR_NOT_FIELDNAME, false)){
            return false;
        }
        return true;
    }

    function genData(lineInputs) {

        var tableNameDefault=null;
        if(!_.isEmpty(lineInputs)){
            //getname
            if(checkIncludesArr(lineInputs[0], [CREATE_TABLE,], false)){
                var arrayRepl=[CREATE_TABLE, '('];
                tableNameDefault = replaceArr(lineInputs[0], arrayRepl, '').trim();
            }
        }else{
            return;
        }
        var flagComa = false;
        var sqlResult = 'INSERT INTO ' + ((_.isNull(tableName) || tableName.length === 0)
            ? tableNameDefault : tableName) + '(';
        for (var i = 0; i < lineInputs.length; i++) {
            var trLine1 = lineInputs[i].trim();
            if (checkLineIsField(trLine1)) {
                var fieldName = trLine1.substring(0, trLine1.indexOf(INDENT_SPACE));
                // fieldName = replaceArr(fieldName, [INDENT_FIELD_NAME], '');
                if (flagComa === true) {
                    sqlResult += ', ';
                }
                flagComa = true
                sqlResult += fieldName;
            }

        }
        sqlResult += ') VALUES (';
        flagComa = false;
        for (var j = 0; j < lineInputs.length; j++) {
            var trLine = lineInputs[j].trim().toUpperCase();
            var typeNumber = false;
            // var notNull = false;
            if (checkLineIsField(trLine)) {

                var indentComData = dataChar;
                var dataStr = '';
                var lengthData = 0;
                if (trLine.includes(indentComData)) {
                    var orgLine = lineInputs[j].trim();
                    dataStr = orgLine.substring(orgLine.indexOf(indentComData) + 1, orgLine.lastIndexOf(indentComData));
                } else {
                    if (checkType(trLine, NOT_NULL)) {
                        // notNull = true;
                        trLine = replaceArr(trLine, NOT_NULL, '');
                    }
                    trLine = trLine.trim();
                    if (trLine.substring(trLine.length - 1, trLine.length) !== INDENT_COMMA) {
                        trLine = trLine + INDENT_COMMA;
                    }
                    var randomTemplateStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    if (checkType(trLine, NUMBER_TYPE)) {
                        randomTemplateStr = '123456789';
                        typeNumber = true;
                        lengthData = defaultValueInt;
                    }
                    if (checkType(trLine, DATE_TYPE)) {
                        dataStr = formatDate(randomDate(new Date(2012, 0, 1), new Date()));
                    } else {
                        if (trLine.split(",").length - 1 === 2) {
                            dataStr = genNuberWComman(trLine, randomTemplateStr);
                        } else {

                            if (lengthData === 0) {
                                trLine = trLine.trim();
                                lengthData = trLine.substring(trLine.lastIndexOf(INDENT_BEGIN_FIELD_LENGTH) + 1, trLine.indexOf(INDENT_FIELD_LENGTH_END));
                            }
                            dataStr = randomStr(lengthData, randomTemplateStr);
                        }
                    }
                    var numOfCharater = document.getElementById("numOfCharater").value;
                    if (numOfCharater === DATA_NULL) {
                        dataStr = DATA_NULL;
                    }

                }
                if (flagComa === true) {
                    sqlResult += ', ';
                }
                flagComa = true
                if (dataStr.toUpperCase() === DATA_NULL) {
                    typeNumber = true;
                }
                sqlResult += typeNumber ? dataStr : '\'' + dataStr + '\'';

            }

        }
        sqlResult += ');';

        return sqlResult;
    }

    function genNuberWComman(trLine, randomTemplateStr) {
        var dataStr = '';
        var firstNumber = trLine.substring(trLine.lastIndexOf(INDENT_BEGIN_FIELD_LENGTH) + 1, trLine.indexOf(INDENT_COMMA));
        var secondNumber = trLine.substring(trLine.indexOf(INDENT_COMMA) + 1, trLine.indexOf(INDENT_FIELD_LENGTH_END));
        var data1 = randomStr(firstNumber - secondNumber - 1, randomTemplateStr);
        var data2 = randomStr(secondNumber, randomTemplateStr);

        dataStr = data2 !== 0 ? data1 + '.' + data2 : data1;

        var numOfCharater = document.getElementById("numOfCharater").value;
        if (numOfCharater === '1') {
            dataStr = data1;
        }
        if (numOfCharater === 'mid' && data1 > 1) {
            dataStr = dataStr.substring(1, dataStr.length);
        }
        return dataStr;
    }
    function randomStr(lengthData, randomTemplateStr) {
        var dataStr = '';
        var numOfCharater = document.getElementById("numOfCharater").value;
        if (numOfCharater === 'mid' && numOfCharater > 1) {
            lengthData = lengthData / 2;
        }
        if (numOfCharater === '1') {
            lengthData = 1;
        }

        for (var i = 0; i < lengthData; i++) {
            dataStr += randomTemplateStr.charAt(Math.floor(Math.random() * randomTemplateStr.length));
        }
        return dataStr;
    }
    const onClearOuput = () =>{
        document.getElementById('output').value = '';
    };
    const onClearField = () =>{
        document.getElementById('txtField').value = '';
    };
    async function pasteData() {
        document.getElementById('txtField').value = await navigator.clipboard.readText();
    };
    const onCoppyOutput = () =>{
        navigator.clipboard.writeText(document.getElementById('output').value);
    };
    const handleChange = (value, typeName) => {

        switch (typeName) {
            case 'defaultValueInt':
                setDefaultValueInt(value);
                break;
            case 'lineNumber':
                setLineNumber(value);
                break;
            case 'dataChar':
                setDataChar(value);
                break;
            case 'tableName':
                setTableName(value);
                break;
            default:
                break;
        }
    }



    return (
        <div>
            <div className='option block'>
                <div className='option-left'>
                    <b>Field:</b>
                    <textarea id='txtField'></textarea>
                    <br />
                    <b>type:</b>
                    <select name="cmbType" id="cmbType">
                        <option value="ddl">ddl</option>
                        {/* <!-- <option value="excel">excel</option> --> */}
                    </select>
                    <input type="text"  value={dataChar}
                                onChange={(e) => {
                                    handleChange(e.target.value, "dataChar")
                                }} />
                    <input type='submit' value="Clear" id='btnCleanField' onClick={() => onClearField()}/>
                    <input type='submit' value="Paste" id='btnPasteField' onClick={() => pasteData()} />
                </div>
                <div className='option-right'>
                    <input type="text"  id="txtTableName"  value={tableName}
                                onChange={(e) => {
                                    handleChange(e.target.value, "tableName")
                                }} />
                    <br />
                    <b>Default Value Int:</b><br />
                    <input type="text" value={defaultValueInt}
                                onChange={(e) => {
                                    handleChange(e.target.value, "defaultValueInt")
                                }} />
                    <br /> <br />
                    <div>
                        <select name="cmbSql" id="cmbSql">
                            <option value="insert">insert</option>
                        </select>

                    </div>
                    <b>Line number:</b>
                    <br />
                    <input type='number' value={lineNumber}
                                onChange={(e) => {
                                    handleChange(e.target.value, "lineNumber")
                                }} />
                    <br /> <br />
                    <div>
                        <select name="numOfCharater" id="numOfCharater">
                            <option value="max">max</option>
                            <option value="mid">mid</option>
                            <option value="1">1</option>
                            <option value="NULL">NULL</option>
                        </select>
                    </div> <br />
                    <div>
                        <select name="formatDate" id="formatDate">
                            <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                            <option value="yyyy/mm/dd">yyyy/mm/dd</option>
                            <option value="yyyymmdd">yyyymmdd</option>
                            <option value="dd-mm-yyyy">dd-mm-yyyy</option>
                            <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                            <option value="ddmmyyyy">ddmmyyyy</option>
                        </select>
                    </div> <br />
                    <input type='submit' value="exc" id='btnExecute'   onClick={() => onProcess()}/>
                </div>
            </div>

            <div className='block '>
                <input type='submit' value="Clear" id='btnClean' onClick={() => onClearOuput()}/>
                <input className='chkDeleteOldData' type='checkbox' />
                <input type='submit' value="Copy" id='btnCoppy' onClick={() => onCoppyOutput()} />
                {/* <!-- <p>result:</p> --> */}
                <textarea id='output'></textarea>
                <br /><br /><br />
                <textarea id='tmp'></textarea>
            </div>

        </div>
    );
}

export default SqlProcess;