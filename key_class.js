
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
        if (del) {
            if (this.array_Btn[CURENT_INDEX].length ) {                
                let a = [...row.querySelectorAll(`button`)].filter( el=> el.name ===key.name );
                if ( a.length ) a[0].remove();                
            }
        }
        else{ 
            //row.append(this.array_Btn[CURENT_INDEX][this.array_Btn[CURENT_INDEX].length-1]);
            if ( !CURENT_INDEX){ let a = [...row.querySelectorAll(`button`)].filter( el=>/space/i.test(el.name));
                if (a.length) a[0].before(key);
                else row.append(key);
            }
            else if ( CURENT_INDEX===1 ){
                let enter = [...row.querySelectorAll(`button`)].filter( el=>/enter/i.test(el.name));
                if (enter.length) enter[0].before(key);
                else row.append(key);                
            }
            else row.append(key);
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
                if ( this.array_Btn[i][j].name.includes(key)) return {row:i,col:j}
            }            
        }
        return undefined;
    }
}

class CtrlShiftKey{
    constructor(){this.length = 0;}
    add(key,value,order){ this[this.length++] =[order,{key:key,value:value}];}
    find( template='' ){ 
        return [...this].flat(1).find( el=> el.value === template );
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
            let r = Math.floor(i[0]/10),c =i[0]%10,{value, key} = i[1];
            console.log(value," ",key.name);            
            let temp =document.querySelector(`.row${r+1} button[name=${value}]`);
            if (temp) temp.remove(); 
            row = document.querySelector(`.row${r+1}`); 
            if( c ===1) row.prepend(key);
            else row.append(key);             
        }
    }
};

var keyEngTab = new KEYBOARD(LANG_ENG,true),keyEng = new KEYBOARD(LANG_ENG,false), keyRusTab = new KEYBOARD(LANG_RUS,true), keyRus =new KEYBOARD(LANG_RUS,false);
const maltyText = document.createElement("textarea");
const btn_template = document.createElement('button');
let CURENT_INDEX = 0; 
 //***************Initiliazation page**************///
maltyText.setAttribute('readonly',true);
maltyText.setAttribute('cols',15);
maltyText.setAttribute('rows',10);
const template_Key = document.createElement('template'); let content = template_Key.content;
content.append(maltyText);
const div_keyboard = document.createElement('div'); div_keyboard.classList.add('ENG');
for (let i = 1; i<=5; i++ ){
    let nav = document.createElement('nav'); nav.classList.add(`row${i}`);
    div_keyboard.append(nav);
}
content.append(div_keyboard);
let article = document.createElement("article");
let BTN_Init = document.createElement("button"); BTN_Init.classList.add('init'); BTN_Init.textContent='Save keyboard';
BTN_Init.addEventListener("click",initKeyBoard);
article.append(BTN_Init);
const select_row = document.createElement('select'); select_row.setAttribute('name','row');
for (let i=1;i<=5;i++){
    select_row.append(document.createElement("option")); select_row.lastChild.setAttribute('value',i); 
    select_row.lastChild.textContent = `key\`s of row${i}`;
} select_row.style.display = 'none';
article.append(select_row);
BTN_Init = document.createElement("button"); BTN_Init.classList.add('init'); BTN_Init.textContent = 'Clear keyboard';
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
function getCurrentKeyboard(){
    return (document.querySelector('.lang').value === LANG_ENG)?
     ((document.querySelector('input[type="radio"]:checked').value ==='true' )?keyEngTab:keyEng):
    ((document.querySelector('input[type="radio"]:checked').value === 'true')?keyRusTab:keyRus)
     } 

function initKeyBoard(event){ let row; 
    if (event){
        ctrl_shift_key.DrawKey();
        getCurrentKeyboard().flag = true;
        onoff_Event(false);
        event.preventDefault();
        maltyText.value =''; 
    }
    else {        
        for ( let i = 1;i<=5; i++ ) {
            let row = document.querySelector(`.row${i}`);
            while ( row.firstChild ) row.firstChild.remove();
        } ctrl_shift_key.DrawKey();
        let curentKeyboard = getCurrentKeyboard();
        curentKeyboard.array_Btn.forEach( (el,index) =>{ CURENT_INDEX = index;
            curentKeyboard.array_Btn[index].forEach( el0=>{curentKeyboard.DrawKey(el0);})})
    }       
};

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


function getLastBtn(start ){ CURENT_INDEX = start<0?4:start; let a = getCurrentKeyboard().array_Btn[start];
    while (a[a.length -1 ] === undefined){
        return getLastBtn(--start);
    }
    return ( (a[a.length -1 ] === undefined)?null:a[a.length -1 ] );
}

