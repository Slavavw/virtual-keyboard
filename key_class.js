
//import  * as constant from "constant.js";
//import BinarySearchTree from "binaryTreeSearch.js";

var array_Btn;
class KEYBOARD {
    constructor(lang,tab ){
        this.language = lang;       
        this.caps = tab;        
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
}
var keyEngTab = new KEYBOARD(LANG_ENG,true), 
keyEng = new KEYBOARD(LANG_ENG,false), 
keyRusTab = new KEYBOARD(LANG_RUS,true), 
keyRus =new KEYBOARD(LANG_RUS,false);
function getCurrentKeyboard(){
    return (document.querySelector('.lang').value === LANG_ENG)?
     ((document.querySelector('input[type="radio"]:checked').value )?keyEngTab:keyEng):
    ((document.querySelector('input[type="radio"]:checked').value )?keyRusTab:keyRus)
     } 

const searchTree = new BinarySearchTree();
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
    row = [...ctrl_shift_key].sort( (x,y) => x[0] - y[0]);
    for ( let i of row ){
        let r = Math.floor(i[0]/10), c = i[0]-r*10, {value, key, keyCode} = i[1][0];
        console.log(`row: ${r}===col:${c}===key:${key}` );
        if (c===1 ){ array_Btn[r].unshift(value);
            row = document.querySelector(`.row${r+1}`); row.prepend(value);
        }
        else {
            if (c===9) {array_Btn[r].push(value);
                row = document.querySelector(`.row${r+1}`); row.append(value);
            }
            else{ array_Btn[r].splice(c,0,value);
                row = document.querySelector(`.row${r+1}`); 
                let child = row.children[c]; child.before(value);
            }
        } 
    }    
    array_Btn.flag = true;
    /*array_Btn.forEach( (el0,index) =>{ row = document.querySelector(`.row${index+1}`);
        while ( row.firstChild ) row.firstChild.remove();
        el0.forEach( el1 =>{ row.append(el1) })
    })
    */
    maltyText.removeEventListener("keyup",handleCreateShiftCtrl);
    maltyText.removeEventListener("keydown", handleCreateKeys);    
    if (event) event.preventDefault();
    BTN_Init.removeEventListener("click",initKeyBoard);
    document.body.addEventListener("keyup",handleBodyKey);    
    document.body.addEventListener("keydown",handleBodyKey);    
};

article.append(BTN_Init);
let select = document.createElement('select'); select.setAttribute('name','row');
for (let i=1;i<=5;i++){
    select.append(document.createElement("option")); select.lastChild.setAttribute('value',i); select.lastChild.textContent = `key\`s of row${i}`;
}
article.append(select);
BTN_Init = document.createElement("button"); BTN_Init.classList.add('init'); BTN_Init.textContent = 'Clear row';
BTN_Init.addEventListener("click",clearRowKeys); article.append(BTN_Init);
select = document.createElement('select');
select.classList.add('lang'); select.setAttribute('name','lang');
select.append(document.createElement("option")); select.lastChild.setAttribute('value',LANG_ENG); select.lastChild.textContent = LANG_ENG;
select.append(document.createElement("option")); select.lastChild.setAttribute('value',LANG_RUS); select.lastChild.textContent = LANG_RUS;
article.append(select); 
select= document.createElement('nav');
 select.innerHTML = `<fieldset style="border: 1px dotted #cccccc; width: 100px;"> 
 <legend>Caps Lock</legend>
 <input type="radio" name ="TAB" value=true>
 <label>On</label><br>
 <input type="radio"  name ="TAB" checked value= false>
 <label>Off</label><br>
 </fieldset>`
article.append(select); 
template_Key.content.append(article);
document.body.prepend(template_Key.content);
array_Btn = getCurrentKeyboard().array_Btn;
//************************************************
select = Array.from(document.querySelectorAll('article select, article input'));
select.map( el => el.addEventListener('change',event=>{
     switch ( event.target.name ){
         case 'row':
            CURENT_INDEX = event.target.selectedIndex;            
            break;
        case 'lang':
        case 'TAB':
            let temp = getCurrentKeyboard();
            array_Btn = temp.array_Btn;
            if (temp.flag) initKeyBoard();
            else clearRowKeys();
            break;
     }
 }))

