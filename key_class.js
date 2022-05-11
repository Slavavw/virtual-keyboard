
//import  * as constant from "constant.js";
//import BinarySearchTree from "binaryTreeSearch.js";

class KEYBOARD {
    constructor(lang,caps ){
        this.language = lang;       
        this.caps = caps;        
        this.array_Btn = [[],[],[],[],[]];
        this.flag = false;
    }
    DrawKey(key, del = false){ let row = document.querySelector(`.row${CURENT_INDEX+1}`)
        if (/backspace/i.test(key) ) {
            if (this.array_Btn[CURENT_INDEX].length ) {
                //row.children[this.array_Btn[CURENT_INDEX].length-1].remove(); 
                row.querySelector(`button[name=${key.name}]`).remove();
            }
        }
        else{ 
            //row.append(this.array_Btn[CURENT_INDEX][this.array_Btn[CURENT_INDEX].length-1]);
            row.append(key);
        }
    }
    find( template='' ){
        return [...this.array_Btn].flat(1).find(el=>el.hasOwnProperty(template)); 
    }
    getSize(){
        return getCurrentKeyboard().array_Btn.map( el=>el.length).reduce((x,y)=>x+y);
    }
    getRowCol(key){ let row =-1, col =-1;
        for (let i = 0; i<5; i ++){
            for ( let j=0; j<this.array_Btn[i].length; j++ ){
                if ( this.array_Btn[i][j].name === key.name) { row =i; col = j; break; }
            }
            if ( row>=0) break;
        }
        return {row,col};
    }
}
var keyEngTab = new KEYBOARD(LANG_ENG,true), 
keyEng = new KEYBOARD(LANG_ENG,false), 
keyRusTab = new KEYBOARD(LANG_RUS,true), 
keyRus =new KEYBOARD(LANG_RUS,false);
function getCurrentKeyboard(){
    return (document.querySelector('.lang').value === LANG_ENG)?
     ((document.querySelector('input[type="radio"]:checked').value ==='true' )?keyEngTab:keyEng):
    ((document.querySelector('input[type="radio"]:checked').value === 'true')?keyRusTab:keyRus)
     } 


const maltyText = document.createElement("textarea");
const btn_template = document.createElement('button');

let CURENT_INDEX = 0; 
 //***************Initiliazation page**************///
maltyText.setAttribute('readonly',true);
maltyText.setAttribute('cols',15);
maltyText.setAttribute('rows',10);

const template_Key = document.createElement('template'); let content = template_Key.content;
content.append(maltyText);
let div = document.createElement('div'); div.classList.add('ENG');
for (let i = 1; i<=5; i++ ){
    let nav = document.createElement('nav'); nav.classList.add(`row${i}`);
    div.append(nav);
}
content.append(div);
let article = document.createElement("article");
let BTN_Init = document.createElement("button"); BTN_Init.classList.add('init'); BTN_Init.textContent='Initialization';
BTN_Init.addEventListener("click",initKeyBoard);
function initKeyBoard(event){ let row; 
    if (event){
        ctrl_shift_key.DrawKey();
        /*row = [...ctrl_shift_key].sort( (x,y) => x[0] - y[0]);
        for ( let i of row ){
            let r = Math.floor(i[0]/10), c = i[0]-r*10, {value, key} = i[1][0];            
            if (c===1 ){ getCurrentKeyboard().array_Btn[r].unshift(value);
                row = document.querySelector(`.row${r+1}`); row.prepend(value);
            }
            else {
                if (c===9) {getCurrentKeyboard().array_Btn[r].push(value);
                    row = document.querySelector(`.row${r+1}`); row.append(value);
                }
                else{ getCurrentKeyboard().array_Btn[r].splice(c,0,value);
                    row = document.querySelector(`.row${r+1}`); row.append(value);
                }
            } 
        }*/    
        getCurrentKeyboard().flag = true;
        onoff_Event(false);
        event.preventDefault();         
        setCookie(1); 
    }
    else {
        for ( let i = 1;i<=5; i++ ) {
            let row = document.querySelector(`.row${i}`);
            while ( row.firstChild ) row.firstChild.remove();
        }        
        getCurrentKeyboard().array_Btn.forEach( (el0,index) =>{ row = document.querySelector(`.row${index+1}`); 
            el0.forEach( el1 =>{ row.append(el1) })
        })        
    } maltyText.value ='';       
};

