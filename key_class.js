
//import  * as constant from "constant.js";
//import BinarySearchTree from "binaryTreeSearch.js";
 
var array_Btn;
class KEYBOARD {
    constructor(lang,caps ){
        this.language = lang;       
        this.caps = caps;        
        this.array_Btn = [[],[],[],[],[]];
        this.flag = false;
    }
    DrawKey(key){ let row = document.querySelector(`.row${CURENT_INDEX+1}`)
        if (/backspace/i.test(key) ) {
            if (this.array_Btn[CURENT_INDEX].length ) {
                row.children[this.array_Btn[CURENT_INDEX].length-1].remove();                
            }
        }
        else{ 
            row.append(this.array_Btn[CURENT_INDEX][this.array_Btn[CURENT_INDEX].length-1]);
        }
    }
    find( template='' ){
        let temp = [...this.array_Btn].flat(1).find( (el,index) =>{ 
            return el.hasOwnProperty(template);
        });
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
        row = [...ctrl_shift_key].sort( (x,y) => x[0] - y[0]);
        for ( let i of row ){
            let r = Math.floor(i[0]/10), c = i[0]-r*10, {value, key} = i[1][0];
            console.log(`row: ${r}===col:${c}===key:${key}` );
            if (c===1 ){ array_Btn[r].unshift(value);
                row = document.querySelector(`.row${r+1}`); row.prepend(value);
            }
            else {
                if (c===9) {array_Btn[r].push(value);
                    row = document.querySelector(`.row${r+1}`); row.append(value);
                }
                else{ array_Btn[r].splice(c,0,value);
                    /*row = document.querySelector(`.row${r+1}`); 
                    let child = row.children[row.children.length-1]; 
                    child.before(value);*/
                    row = document.querySelector(`.row${r+1}`); row.append(value);
                }
            } 
        }    
        getCurrentKeyboard().flag = true;
        maltyText.removeEventListener("keyup",handleCreateShiftCtrl);
        maltyText.removeEventListener("keypress", handleCreateKeys);    
        event.preventDefault();
        BTN_Init.removeEventListener("click",initKeyBoard);
        document.body.addEventListener("keyup",handleBodyKey);    
        document.body.addEventListener("keypress",handleBodyKey);
        maltyText.value ='';
        setCookie(1); 
    }
    else {
        array_Btn.forEach( (el0,index) =>{ row = document.querySelector(`.row${index+1}`);
            while ( row.firstChild ) row.firstChild.remove();
            el0.forEach( el1 =>{ row.append(el1) })
        })        
    }        
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
 </fieldset>`
article.append(select_caps); 
template_Key.content.append(article);
document.body.prepend(template_Key.content);
array_Btn = getCurrentKeyboard().array_Btn;
//************************************************
Array.from(document.querySelectorAll('article select, article input')).map( el => el.addEventListener('change',event=>{
     switch ( event.target.name ){
         case 'row':
            CURENT_INDEX = event.target.selectedIndex;            
            break;
        case 'lang':
        case 'CAPS':            
            array_Btn = getCurrentKeyboard().array_Btn;
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
    [Symbol.iterator]() { let iterator = 0, obj = this;
        return {   
            next(){ return (iterator< obj.length ? { done: false, value: obj[iterator++]}:{ done: true}) }
        }        
    }
    /*
    *[Symbol.iterator]() {        
        for ( let i =0; i<this.length;i++) yield this[i]
    } */  
};

function getLastBtn(start ){ CURENT_INDEX = start;
    while (array_Btn[start][array_Btn[start].length -1 ] === undefined){
        return getLastBtn(--start);
    }
    return ( (array_Btn[start][array_Btn[start].length -1 ] === undefined)?null:array_Btn[start][array_Btn[start].length -1 ] );
}

const ctrl_shift_key = new CtrlShiftKey();

///*****create ctrl shift enter */
function handleCreateShiftCtrl(event){ 
    let codeKey = (/^space$/i.test(event.code))?event.code:event.key, key = 'key_'+codeKey;
    if (ctrl_shift_key.find(key)){
        if( /backspace/i.test(event.key)){
            console.log(event.key);
            console.log(key);
            key = getLastBtn(CURENT_INDEX);
            if (key){
                getCurrentKeyboard().DrawKey('backspace');
                array_Btn[CURENT_INDEX].pop();
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
    maltyText.value = event.key;
    event.preventDefault(); event.stopImmediatePropagation(); event.stopPropagation();
}

maltyText.addEventListener("keyup",handleCreateShiftCtrl);

///******create auther key */
function handleCreateKeys(event){ 
    let codeKey = event.key, key = 'key_'+codeKey;
    if (/[a-z]{2,}/i.test(event.key) || /^space$/i.test(event.code)) return;
    event.preventDefault(); event.stopImmediatePropagation(); event.stopPropagation();    
    if ( /q|й{1}/i.test(event.key))  CURENT_INDEX =1;    
    else if ( /a|ф{1}/i.test(event.key)) CURENT_INDEX = 2;      
    else if ( /z|я{1}/i.test(event.key) ) CURENT_INDEX = 3;      
    else if (/(~|\`|Ё){1}/i.test(event.key)) CURENT_INDEX = 0;    
    select_row.selectedIndex = CURENT_INDEX;
    if ( getCurrentKeyboard().find(key) || ctrl_shift_key.find(key)) return;     
    if (  !event.location && event.shiftKey  ) {
        let curElement = array_Btn[CURENT_INDEX][array_Btn[CURENT_INDEX].length-1];
        temp = Object.assign(curElement,curElement.cloneNode(true));        
        getCurrentKeyboard().DrawKey('backspace');
        array_Btn[CURENT_INDEX].pop();
        temp.insertAdjacentHTML("afterbegin",`<b>${event.key}</b>`);
    }
    else {
        temp = btn_template.cloneNode(true);         
        temp.textContent+=event.key;
    }      
    temp.name +=event.key; 
    temp.value +=event.key;    
    temp[`${key}`] = codeKey;
    array_Btn[CURENT_INDEX].push( temp );
    getCurrentKeyboard().DrawKey(event.key);     
    maltyText.value = event.key;
}
function onCaps(){
    array_Btn = getCurrentKeyboard().array_Btn; 
    if (getCurrentKeyboard().flag) initKeyBoard();
    else clearRowKeys();
    document.querySelector('select .row')
    

}

maltyText.addEventListener("keypress", handleCreateKeys);


function clearRowKeys(){
    maltyText.value ='';
    getCurrentKeyboard().flag = false;
    for (let i =0; i<5; i++){                
        while (getCurrentKeyboard().array_Btn[i][0]) {
            delete array_Btn[i][0]
        }; 
        getCurrentKeyboard().array_Btn[i].length =0;
        let nav = document.querySelector(`.row${i+1}`);
        while (nav.firstChild) 
            nav.firstChild.remove();        
    }   
    maltyText.addEventListener("keypress", handleCreateKeys);
    maltyText.addEventListener("keyup",handleCreateShiftCtrl);
}


function handleBodyKey(event){
    let key = 'key_'+event.key, temp;
    switch (event.type){
        case "keyup": document.body.removeEventListener("keyup",handleBodyKey); document.addEventListener("keypress",handleBodyKey); 
            temp = getCurrentKeyboard().array_Btn.flat(1).find( el=> `${key}` in el );  
            if (!temp) return;
            if ( ! temp.classList.contains('focus')) {temp.classList.add('focus'); setTimeout(t=>{t.classList.remove('focus')},500,temp) }
            else temp.classList.remove('focus'); 
            if (!event.location && event.shiftKey && /([A-Z][a-z]+)|([А-Я][а-я]+)/gm.test(event.key)){
                let aa =1;
            }
            break;
        case "keypress": 
            document.body.removeEventListener("keypress",handleBodyKey); document.addEventListener("keyup",handleBodyKey);            
            maltyText.value+=event.key; 
            if (  (!event.location && event.shiftKey && /([A-Z])|([А-Я])/i.test(event.key)) || (/caps/i.test(event.key) ) ){                
                let checked = document.querySelector('input[type="radio"]:checked').value;
                if (checked === 'false'  ) document.querySelector(`input[type="radio"][value="true"]`).setAttribute('checked',true);
                else document.querySelector(`input[type="radio"][value="false"]`).setAttribute('checked',true);
                let r= ctrl_shift_key.find('shift');
                r = getCurrentKeyboard().array_Btn.flat(1).find( el=> `${key}` in el );    
                if(r) r.classList.add('focus');
            }
            temp = getCurrentKeyboard().array_Btn.flat(1).find( el=> `${key}` in el );    
            if(!temp) return;
            temp.classList.add('focus');
            initKeyBoard();
    }
}

//document.body.removeEventListener("keypress",handleBodyKey);    
document.body.removeEventListener("keyup",handleBodyKey);    
document.body.removeEventListener("keypress",handleBodyKey);    


const exmp = document.querySelector('.exampl');
exmp.onclick =ClickAnime;

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
        for (let j=0; j<keyEng.array_Btn[i].length;j++){ let el = keyEng.array_Btn[i][j];        
            let obj = {name:el.name,value:el.value}; 
            Object.assign(obj,el);        
            let value = encodeURIComponent(JSON.stringify(obj));
            cookie = `row${i}col${j}=${value}`;
            cookies+=cookie;
        }
    }
    cookies+=`;max-age=${daysToLive*60*60*24}`;
    document.cookie= cookies;     
}