let ctrl_shift_key = new CtrlShiftKey();
onoff_Event();
///******create auther key */
function handleCreateKeys(event){ let codeKey =event.key, key; 
    let temp = btn_template.cloneNode(true);
    if ( ( event.key.length !=1)  || /^space$/i.test(event.code)) { 
        key = "key_"+(/^space$/i.test(event.code)?"space":event.key);
        if (ctrl_shift_key.find(key)){
            if( /backspace/i.test(key)){
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
        createCtrlKey(temp,event.key );        
        ctrl_shift_key.DrawKey();
        maltyText.value = event.key; 
    }
    else{
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
            temp.textContent+=codeKey;
        }      
        temp.name +=codeKey; 
        temp.value +=codeKey;    
        temp[`${key}`] = codeKey;
        getCurrentKeyboard().array_Btn[CURENT_INDEX].push( temp );
        getCurrentKeyboard().DrawKey(temp);
        maltyText.value = codeKey; event.preventDefault();
    }
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
    for ( let i of ctrl_shift_key) {
        delete i;
    }
    ctrl_shift_key.length =0;
    onoff_Event();    
}

function setCapsLock_Lang(type = 'caps'){
    if ( type === 'caps'){
        let checked = document.querySelector('input[type="radio"]:checked').value;
        if (checked === 'false'  ) document.querySelector(`input[type="radio"][value="true"]`).checked = true
        else document.querySelector(`input[type="radio"][value="false"]`).checked = true
        document.querySelector('input[type="radio"]:checked').value === 'true';
    }
    else{
        select_lang.selectedIndex =+!select_lang.selectedIndex;
    }
    initKeyBoard();
    onoff_Event( !getCurrentKeyboard().flag );
}

let reverseKeyBoard = function(){
    let curent_key = getCurrentKeyboard();
    switch (curent_key.language) {
        case LANG_ENG:
            if (curent_key.caps) curent_key = keyEng.flag?keyEng:undefined;
            else curent_key = keyEngTab.flag?keyEngTab:undefined;
            break;
        default:
            if (curent_key.caps) curent_key = keyRus.flag?keyRus:undefined;
            else curent_key = keyRusTab.flag?keyRusTab:undefined;
            break;
    }
    if (curent_key) setCapsLock_Lang();
    return curent_key;
}

function handleBodyKey(event){  let key = event.key, temp;
    switch (event.type){
        case "keydown":         
        //event.preventDefault();
        event.stopPropagation(); event.stopImmediatePropagation();        
        if ( event.key.length===1 && !/^space/i.test(event.code) ) {         
            let res = [keyEng,keyEngTab,keyRus,keyRusTab].filter(  array=>{return array.getRowCol(event.key)}); 
            if (res.length){ 
                res = res[0].getRowCol(event.key);
                temp = getCurrentKeyboard().array_Btn[res.row][res.col];
                if (!temp) return;
                maltyText.value += temp.value.length===2?event.key:temp.value; 

            }
        }       
        else {
            if (/^space/i.test(event.code)) {maltyText.value +=' '; key ='space'; }
            if (/back/i.test(event.key) ) maltyText.value = maltyText.value.substring(0,maltyText.value.length-1);            
            if ( /capslock/i.test(event.key) ) 
                setCapsLock_Lang();            
            if (/shift/i.test(event.key) && ( event.altKey) ) setCapsLock_Lang('language');
            temp = ctrl_shift_key.find('key_'+key).key;
            if (event.shiftKey &&  !/[a-z]{2}|[а-я]{2}/i.test(event.key)){
                reverseKeyBoard(); maltyText.value += event.key; key =`key_${event.key}`;
                temp = getCurrentKeyboard().find(`${key}`); 
            }
        }
        if (!temp) return;
        if ( ! temp.classList.contains('focus')) {temp.classList.add('focus'); setTimeout(t=>{t.classList.remove('focus')},300,temp) }
        else temp.classList.remove('focus'); 
    break;        
    }
}

function getCurrentKey(key,shiftKey ){ let result = undefined;    
    for ( let temp of [keyEng,keyEngTab,keyRus,keyRusTab ]){
        let simb = temp.find('key_'+key);
        if ( simb ) { let {row, col} = temp.getRowCol(simb.name);
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

btn_template.addEventListener('click',ClickAnime);

function createCtrlKey(temp,value ){ let key = 'key_'+value;
    temp.textContent = temp.value = value;
    temp.style.width = `${KEY_WIDTH*2}px`; order = 0;
    if ( /TAB/i.test(value)) order = 11;
    else if (/capslock/i.test(value)) order=21;
    else if (/enter/i.test(value)) order=19;
    else if ( /SHIFT/i.test(value)) {temp.style.width = `${KEY_WIDTH*2.2}px`; order=31; }
    else if (/Control/i.test(value)) {temp.style.width = `${KEY_WIDTH*1.4}px`;order=41; }
    else if (/alt/i.test(value)){temp.style.width = `${KEY_WIDTH*1.4}px`; order=42; }
    else if (/arrowleft/i.test(value) ){ temp.textContent = 'left'; temp.style.width = `${KEY_WIDTH*1.4}px`; order=44; }
    else if (/arrowup/i.test(value) ){ temp.textContent = 'up';temp.style.width = `${KEY_WIDTH*1.4}px`; order=45;}
    else if (/arrowdown/i.test(value) ){ temp.textContent = 'down';temp.style.width = `${KEY_WIDTH*1.4}px`; order=46; }
    else if (/arrowright/i.test(value) ){ temp.textContent = 'right';temp.style.width = `${KEY_WIDTH*1.4}px`; order =47;}
    else if( /backspace/i.test(value)) { temp.style.width = `${KEY_WIDTH*2}px`; order=9;}
    if (/^ $/i.test(value)) { temp.style.width = `${KEY_WIDTH*6}px`; order =43; key ='key_space' }
    temp.name = key;        
    ctrl_shift_key.add(temp,temp.name,order);
}

window.onload = function(event){
 //   localStorage.clear();
    let ctrl = Object.keys(localStorage).filter( el=>/^ctrlaltdel/i.test(el)  );
    if (ctrl.length){        
        let btn = btn_template.cloneNode(true);
        delete ctrl_shift_key; ctrl_shift_key = new CtrlShiftKey();
        for ( let k of ctrl ){ let temp = btn.cloneNode(true);
            let value  = decodeURIComponent(localStorage.getItem(k));
            createCtrlKey(temp,value );        }
        [keyEng,keyEngTab,keyRus,keyRusTab].forEach( (element,index)=>{
            let keylang = decodeURIComponent(localStorage.getItem((!index)?'keyEng':(index===1)?'keyEngTab':(index===2)?'keyRus':'keyRusTab'));            
            keylang = JSON.parse(keylang); if (!keylang) return;  element.caps = index%2; 
            for (let i=0; i<4;i++){ let row_ar = keylang[i]; row_ar.shift();
                for (let btn of row_ar ){ element.flag = true;
                    let temp = btn_template.cloneNode(true);
                    for ( let key in btn){ temp[key] = btn[key] }
                    temp.innerHTML = btn.textContent;
                    element.array_Btn[i].push(temp);
                }                
            }            
        })
        initKeyBoard(); onoff_Event(false);
    }
}

window.addEventListener('beforeunload', function (e){
    localStorage.clear();    
    for ( let obj of ctrl_shift_key ){        
        localStorage.setItem('ctrlaltdel'+obj[0],encodeURIComponent(obj[1].key.value)); 
    }
    [keyEng,keyEngTab,keyRus,keyRusTab].forEach((element,index)=>{
        if ( element.array_Btn.length ) {
            let result = [];            
            for (let i = 0; i<4; i ++){ let ar = [];
                if ( element.array_Btn[i].length ){ ar.push(i);
                    for ( let j=0; j<element.array_Btn[i].length; j++ ){ let e = element.array_Btn[i][j];                        
                        ar.push({name:e.name,value:e.value,textContent:e.innerHTML});
                        Object.keys(e).forEach( el=>{ ar[ar.length-1][el] = e[el]});
                    }
                }
                if (ar.length) result.push(ar);                
            }            
            if (result.length) localStorage.setItem((!index)?'keyEng':(index===1)?'keyEngTab':(index===2)?'keyRus':'keyRusTab',encodeURIComponent(JSON.stringify(result)));
        }
    })
})

function onoff_Event(on = true){
    if (on) {
        maltyText.addEventListener("keydown", handleCreateKeys);
      //  maltyText.addEventListener("keypress",handleCreateShiftCtrl);        
        BTN_Init.addEventListener("click",initKeyBoard);
        document.body.removeEventListener("keydown",handleBodyKey);    
        document.body.removeEventListener("keypress",handleBodyKey); 
        div_keyboard.removeEventListener('click',handleMouseAction);
    }
    else{
    //    maltyText.removeEventListener("keypress",handleCreateShiftCtrl);
        maltyText.removeEventListener("keydown", handleCreateKeys);            
        BTN_Init.removeEventListener("click",initKeyBoard);        
        document.body.addEventListener("keydown",handleBodyKey);    
        document.body.addEventListener("keypress",handleBodyKey);
        div_keyboard.addEventListener('click',handleMouseAction);

    }
}

function handleMouseAction(event){
    let btn = document.elementFromPoint(event.clientX,event.clientY)
    function callback(){
        return new Promise((resolve)=>{
            div_keyboard.removeEventListener("click",handleMouseAction);
            event.target.classList.add('focus');
            if (!event.shiftKey) {
                if (!ctrl_shift_key.find(btn.name) ) maltyText.value+= btn.lastChild.textContent
            }
            else {
                if (!/([a-z]|[а-я])+/i.test(btn.name) ){
                    maltyText.value+= btn.firstChild.textContent
                }
            }setTimeout(resolve(event.target),500);
        });
    };
    let p = callback(); 
    p.then(target=>{
            div_keyboard.addEventListener("click",handleMouseAction);
            target.classList.remove('focus');
        });
        event.preventDefault(); event.stopImmediatePropagation(); 
}