article.append(BTN_Init);
const select_row = document.createElement('select'); select_row.setAttribute('name','row');
for (let i=1;i<=5;i++){
    select_row.append(document.createElement("option")); select_row.lastChild.setAttribute('value',i); 
    select_row.lastChild.textContent = `key\`s of row${i}`;
}
article.append(select_row);
BTN_Init = document.createElement("button"); BTN_Init.classList.add('init'); BTN_Init.textContent = 'Clear row';
BTN_Init.addEventListener("click",clearRowKeys); article.append(BTN_Init);
const select_lang = document.createElement('select');
select_lang.classList.add('lang'); select_lang.setAttribute('name','lang');
select_lang.append(document.createElement("option")); select_lang.lastChild.setAttribute('value',LANG_ENG); select_lang.lastChild.textContent = LANG_ENG;
select_lang.append(document.createElement("option")); select_lang.lastChild.setAttribute('value',LANG_RUS); select_lang.lastChild.textContent = LANG_RUS;
article.append(select_lang); 
const select_caps= document.createElement('nav');
select_caps.innerHTML = `<fieldset style="border: 1px dotted #cccccc; width: 100px;"> 
 <legend>Caps Lock</legend>
 <input type="radio" name ="CAPS" value=true>
 <label>On</label><br>
 <input type="radio"  name ="CAPS" checked value= false>
 <label>Off</label><br>
 </fieldset>`;
 //select_caps.style.display = 'none';
 select_caps.addEventListener('click',event=>{
     event.preventDefault(); event.stopPropagation();
    }
    );
article.append(select_caps); 
template_Key.content.append(article);
document.body.prepend(template_Key.content);
//************************************************
Array.from(document.querySelectorAll('article select, article input')).map( el => el.addEventListener('change',event=>{
     switch ( event.target.name ){
         case 'row':
            CURENT_INDEX = event.target.selectedIndex;            
            break;
        case 'lang':
        case 'CAPS':                        
            if (getCurrentKeyboard().flag) initKeyBoard();
            else clearRowKeys();
            break;
     }
 }))

const handlMouseUp = function(event){};
class CtrlShiftKey{
    constructor(){this.length = 0;}
    add(key,value,order){ this[this.length++] =[order,[{key:key,value:value}]];}
    has(code){ 
        let temp = [...this].flat(2).find( el => el.key === code);
        return temp;
    }
    find( template='' ){ 
        return [...this].flat(2).find( el=> el.key === template );
    }
    findIndex( template='' ){ 
        return [...this].flat(2).findIndex( el=> el.key === template );
    }
    [Symbol.iterator]() { let iterator = 0, obj = this;
        return {   
            next(){ return (iterator< obj.length ? { done: false, value: obj[iterator++]}:{ done: true}) }
        }        
    }
    /*
    *[Symbol.iterator]() {        
        for ( let i =0; i<this.length;i++) yield this[i]
    } */  
    DrawKey(){
        let row = [...this].sort( (x,y) => x[0] - y[0]);
        for ( let i of row ){
            let r = Math.floor(i[0]/10), c = i[0]-r*10, {value, key} = i[1][0];
            //let temp = document.querySelector(`.row${r+1} button[name=${value.name}]`); 
            let temp =document.querySelector(`.row${r+1} button[name=${Object.keys(value)[0]}]`);
            if (temp) {
                temp.remove(); console.log(temp);
            }
            if (c===1 ){ getCurrentKeyboard().array_Btn[r].unshift(value);
                row = document.querySelector(`.row${r+1}`); row.prepend(value);
            }
            else {
                if (c===9) {getCurrentKeyboard().array_Btn[r].push(value);
                    row = document.querySelector(`.row${r+1}`); row.append(value);
                }
                else{ getCurrentKeyboard().array_Btn[r].splice(c,0,value);
                    row = document.querySelector(`.row${r+1}`); row.append(value);
                }
            } 
        }    
        
    }
};