const handlMouseUp = function(event){};
class CtrlShiftKey{
    constructor(){this.length = 0;}
    add(key,value,keyCode,order){ this[this.length++] =[order,[{key,value,keyCode}]];}
    has(code){ 
        let temp = [...this].flat(2).find( el => el.keyCode === code);
        return temp;
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

const ctrl_shift_key = new CtrlShiftKey();
function handleCreateShiftCtrl(event){       
    if (searchTree.has(event.keyCode)) return;
    if (/[a-z]{2,}/i.test(event.key) || /^space$/i.test(event.code)) 
        searchTree.add(event.keyCode); 
    let temp = btn_template.cloneNode(true);
    temp.name =event.key; temp.value =event.key; temp.textContent = event.key;
    temp[`${event.keyCode}`]=event.keyCode; temp.style.width = `${KEY_WIDTH*2}px`;
    if ( /TAB/i.test(event.key)){ ctrl_shift_key.add(event.key,temp,event.keyCode,11);}
    else if (/capslock/i.test(event.key)) {ctrl_shift_key.add(event.key,temp,event.keyCode,21);}
    else if (/enter/i.test(event.key)) {ctrl_shift_key.add(event.key,temp,event.keyCode,19);}
    else if ( /SHIFT/i.test(event.key)){ temp.style.width = `${KEY_WIDTH*2.2}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,31);}
    else if (/Control/i.test(event.key)) {temp.style.width = `${KEY_WIDTH*1.4}px`;ctrl_shift_key.add(event.key,temp,event.keyCode,41);}
    else if (/alt/i.test(event.key)){temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,42);}
    else if (/arrowleft/i.test(event.key) ){
        temp.textContent = '⇦';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,44); 
    }
    else if (/arrowup/i.test(event.key) ){ 
        temp.textContent = '⇧';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,45); 
    }
    else if (/arrowdown/i.test(event.key) ){ 
        temp.textContent = '⇩';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,46); 
    }
    else if (/arrowright/i.test(event.key) ){ 
        temp.textContent = '⇨';
        temp.style.width = `${KEY_WIDTH*1.4}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,47); 
    }
    else if( /backspace/i.test(event.key)) {temp.style.width = `${KEY_WIDTH*2}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,9);}
    if (/^space$/i.test(event.code)) { temp.style.width = `${KEY_WIDTH*6}px`; ctrl_shift_key.add(event.key,temp,event.keyCode,43);}
    //value = ( event.key+ ((event.altKey||event.ctrlKey||event.shiftKey)?"(":"|")+  
    //(event.altKey?" altKey ":"") + (event.ctrlKey?' ctrlKey ':'') + (event.shiftKey?' shiftKey ':'') + ((event.altKey||event.ctrlKey||event.shiftKey)?')|':'')); 
    maltyText.value = event.key;
    event.preventDefault(); event.stopImmediatePropagation(); event.stopPropagation();
}

maltyText.addEventListener("keyup",handleCreateShiftCtrl);

function handleCreateKeys(event){ 
    event.preventDefault(); event.stopImmediatePropagation(); event.stopPropagation();
    if (/[a-z]{2,}/i.test(event.key) || /^space$/i.test(event.code)) return;
    if ( /q|й{1}/i.test(event.key))  CURENT_INDEX =1;    
    else if ( /a|ф{1}/i.test(event.key)) CURENT_INDEX = 2;      
    else if ( /z|я{1}/i.test(event.key) ) CURENT_INDEX = 3;      
    else if (/(~|\`|Ё){1}/i.test(event.key)) CURENT_INDEX = 0;    
    document.querySelector('select[name="row"]').selectedIndex = CURENT_INDEX;
    if (searchTree.has(event.keyCode)) return;     
    if (  !event.location && event.shiftKey  ) {        
        temp = array_Btn[CURENT_INDEX][array_Btn[CURENT_INDEX].length-1];
        temp.insertAdjacentHTML("afterbegin",`<b>${event.key}</b>`);
        searchTree.add(event.keyCode);
        temp.name +=event.key; 
        temp.value+=event.key;          
        temp[`${event.keyCode}`]=event.keyCode;
        getCurrentKeyboard().DrawKey('backspace');
        array_Btn[CURENT_INDEX].pop();     
        array_Btn[CURENT_INDEX].push( temp );        
        getCurrentKeyboard().DrawKey(event.key); 
    }
    else {temp = btn_template.cloneNode(true); 
        array_Btn[CURENT_INDEX].push( temp ); 
        temp.textContent+=event.key;              
        searchTree.add(event.keyCode);
        temp.name +=event.key; 
        temp.value +=event.key;          
        temp[`${event.keyCode}`]=event.keyCode;
        getCurrentKeyboard().DrawKey(event.key); 
    }    
    
    
    //value = ( event.key+' ' +event.code+ ((event.altKey||event.ctrlKey||event.shiftKey)?"(":"|")+  
    //(event.altKey?" altKey ":"") + (event.ctrlKey?' ctrlKey ':'') + (event.shiftKey?' shiftKey ':'') + ((event.altKey||event.ctrlKey||event.shiftKey)?')|':''));    
    //maltyText.value = value;    
    maltyText.value = event.key;
}
maltyText.addEventListener("keydown", handleCreateKeys);

function clearBinarySearchTree(){
    for (let i =0; i<5; i++){ 
        for ( let el of array_Btn[i]){
            for (let [key,value] of Object.getOwnPropertyNames(el) ) {
                if (!ctrl_shift_key.has(key))
                    searchTree.remove(value);
            }
        }
    }
}

function clearRowKeys(){
    array_Btn.flag = false;
    clearBinarySearchTree();
    for (let i =0; i<5; i++){                
        while (array_Btn[i][0]) {
            delete array_Btn[i][0]
        }; 
        array_Btn[i].length =0;
        let nav = document.querySelector(`.row${i+1}`);
        while (nav.firstChild) 
            nav.firstChild.remove();        
    }   
    maltyText.addEventListener("keydown", handleCreateKeys);
    maltyText.addEventListener("keyup",handleCreateShiftCtrl);
}

function handleBodyKey(event){ 
    let temp = array_Btn.flat(1).find( el=> `${event.keyCode}` in el )    
    if(!temp) return;
    switch (event.type){
        case "keydown":
            temp.classList.add('focus');            
            break;
        case "keyup":
            temp.classList.remove('focus');
            break;
    }
}

document.body.removeEventListener("keyup",handleBodyKey);    
document.body.removeEventListener("keydown",handleBodyKey);    

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


