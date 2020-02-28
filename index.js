class Truncgil {
    constructor(value=null){
        this.type = typeof value;
        this.val = value;
        this.startTime = new Date();
        if(Array.isArray(value)){
            this.last = value[value.length - 1];
            this.first = value[0];
        }
        else{
            this.last = undefined;
            this.first = undefined;
        }
    }
}

class tr extends Truncgil{

};



//type: element
tr.prototype.near = function(selector){
    return this.parent().find('>'+selector);
}


//type: string, number, array, object, boolean, null
tr.prototype.replaceAll = function(search, replace){
    let val = this.val;
    let type = this.type;
    if(type == 'string'){
        let regExp = new RegExp(search, 'g');
        return val.replace(regExp, replace);
    } else if(type == 'number'){
        val = String(val);
        search = String(search);
        replace = String(replace);
        let regExp = new RegExp(search, 'g');
        let res = val.replace(regExp, replace);
        if(parseInt(res) == res)
            return parseInt(res);
        else if( parseFloat(res) == res )
            return parseFloat(res);
        else
            return res;
    } else if(Array.isArray(val)){
        let res = [];
        for(let  i = 0; i < val.length; i++){
            let curr = new tr(val[i]);
            res.push(curr.replaceAll(search, replace));
        }
        return res;
    } else if(typeof val === 'object' && val !== null){
        let res = {};
        for(let key in val){
            let curr = new tr(val[key]);
            res[key] = curr.replaceAll(search, replace);
        }
        return res;
    } else if(typeof val == 'boolean'){
        let res;
        if(typeof search == 'boolean')
            res = replace;
        else
            res = val;
        return res;
    } else if(val === null){
        let res;
        if(search === null)
             res = replace;
        else
            res = null;
        return res;
    } else{
        return val;
    }
}

//type: everything
tr.prototype.typeof = function(){
    let type = this.type;
    let val = this.val;
    if(type == 'string' || type=="boolean" || type === undefined){
        return type;
    } else if(type == 'number'){
        if(parseInt(val) === val)
            return "integer";
        else
            return "float";
    } else if(Array.isArray(val)){
        return "array";
    } else if(typeof val === 'object' && val !== null){
        return "object";
    } else if(val === null){
        return "null";
    } else{
        return val;
    }
}

//type: everything
tr.prototype.typeofBlank = function(){
    let type = this.type;
    let val = this.val;
    if(type == 'string' || type=="boolean" || type === undefined){
        return '';
    } else if(type == 'number'){
        if(parseInt(val) === val)
            return 0;
        else
            return 0.0;
    } else if(Array.isArray(val)){
        return [];
    } else if(typeof val === 'object' && val !== null){
        return {};
    } else if(val === null){
        return null;
    } else{
        return val;
    }
}


//void
tr.prototype.printExecutionTime = function(text = 'Execution time:'){
    let end = new Date() - this.startTime;
    console.info(text+' %dms', end);
}

//void
tr.prototype.sleep = function(ms) {           // Only in async functions
    return new Promise(resolve => setTimeout(resolve, ms));
}

//type: everything
tr.prototype.parseAll = function(returnType=null){
    let value = this.val;
    let res = {
        integer: parseInt(value),
        int: parseInt(value),
        float: parseFloat(value),
        string: String(value),
        str: String(value),
        array: [value],
        arr: [value],
        arrayInteger: [parseInt(value)],
        arrayFloat: [parseFloat(value)],
        arrayString: [String(value)],
        object: {value},
        obj: {value}
    }
    if(returnType !== null)
        return res[returnType];
    else
        return res;
}

tr.prototype.reverse = function(){
    let value = this.val;
    if(typeof value == "string"){
        value = value.split('');
        value = value.reverse();
        value = value.join('');
    } else if(typeof value == "number"){
        value = String(value);
        value = value.split('');
        value = value.reverse();
        value = parseInt(value.join(''));
    } else if(typeof value == "boolean"){
        if(value)
            value = false;
        else
            value = true;
    } else if(typeof value == "object"){
        if(value === null)
            value = value;
        else if(Array.isArray(value))
            value = value.reverse();
        else
            value = value;
    } else
        return value;

    return value;
}

//type: string

//type: string
tr.prototype.slugify = function(){
    let text = this.val;

    var trMap = {
        'çÇ': 'c',
        'ğĞ': 'g',
        'şŞ': 's',
        'üÜ': 'u',
        'ıİ': 'i',
        'öÖ': 'o'
    };
    for (var key in trMap) {
        text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
    }
    return text.replace(/[^-a-zA-Z0-9\s]+/ig, '')
        .replace(/\s/gi, "-") 
        .replace(/[-]+/gi, "-")
        .toLowerCase();
}


//type: array
tr.prototype.pushIfNotExist = function(value){
    let array = this.val;
    if (!array.inArray(value)) {
        array.push(value);
    }
    return array;
}

//type: array
tr.prototype.getUnique = function(){
    let array = this.val;
    var final = [];
    array.map((e, i) => !final.includes(e) && final.push(e))
    return final;
}

//type: string
tr.prototype.wordCount = function(){
    let sentence = this.val;
    sentence = sentence.split(' ');
    return sentence.length;
}

//type: object
tr.prototype.toArray = function(){
    let typ = _(this).typeofBlank();
    if(typ === {}){
        var obj = this.val;
        let arr = [];
        let keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++){
            arr[keys[i]] = obj[keys[i]];
        }
        return arr;
    } else if(typ === ''){
        let val = this.val;
        return val.split('');
    } else if(typ === 0){
        let val = _(this).parseAll('string');
        return _(val).toArray();
    }
}

//type: array
tr.prototype.toObject = function(){
    let arr = this.val;
    let res = {};
    let keys = Object.keys(arr);
    for(let i = 0; i < keys.length; i++){
        res[keys[i]] = arr[keys[i]];
    }
    return res;
}


//type: everything
tr.prototype.log = function(css='font-size:20px; background-color: #f00; color: #fff;'){
    console.log('%c' + this.val, css);
}


var _ = function(val){
    return new tr(val);
}

if (typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports){
        module.exports = _;
    }
}