function getLastBtn(start ){ CURENT_INDEX = start; let a = getCurrentKeyboard().array_Btn;
    while (a[start][a[start].length -1 ] === undefined){
        return getLastBtn(--start);
    }
    return ( (a[start][a[start].length -1 ] === undefined)?null:a[start][a[start].length -1 ] );
}

const ctrl_shift_key = new CtrlShiftKey();

onoff_Event();

///*****create ctrl shift enter */

function handleCreateShiftCtrl(event){ event.preventDefault(); event.stopPropagation();
    if ( event.key.length<2 && !/space/i.test(event.code) ){ return;}    
    let codeKey = (/^space$/i.test(event.code))?event.code:event.key, key = 'key_'+codeKey;
    if (ctrl_shift_key.find(key)){
        if( /backspace/i.test(event.key)){
            console.log(event.key);
            console.log(key);
            key = getLastBtn(CURENT_INDEX);
            if (key){
                getCurrentKeyboard().DrawKey(key,true);
                getCurrentKeyboard().array_Btn[CURENT_INDEX].pop();
            }            
            else{  CURENT_INDEX = 0; }
            select_row.selectedIndex = CURENT_INDEX;
        }        
     return;    
    }
    let temp = btn_template.cloneNode(true);
    temp.name =event.key; temp.value =event.key; temp.textContent = event.key;
    temp[`${key}`] = codeKey; 
    temp.style.width = `${KEY_WIDTH*2}px`;
    if ( /TAB/i.test(event.key))ctrl_shift_key.add(key,temp,11);
    else if (/capslock/i.test(event.key)) ctrl_shift_key.add(key,temp,21);
    else if (/enter/i.test(event.key)) ctrl_shift_key.add(key,temp,19);
    else if ( /SHIFT/i.test(event.key)) {temp.style.width = `${KEY_WIDTH*2.2}px`; ctrl_shift_key.add(key,temp,31); }
    else if (/Control/i.test(event.key)) {temp.style.width = `${KEY_WIDTH*1.4}px`;ctrl_shift_key.add(key,temp,41); }
    else if (/alt/i.test(event.key)){temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(key,temp,42); }
    else if (/arrowleft/i.test(event.key) ){
        temp.textContent = 'left';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(key,temp,44); 
    }
    else if (/arrowup/i.test(event.key) ){ 
        temp.textContent = 'up';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(key,temp,45);
    }
    else if (/arrowdown/i.test(event.key) ){ 
        temp.textContent = 'down';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(key,temp,46); 
    }
    else if (/arrowright/i.test(event.key) ){ 
        temp.textContent = 'right';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(key,temp,47); 
    }
    else if( /backspace/i.test(event.key)) {        
        temp.style.width = `${KEY_WIDTH*2}px`; ctrl_shift_key.add(key,temp,9);  
    }
    if (/^space$/i.test(event.code)) { temp.style.width = `${KEY_WIDTH*6}px`; ctrl_shift_key.add(key,temp,43); }
    ctrl_shift_key.DrawKey(temp);
    maltyText.value = event.key;    
}

