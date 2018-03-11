var mas = [];
if(localStorage.getItem('KeyOfLocStor')!=undefined){
    mas = JSON.parse(localStorage.getItem('KeyOfLocStor'));
    for(var i = 0; i <= mas.length-1; i++){
        var textValue = mas[i].text;
        var checkValue = mas[i].check;
        addRowToDom(textValue, checkValue);
    }
}
function clickFromPage(){
    addRowToDom('', false);
    addRowTolocSto('', false);
}
function addRowToDom(textValue, checkValue){
    var div = document.createElement('div');
        div.className = 'divClass';
    var textField = document.createElement('input');
        textField.className = 'txt';
        textField.value = textValue;
    var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'check';
        checkBox.checked = checkValue;
    var del = document.createElement('input');
        del.type = 'button';
        del.value = 'del';
        del.className = 'delRow';
    var save = document.createElement('input');
        save.type = 'button';
        save.value = 'save';
        save.className = 'save';
    div.appendChild(del);
    div.appendChild(textField);
    div.appendChild(checkBox);
    div.appendChild(save);
    container.insertBefore(div, container.firstChild);
}
function addRowTolocSto(text, check){
    var ob = {};
        ob.text = text;
        ob.check = check;
        mas.push(ob);
    var serialObj = JSON.stringify(mas);  
        localStorage.setItem('KeyOfLocStor', serialObj);
}
var buttonsDel = document.getElementsByClassName('delRow');
container.addEventListener("click", function(event) {
    if(event.target.className == 'delRow'){
        var elem = event.target;
        var indexOfElem = [].indexOf.call(buttonsDel, event.target);
            elem.parentNode.remove();
        if(localStorage.getItem('KeyOfLocStor')!=undefined){
    mas = JSON.parse(localStorage.getItem('KeyOfLocStor'));
            mas.splice(indexOfElem, 1);
            var serialTodoRows = JSON.stringify(mas);
            localStorage.setItem('KeyOfLocStor', serialTodoRows);
        }
    }
}); 

container.addEventListener('click', function(event){
    if(event.target.className == 'save'){
        var elem = event.target;
        var buttonsSave = document.getElementsByClassName('save');
        var indexOfElem = [].indexOf.call(buttonsSave, event.target);
            var txt = elem.parentNode.getElementsByClassName('txt');
            var check = elem.parentNode.getElementsByClassName('check')
        var valueTxt = txt[0].value;
        var valueCheck = check[0].checked;
        if(localStorage.getItem('KeyOfLocStor')!=undefined){
    mas = JSON.parse(localStorage.getItem('KeyOfLocStor'));
    var ob = mas[indexOfElem];
        ob.text = valueTxt;
        ob.check = valueCheck;
    var serialObj = JSON.stringify(mas);
        localStorage.setItem('KeyOfLocStor', mas);
        localStorage.setItem('KeyOfLocStor', serialObj);
}
    }
});

    






















