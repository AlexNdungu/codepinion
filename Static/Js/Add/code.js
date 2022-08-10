//Here we disable the language inputs
document.getElementById('code_1_lang').disabled = true;
document.getElementById('code_1_lang1').disabled = true;
document.getElementById('code_1_lang2').disabled = true;
document.getElementById('code_1_lang3').disabled = true;


//Here we disable the view codes if the code area is not activated
$('#revCode1').hide();
$('#revCode2').hide();
$('#revCode3').hide();
$('#revCode4').hide();



//Here is the editor value
//Now lets deal with the editor

export let editor;
export let editor2;
export let editor3;
export let editor4;

export let editor1Value;
export let editor2Value;
export let editor3Value;
export let editor4Value;


window.onload = function(){
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.session.setMode("ace/mode/python");


    //This options belong to editor one

    editor.setOptions({
        fontSize: "15px",
        fontFamily: "Inconsolata",
    });

    //This section willl populate the review page code
    editor.session.on('change', function(delta) {
        // delta.start, delta.end, delta.lines, delta.action

        editor1Value = editor.getValue();

        //console.log(editor1Value)

    });

    //This options belong to editor 2

    editor2 = ace.edit("editor1");
    editor2.setTheme("ace/theme/tomorrow");
    editor2.session.setMode("ace/mode/python");

    editor2.setOptions({
        fontSize: "15px",
        fontFamily: "Inconsolata",
    });

    editor2.session.on('change', function(delta){

        editor2Value = editor2.getValue();

       // console.log(editor2Value)

    });


    //This option populate the editor 3

    editor3 = ace.edit("editor2");
    editor3.setTheme("ace/theme/tomorrow");
    editor3.session.setMode("ace/mode/python");

    editor3.setOptions({
        fontSize: "15px",
        fontFamily: "Inconsolata",
    });

    editor3.session.on('change', function(delta){

        editor3Value = editor3.getValue();

        console.log(editor3Value)

    });


    editor4 = ace.edit("editor3");
    editor4.setTheme("ace/theme/tomorrow");
    editor4.session.setMode("ace/mode/python");

    editor4.setOptions({
        fontSize: "15px",
        fontFamily: "Inconsolata",
    });

    editor4.session.on('change', function(delta){

        editor4Value = editor4.getValue();

        console.log(editor4Value)

    });
}



//Lets disable all the buttons

document.getElementById('enable1').disabled = true;
document.getElementById('enable2').disabled = true;
document.getElementById('enable3').disabled = true;



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

        document.getElementById('enable1').disabled = false;


        //Here we show the code 1 review space
        $('#revCode1').show();


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

        $('#revCode1').hide();


        if(document.getElementById('code1ChangeSpan1').innerHTML == 'ENABLED'){

            document.getElementById('enable1').click();


        }

        setTimeout(function(){

            document.getElementById('enable1').disabled = true;
            
        },100);


        //Here we set the value of the editor to null
        editor.setValue("");

    }

});

//Now lets set the light and dark mode

//First we hide the moon

let lightMode = true;

$("#modeDark").hide();

let modeBtn = document.getElementById('codeMode');

modeBtn.addEventListener('click', () => {

    if(lightMode == true){

        $("#modeDark").show(200);

        $("#modeLight").hide(200);

        editor.setTheme("ace/theme/one_dark");

        lightMode = false;

    }
    else{

        $("#modeDark").hide(200);

        $("#modeLight").show(200);

        editor.setTheme("ace/theme/tomorrow");

        lightMode = true;

    }

});






//Code block 2

//Here we will change thevalue of the custom drop down

//This are the languages values
let languagesValues1 = document.querySelectorAll('.lang_value1');

//This are the buttons to be clicked
let langButtons1 = document.querySelectorAll('.drpSing1');

//this is the input we will change the value
let inputValue1 = document.getElementById('code_1_lang1');

//let dropState1 = false;
//This is the action

for(let val = 0; val < langButtons1.length; val++){

    inputValue1.value = languagesValues1[0].innerHTML;

    langButtons1[val].addEventListener('click', () => {
        
        //console.log(languagesValues[val].innerHTML);

        inputValue1.value = languagesValues1[val].innerHTML;

        document.getElementById('langArrow1').click();


    });
};



let dropState11 = false;

//First we hide the drop down
$("#langDrop1").hide();

//Now lets toggle the drop down menu
$("#langArrow1").click(function(){

    if(dropState11 == false){
        $("#langDrop1").show(300);

        $("#langArrow1").css('transform','rotate(0deg)');

        dropState11 = true

    }
    else{
        $("#langDrop1").hide(300);

        $("#langArrow1").css('transform','rotate(180deg)');

        dropState11 = false
    }
    
})