///******create auther key */
function handleCreateKeys(event){ let codeKey =event.key, key;     
    if ( (/([a-z]|[а-я]){2,}/i.test(event.key))  || /^space$/i.test(event.code)) return; 
    if (getCurrentKeyboard().caps) codeKey = event.key.toUpperCase();
    else codeKey = event.key.toLowerCase();    
    if ( event.altKey && /shift/i.test(event.key)){
        setCapsLock_Lang();        
    }
    key = 'key_'+codeKey;
    event.preventDefault(); event.stopImmediatePropagation(); event.stopPropagation();    
    if ( /q|й{1}/i.test(codeKey))  CURENT_INDEX =1;    
    else if ( /a|ф{1}/i.test(codeKey)) CURENT_INDEX = 2;      
    else if ( /z|я{1}/i.test(codeKey) ) CURENT_INDEX = 3;      
    else if (/(~|\`|Ё){1}/i.test(codeKey)) CURENT_INDEX = 0;
    select_row.selectedIndex = CURENT_INDEX;
    if ( getCurrentKeyboard().find(key) || ctrl_shift_key.find(key)) return;     
    if (  !event.location && event.shiftKey && !/([a-z]|[а-я])/i.test(event.key)   ) {
        let curElement = getCurrentKeyboard().array_Btn[CURENT_INDEX][getCurrentKeyboard().array_Btn[CURENT_INDEX].length-1];
        temp = Object.assign(curElement,curElement.cloneNode(true));  
        getCurrentKeyboard().DrawKey(temp,true);
        getCurrentKeyboard().array_Btn[CURENT_INDEX].pop();
        temp.insertAdjacentHTML("afterbegin",`<b>${codeKey}</b>`);
    }
    else {
        temp = btn_template.cloneNode(true);         
        temp.textContent+=codeKey;
    }      
    temp.name +=codeKey; 
    temp.value +=codeKey;    
    temp[`${key}`] = codeKey;
    getCurrentKeyboard().array_Btn[CURENT_INDEX].push( temp );
    getCurrentKeyboard().DrawKey(temp);
    maltyText.value = codeKey; event.preventDefault();
}

function clearRowKeys(){
    maltyText.value ='';
    getCurrentKeyboard().flag = false;
    for (let i =0; i<5; i++){                
        while (getCurrentKeyboard().array_Btn[i][0]) {
            delete getCurrentKeyboard().array_Btn[i][0]
        }; 
        getCurrentKeyboard().array_Btn[i].length =0;
        let nav = document.querySelector(`.row${i+1}`);
        while (nav.firstChild) 
            nav.firstChild.remove();        
    } 
    onoff_Event();    
}

function setCapsLock_Lang(type = 'caps'){
    if ( type = 'caps'){
        let checked = document.querySelector('input[type="radio"]:checked').value;
        if (checked === 'false'  ) document.querySelector(`input[type="radio"][value="true"]`).checked = true
        else document.querySelector(`input[type="radio"][value="false"]`).checked = true
        document.querySelector('input[type="radio"]:checked').value === 'true';
    }
    else{
        select_lang.children[select_lang.selectedIndex] =select_lang.children[!select_lang.selectedIndex];
    }
    initKeyBoard();
    onoff_Event( !getCurrentKeyboard().flag );
}

let iterator_key =0;

function handleBodyKey(event){     
    switch (event.type){
        case "keydown": 
        console.log(event.ke,iterator_key++);
        event.preventDefault();event.stopPropagation(); event.stopImmediatePropagation();
        let key = event.key, temp;
        if ( event.key.length===1 ) {         
            if (getCurrentKeyboard().caps) key = event.key.toUpperCase();
            else key = event.key.toLowerCase();
            key = getCurrentKey(event.key,event.shiftKey);
            if (!key) return;
            maltyText.value += key; key =`key_${key}`;
        }       
        else {
            if (/^space$/i.test(event.code)) {maltyText.value +=' '; key =event.code; }
            if (/back/i.test(event.key) ) 
                maltyText.value = maltyText.value.substring(0,maltyText.value.length-1);
        }               
                if ( /capslock/i.test(event.key) )                   
                        setCapsLock_Lang();
                if ( /shift/i.test(event.key) && event.altKey ){                
                        setCapsLock_Lang('language');
                 }
                 if ( event.altKey && /shift/i.test(event.key)){
                    setCapsLock_Lang();        
                }
                temp = getCurrentKeyboard().find(`${key}`);
                if (!temp) return;
                if ( ! temp.classList.contains('focus')) {temp.classList.add('focus'); setTimeout(t=>{t.classList.remove('focus')},300,temp) }
                else temp.classList.remove('focus'); 
            break; 
    }    
}

function getCurrentKey(key,shiftKey ){ let result = undefined;    
    for ( let temp of [keyEng,keyEngTab,keyRus,keyRusTab ]){
        let simb = temp.find('key_'+key);
        if ( simb ) { let {row, col} = temp.getRowCol(simb);
            if ( getCurrentKeyboard() !== temp ) { result = getCurrentKeyboard().array_Btn[row][col].value; 
                if (result.length ==2) {
                    result = shiftKey?v[1]:v[0];
                }
            }
            else result = key;
            break;
        }
    }
    return result;
}

function ClickAnime(event){
    /*event.target.classList.add('focus');
    exmp.removeEventListener("click",ClickAnime);
    setTimeout( target =>{target.classList.remove('focus'); target.addEventListener("click",ClickAnime) },500,event.target);
        */
    new Promise((resolve,reject)=>{
        event.target.removeEventListener("click",ClickAnime);
        event.target.classList.add('focus');
        setTimeout(resolve(event.target),1000);
        }).then((target)=>{
            target.addEventListener("click",ClickAnime);
            target.classList.remove('focus');
        });
        event.preventDefault(); event.stopImmediatePropagation();        
}        

//btn_template.addEventListener('mouseup',handlMouseUp);
btn_template.addEventListener('click',ClickAnime);

function getCookies(){
    let cookies = new Map();
    let all = document.cookies;
    if (!all) return cookies;
    let list = all.split('; ');
    for ( let cookie of list){
        if (!cookie.includes('=')) continue;
        let p = cookie.indexOf('=');
        let name = cookie.substring(0,p);
        let value = JSON.parse(cookie.substring(p+1));
        value = decodeURIComponent(value);
        cookies.set(name,value);
    }
    return cookies;
}

window.onload = function(event){
    console.clear();
    let cookies = getCookies();
    if (cookies.size){
        for ( let {key,value} of cookies ){
            if (key === language ){ let current = null;
                if ( (value.language === LANG_ENG) && (!value.caps ) ){
                    current = keyEng = new KEYBOARD(value.language,false); 
                }
                else if ( (value.language === LANG_ENG) && (value.caps ) ){
                    current = keyEngTab = new KEYBOARD(value.language,true); 
                }
                else if ((value.language === LANG_RUS) && (!value.caps ) ){
                    current = keyRus = new KEYBOARD(value.language,false); 
                }
                else {
                    current = keyRusTab = new KEYBOARD(value.language,true); 
                }
            }
            else{

            }                

        }
    } 
}

[keyEng,keyEngTab,keyRus,keyRusTab].forEach(el=>setCookie(1));

function setCookie(daysToLive = null){
    let cookies ='';  
   // document.cookie= 'version=${encodeURIComponent (document.lastModified)}`
    let cookie = `language=${JSON.stringify({language:keyEng.language,caps:keyEng.caps})}`;
    cookies+=cookie;
    for ( let i=0; i<5; i++){
        for (let j=0; j<getCurrentKeyboard().array_Btn[i].length;j++){ let el = getCurrentKeyboard().array_Btn[i][j];  
            let obj = {name:el.name,value:el.value}; 
            Object.assign(obj,el);        
            let value = encodeURIComponent(JSON.stringify(obj));
            cookie = `row${i}col${j}=${value}`;
            cookies+=cookie;
        }
    }
    cookies+=`;max-age=${daysToLive*60*60*24}`;
    //document.cookie= cookies;     
    document.cookie = "user=John; max-age=3600";

}


document.querySelector("div").addEventListener("click",handkeMouseAction);

const handkeMouseAction = function(event){
    let k = event.target.elementFromPoint();    
}

function onoff_Event(on = true){
    if (on) {
        maltyText.addEventListener("keypress", handleCreateKeys);
        maltyText.addEventListener("keyup",handleCreateShiftCtrl);
        
        BTN_Init.addEventListener("click",initKeyBoard);

        document.body.removeEventListener("keydown",handleBodyKey);    
        document.body.removeEventListener("keypress",handleBodyKey); 
        document.body.removeEventListener("keyup",handleBodyKey);

    }
    else{
        maltyText.removeEventListener("keyup",handleCreateShiftCtrl);
        maltyText.removeEventListener("keypress", handleCreateKeys);    
        
        BTN_Init.removeEventListener("click",initKeyBoard);
        
        document.body.addEventListener("keydown",handleBodyKey);    
        document.body.addEventListener("keypress",handleBodyKey);
        document.body.addEventListener("keyup",handleBodyKey);    
    }
}



