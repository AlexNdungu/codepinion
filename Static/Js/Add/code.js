//Here we will change thevalue of the custom drop down

//This are the languages values
let languagesValues = document.querySelectorAll('.lang_value');

//This are the buttons to be clicked
let langButtons = document.querySelectorAll('.drpSing');

//this is the input we will change the value
let inputValue = document.getElementById('code_1_lang');

let dropState = false;
//This is the action

for(let val = 0; val < langButtons.length; val++){

    inputValue.value = languagesValues[0].innerHTML;

    langButtons[val].addEventListener('click', () => {
        
        //console.log(languagesValues[val].innerHTML);

        inputValue.value = languagesValues[val].innerHTML;

        document.getElementById('langArrow').click();


    });
};

//First we hide the drop down
$("#langDrop").hide();

//Now lets toggle the drop down menu
$("#langArrow").click(function(){

    if(dropState == false){
        $("#langDrop").show(300);

        $("#langArrow").css('transform','rotate(0deg)');

        dropState = true

    }
    else{
        $("#langDrop").hide(300);

        $("#langArrow").css('transform','rotate(180deg)');

        dropState = false
    }
    
})



//This section is to avail the code section

$("#codeAvail").hide();

$("#code_1").css('height', '70px');

$("#lang_mode").hide();

let code1Enabled = false;


let enable = document.getElementById('enable');

//This span is inside the button
let spanTell = document.getElementById('code1ChangeSpan');

//The span is the long statement
let longState = document.getElementById('codeTellState');

enable.addEventListener('click', () => {

    if(code1Enabled == false){

        $("#codeAvail").show(200);

        $("#lang_mode").show(400);

        $("#codeUnavail").hide(200);

        $("#enable").css({'fill':'#3ea42d','color':'#3ea42d'});

        $('#codeTellState').css('color','#3ea42d');

        $("#code_1").css('height', '500px');
        
        longState.innerHTML = 'ENABLED';

        spanTell.innerHTML = 'ENABLED';

        code1Enabled = true;

    }
    else{

        $("#codeAvail").hide(200);

        $("#codeUnavail").show(200);

        $("#lang_mode").hide(400);

        spanTell.innerHTML = 'DISABLED';

        longState.innerHTML = 'Code1 section is DISABLED';

        $('#codeTellState').css('color','');

        $("#enable").css({'fill':'','color':''});

        $("#code_1").css('height', '70px')

        code1Enabled = false;


    }

});

//Now lets deal with the editor

let editor1;

window.onload = function(){
    editor1 = ace.edit("editor");
    editor1.setTheme("ace/theme/tomorrow");
    editor1.session.setMode("ace/mode/python");
}

//Now lets set the light and dark mode

//First we hide the moon

let lightMode = true;

$("#modeDark").hide();

let modeBtn = document.getElementById('codeMode');

modeBtn.addEventListener('click', () => {

    if(lightMode == true){

        $("#modeDark").show(200);

        $("#modeLight").hide(200);

        editor1.setTheme("ace/theme/one_dark");

        lightMode = false;

    }
    else{

        $("#modeDark").hide(200);

        $("#modeLight").show(200);

        editor1.setTheme("ace/theme/tomorrow");

        lightMode = true;

    }

});