//This section is to avail the code section

$("#codeAvail1").hide();

$("#code_2").css('height', '70px');

$("#lang_mode1").hide();

let code1Enabled1 = false;


let enable1 = document.getElementById('enable1');

//This span is inside the button
let spanTell1 = document.getElementById('code1ChangeSpan1');

//The span is the long statement
let longState1 = document.getElementById('codeTellState1');

enable1.addEventListener('click', () => {

    if(code1Enabled1 == false){

        $("#codeAvail1").show(200);

        $("#lang_mode1").show(400);

        $("#codeUnavail1").hide(200);

        $("#enable1").css({'fill':'#3ea42d','color':'#3ea42d'});

        $('#codeTellState1').css('color','#3ea42d');

        $("#code_2").css('height', '500px');
        
        longState1.innerHTML = 'ENABLED';

        spanTell1.innerHTML = 'ENABLED';

        code1Enabled1 = true;

        document.getElementById('enable2').disabled = false;

        $('#revCode2').show();


    }
    else{

        $("#codeAvail1").hide(200);

        $("#codeUnavail1").show(200);

        $("#lang_mode1").hide(400);

        spanTell1.innerHTML = 'DISABLED';

        longState1.innerHTML = 'Code2 section is DISABLED';

        $('#codeTellState1').css('color','');

        $("#enable1").css({'fill':'','color':''});

        $("#code_2").css('height', '70px')

        code1Enabled1 = false;

        $('#revCode2').hide();


        if(document.getElementById('code1ChangeSpan2').innerHTML == 'ENABLED'){

            document.getElementById('enable2').click();


        }

        setTimeout(function(){

            document.getElementById('enable2').disabled = true;
            
        },100);

        //Set value of editor
        editor2.setValue("");


    }

});

//Now lets deal with the editor

//let editor2;

/*

window.onload = function(){
    editor2 = ace.edit("editor1");
    editor2.setTheme("ace/theme/tomorrow");
    editor2.session.setMode("ace/mode/python");
}

*/

//Now lets set the light and dark mode

//First we hide the moon

let lightMode1 = true;

$("#modeDark1").hide();

let modeBtn1 = document.getElementById('codeMode1');

modeBtn1.addEventListener('click', () => {

    if(lightMode1 == true){

        $("#modeDark1").show(200);

        $("#modeLight1").hide(200);

        editor2.setTheme("ace/theme/one_dark");

        lightMode1 = false;

    }
    else{

        $("#modeDark1").hide(200);

        $("#modeLight1").show(200);

        editor2.setTheme("ace/theme/tomorrow");

        lightMode1 = true;

    }

});





//Code block 3

//Here we will change thevalue of the custom drop down

//This are the languages values
let languagesValues2 = document.querySelectorAll('.lang_value2');

//This are the buttons to be clicked
let langButtons2 = document.querySelectorAll('.drpSing2');

//this is the input we will change the value
let inputValue2 = document.getElementById('code_1_lang2');

//This is the action

for(let val = 0; val < langButtons2.length; val++){

    inputValue2.value = languagesValues2[0].innerHTML;

    langButtons2[val].addEventListener('click', () => {
        
        //console.log(languagesValues[val].innerHTML);

        inputValue2.value = languagesValues2[val].innerHTML;

        document.getElementById('langArrow2').click();


    });
};


let dropState12 = false;

//First we hide the drop down
$("#langDrop2").hide();

//Now lets toggle the drop down menu
$("#langArrow2").click(function(){

    if(dropState12 == false){
        $("#langDrop2").show(300);

        $("#langArrow2").css('transform','rotate(0deg)');

        dropState12 = true

    }
    else{
        $("#langDrop2").hide(300);

        $("#langArrow2").css('transform','rotate(180deg)');

        dropState12 = false
    }
    
})


//This section is to avail the code section

$("#codeAvail2").hide();

$("#code_3").css('height', '70px');

$("#lang_mode2").hide();

let code1Enabled2 = false;


let enable2 = document.getElementById('enable2');

//This span is inside the button
let spanTell2 = document.getElementById('code1ChangeSpan2');

//The span is the long statement
let longState2 = document.getElementById('codeTellState2');

