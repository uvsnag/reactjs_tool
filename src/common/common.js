
export const randomDate=(start, end)=> {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export const formatDate=(date)=> {
    var formatDate = document.getElementById("formatDate").value;
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    switch(formatDate){
        case 'yyyy-mm-dd':
            return `${ye}-${mo}-${da}`;
        case 'yyyy/mm/dd':
            return `${ye}/${mo}/${da}`;
        case 'yyyymmdd':
            return `${ye}${mo}${da}`;
        case 'dd-mm-yyyy':
            return `${da}-${mo}-${ye}`;
        case 'dd/mm/yyyy':
            return `${da}/${mo}/${ye}`;
        case 'ddmmyyyy':
            return `${da}${mo}${ye}`;
         default:
                break;
    }
    return `${ye}${formatDate}${mo}${formatDate}${da}`;
}
export const checkType=(line, arrayType) =>{
    var result = false;
    arrayType.forEach(type=>{
        if (line.includes(type)) {
            result=true;
        }
    });
    return result;
}
export const replaceArr =(line, arrayType, valRpl) => {
    for(let i=0; i<arrayType.length; i++){
       var type = arrayType[i];
        line = line.replaceAll(`${type}`, valRpl);
    }

    return line;
}
export const checkIncludesArr =(line, arrayStr, sensitive) => {
    if(!sensitive){
        line= line.toUpperCase();
    }
    for(let i=0; i<arrayStr.length; i++){
       var  str= arrayStr[i];
       if(line.includes(str)){
        return true;
       }
    }

    return false;
}