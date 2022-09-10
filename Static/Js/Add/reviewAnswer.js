hljs.highlightAll();

//This event fills the tags space
revBtn.addEventListener('click', ()=> {

    console.log('click');


    setTimeout(function(){


        //This is to populate the code 1 view section
        editor1ValueFunc();

        //This is to populate the code 2 view section
        editor2ValueFunc();

        //This is to populate the code 3 view section
        editor3ValueFunc();

        //This is to populate the code 3 view section
        editor4ValueFunc();

        //Letgs go to review section
        document.getElementById('btGoRev').click();
        
    },100);

})




//Here we replace the body section 
//Lets first take the editable section value

let editableSection = document.getElementById('richEdit');

let bodyArea = document.getElementById('BodyFill');


editableSection.addEventListener('input', ()=> {

    console.log('change');

    bodyArea.innerHTML = editableSection.innerHTML;

})



//Lets import the values of the codeblocks

import {editor1Value,editor2Value,editor3Value,editor4Value} from './code.js'

//This fuction will hold the value of code editor 1 and assign it to display

$('#codeRevChange').css('font-size','16px');

let code1See = document.getElementById('codeRevChange');

let langCode1 = document.getElementById('codeLangRev');

let langCode1Define = document.getElementById('code_1_lang');

function editor1ValueFunc(){

    //code1See.innerHTML = escape(editor1Value);

    code1See.innerHTML = editor1Value;

    langCode1.innerHTML = langCode1Define.value;

    code1See.classList.add(langCode1Define.value);

    //This will highlight the cod

    setTimeout(function(){

        hljs.highlightAll();
        
    },1000);

}



//here we clear the view code 1 class list

let newInp1 = document.getElementById('langArrow');

newInp1.addEventListener('click', ()=> {

    console.log('input');

    document.getElementById('codeRevChange').className = "";

});



//Here we hold the logic for code section 2

$('#codeRevChange1').css('font-size','16px');

let code2See = document.getElementById('codeRevChange1');

let langCode2 = document.getElementById('codeLangRev1');

let langCode2Define = document.getElementById('code_1_lang1');

function editor2ValueFunc(){

    code2See.innerHTML = editor2Value;

    langCode2.innerHTML = langCode2Define.value;

    code2See.classList.add(langCode2Define.value);

    //This will highlight the code
    setTimeout(function(){

        hljs.highlightAll();
        
    },100);


}


let newInp2 = document.getElementById('langArrow1');

newInp2.addEventListener('click', ()=> {

    console.log('input');

    document.getElementById('codeRevChange1').className = "";

});



//This is to populate the code 3 section

$('#codeRevChange2').css('font-size','16px');

let code3See = document.getElementById('codeRevChange2');

let langCode3 = document.getElementById('codeLangRev2');

let langCode3Define = document.getElementById('code_1_lang2');

function editor3ValueFunc(){

    code3See.innerHTML = editor3Value;

    langCode3.innerHTML = langCode3Define.value;

    code3See.classList.add(langCode3Define.value);

    //This will highlight the code
    setTimeout(function(){

        hljs.highlightAll();
        
    },100);
}

let newInp3 = document.getElementById('langArrow2');

newInp3.addEventListener('click', ()=> {

    console.log('input');

    document.getElementById('codeRevChange2').className = "";

});



//This is to populate the code 4 section

$('#codeRevChange3').css('font-size','16px');

let code4See = document.getElementById('codeRevChange3');

let langCode4 = document.getElementById('codeLangRev3');

let langCode4Define = document.getElementById('code_1_lang3');

function editor4ValueFunc(){

    code4See.innerHTML = editor4Value;

    langCode4.innerHTML = langCode4Define.value;

    code4See.classList.add(langCode4Define.value);

    //This will highlight the code
    setTimeout(function(){

        hljs.highlightAll();
        
    },100);
}

let newInp4 = document.getElementById('langArrow3');

newInp4.addEventListener('click', ()=> {

    console.log('input');

    document.getElementById('codeRevChange3').className = "";

});




/* This is the image review section */

let ImagesMedia = document.getElementById('theZone');

let theMedia = document.getElementById('myInputDrop');

let imgContainer = document.getElementById('contImRev');

ImagesMedia.addEventListener('drop', ()=> {

    //Lets loop through the files

    if(imgContainer.hasChildNodes()){

        imgContainer.innerHTML = "";

        for(var q = 0; q < theMedia.files.length ; q++){

            if(theMedia.files[q].type.startsWith("image/")){

                let lopItmem = theMedia.files[q]
            
                var src = URL.createObjectURL(lopItmem);


                imgContainer.innerHTML += `<!--The individual images-->
                                            <div class="oneImgRev">

                                                <div class="itRevImg">

                                                    <span class="codeImgName" >${theMedia.files[q].name}</span>

                                                    <img src="${src}" alt="">
                                                </div>

                                            </div>
                                            `;
                    

            };

        };

    }
    else{

        for(var q = 0; q < theMedia.files.length ; q++){

            if(theMedia.files[q].type.startsWith("image/")){

                let lopItmem = theMedia.files[q]
            
                var src = URL.createObjectURL(lopItmem);


                imgContainer.innerHTML += `<!--The individual images-->
                                            <div class="oneImgRev">

                                                <div class="itRevImg">

                                                    <span class="codeImgName" >${theMedia.files[q].name}</span>

                                                    <img src="${src}" alt="">
                                                </div>

                                            </div>
                                            `;
                    

            };

        };


    };

});