enable2.addEventListener('click', () => {

    if(code1Enabled2 == false){

        $("#codeAvail2").show(200);

        $("#lang_mode2").show(400);

        $("#codeUnavail2").hide(200);

        $("#enable2").css({'fill':'#3ea42d','color':'#3ea42d'});

        $('#codeTellState2').css('color','#3ea42d');

        $("#code_3").css('height', '500px');
        
        longState2.innerHTML = 'ENABLED';

        spanTell2.innerHTML = 'ENABLED';

        code1Enabled2 = true;

        $('#revCode3').show();

        document.getElementById('enable3').disabled = false;

    }
    else{

        $("#codeAvail2").hide(200);

        $("#codeUnavail2").show(200);

        $("#lang_mode2").hide(400);

        spanTell2.innerHTML = 'DISABLED';

        longState2.innerHTML = 'Code3 section is DISABLED';

        $('#codeTellState2').css('color','');

        $("#enable2").css({'fill':'','color':''});

        $("#code_3").css('height', '70px')

        code1Enabled2 = false;

        $('#revCode3').hide();


        if(document.getElementById('code1ChangeSpan3').innerHTML == 'ENABLED'){

            document.getElementById('enable3').click();


        }

        setTimeout(function(){

            document.getElementById('enable3').disabled = true;
            
        },100);

        //Set value of editor
        editor3.setValue("");


    }

});



//First we hide the moon

let lightMode2 = true;

$("#modeDark2").hide();

let modeBtn2 = document.getElementById('codeMode2');

modeBtn2.addEventListener('click', () => {

    if(lightMode2 == true){

        $("#modeDark2").show(200);

        $("#modeLight2").hide(200);

        editor3.setTheme("ace/theme/one_dark");

        lightMode2 = false;

    }
    else{

        $("#modeDark2").hide(200);

        $("#modeLight2").show(200);

        editor3.setTheme("ace/theme/tomorrow");

        lightMode2 = true;

    }

});





//Code block 4

//Here we will change thevalue of the custom drop down

//This are the languages values
let languagesValues3 = document.querySelectorAll('.lang_value3');

//This are the buttons to be clicked
let langButtons3 = document.querySelectorAll('.drpSing3');

//this is the input we will change the value
let inputValue3 = document.getElementById('code_1_lang3');

let dropState3 = false;
//This is the action

for(let val = 0; val < langButtons3.length; val++){

    inputValue3.value = languagesValues3[0].innerHTML;

    langButtons3[val].addEventListener('click', () => {
        
        //console.log(languagesValues[val].innerHTML);

        inputValue3.value = languagesValues3[val].innerHTML;

        document.getElementById('langArrow3').click();


    });
};


let dropState13 = false;

//First we hide the drop down
$("#langDrop3").hide();

//Now lets toggle the drop down menu
$("#langArrow3").click(function(){

    if(dropState13 == false){
        $("#langDrop3").show(300);

        $("#langArrow3").css('transform','rotate(0deg)');

        dropState13 = true

    }
    else{
        $("#langDrop3").hide(300);

        $("#langArrow3").css('transform','rotate(180deg)');

        dropState13 = false
    }
    
})


//This section is to avail the code section

$("#codeAvail3").hide();

$("#code_4").css('height', '70px');

$("#lang_mode3").hide();

let code1Enabled3 = false;


let enable3 = document.getElementById('enable3');

//This span is inside the button
let spanTell3 = document.getElementById('code1ChangeSpan3');

//The span is the long statement
let longState3 = document.getElementById('codeTellState3');

enable3.addEventListener('click', () => {

    if(code1Enabled3 == false){

        $("#codeAvail3").show(200);

        $("#lang_mode3").show(400);

        $("#codeUnavail3").hide(200);

        $("#enable3").css({'fill':'#3ea42d','color':'#3ea42d'});

        $('#codeTellState3').css('color','#3ea42d');

        $("#code_4").css('height', '500px');
        
        longState3.innerHTML = 'ENABLED';

        spanTell3.innerHTML = 'ENABLED';

        code1Enabled3 = true;

        $('#revCode4').show();


    }
    else{

        $("#codeAvail3").hide(200);

        $("#codeUnavail3").show(200);

        $("#lang_mode3").hide(400);

        spanTell3.innerHTML = 'DISABLED';

        longState3.innerHTML = 'Code4 section is DISABLED';

        $('#codeTellState3').css('color','');

        $("#enable3").css({'fill':'','color':''});

        $("#code_4").css('height', '70px')

        code1Enabled3 = false;

        $('#revCode4').hide();


        //Set value of editor
        editor4.setValue("");


    }

});



//First we hide the moon

let lightMode3 = true;

$("#modeDark3").hide();

let modeBtn3 = document.getElementById('codeMode3');

modeBtn3.addEventListener('click', () => {

    if(lightMode3 == true){

        $("#modeDark3").show(200);

        $("#modeLight3").hide(200);

        editor4.setTheme("ace/theme/one_dark");

        lightMode3 = false;

    }
    else{

        $("#modeDark3").hide(200);

        $("#modeLight3").show(200);

        editor4.setTheme("ace/theme/tomorrow");

        lightMode3 = true;

    }

});