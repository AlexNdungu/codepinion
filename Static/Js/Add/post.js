//Here we will create a question using ajax call

//here we importthe list containing the tags
import {tagsArray} from './add.js'

//Here we import the array containing the frameworks
import {framesArray} from './add.js'

//This is the title of the question
let quizTitle = document.getElementById('title');

//The rich edit text
let richText = document.getElementById('richEdit');

//This are the code blocks
import {editor1Value,editor2Value,editor3Value,editor4Value} from './code.js'

//Here we collect the languages indicated in the code blocks
let lang1 = document.getElementById('code_1_lang');
let lang2 = document.getElementById('code_1_lang1');
let lang3 = document.getElementById('code_1_lang2');
let lang4 = document.getElementById('code_1_lang3');



//Here we take the images
let quizMedia = document.getElementById('myInputDrop');

import {inputDrop} from './drop.js'


//Lets create a form using js
let formCreate = document.getElementById('revBtn');


let childEl = document.getElementById('goChangeArea');


//Here we are appending the form

formCreate.addEventListener('click', ()=> {


    setTimeout(function(){

        var parent = childEl.parentNode;
        var wrapper = document.createElement('form');

        parent.replaceChild(wrapper, childEl);

        wrapper.appendChild(childEl);

        wrapper.setAttribute("id","greatForm");
        wrapper.setAttribute("method","POST");
        
    },1000);

})


//Here we remove the form 
let removeForm = document.getElementById('actBtnEdit');

removeForm.addEventListener('click', ()=> {

    document.getElementById('goChangeQuizNow').click();

    let greatForm = document.getElementById('greatForm');

    let childNew = document.getElementById('goChangeArea')

    //childEl.parentElement.remove()

    setTimeout(function(){

        greatForm.replaceWith(childNew);
        
    },100);

    //greatForm.removeChild(childNew);

})


//NOW LETS USE AJAX TO POST THE QUESTION

//Lets get the csrf token
let csrf = document.getElementsByName('csrfmiddlewaretoken');

let submitGreatForm = document.getElementById('submitGreatForm');


let createForm = document.getElementById('createForm');

createForm.addEventListener('click', ()=> {
    submitGreatForm.click();
    //console.log(quizTitle.value)
    console.log(quizMedia.files)

});



//Here we set the csrf token 

const getCookie =(name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


//Here we display none the alert
$('#statusSubmit').hide();

submitGreatForm.addEventListener('click', ()=> {
    console.log('click')
    console.log(quizTitle.value)

    if(document.getElementById('greatForm') !== null){

        let greatForm = document.getElementById('greatForm');

        greatForm.addEventListener('submit', e=> {
            e.preventDefault();
            console.log(csrftoken)

            //Now we perform the ajax call

            //First we create form data
            let formData = new FormData();

            //Append to form data
            //for (const tag in tagsArray){
                //formData.append('Tags',tag);
                //console.log(tag)
            //}

            for(let item = 0; item < tagsArray.length; item++ ){
                console.log(tagsArray[item])
                formData.append('Tags',tagsArray[item]);
            }

            for(let item = 0; item < framesArray.length; item++ ){
                console.log(framesArray[item])
                formData.append('Frameworks',framesArray[item]);
            }
            //formData.append('Frameworks',JSON.stringify(framesArray));
            formData.append('Title',quizTitle.value);
            formData.append('Body',richText.innerHTML);
            formData.append('lang1',lang1.value);
            formData.append('code1',editor1Value);
            formData.append('lang2',lang2.value);
            formData.append('code2',editor2Value);
            formData.append('lang3',lang3.value);
            formData.append('code3',editor3Value);
            formData.append('lang4',lang4.value);
            formData.append('code4',editor4Value);

            for (const file of inputDrop.files) {
                formData.append("medias", file);
            }

            //formData.append('medias',inputDrop.files);
            formData.append('csrfmiddlewaretoken', csrf[0].value);


            $.ajax({
                type:'POST',
                url:'/greatForm/',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response){
                    console.log(response)

                    //Scroll to the top of the body
                    document.getElementById('actBtnEdit').click();

                    $('#statusSubmit').show();

                    $('#navigation').hide();

                  
                    setTimeout(function(){

                        //Show success color
                        document.getElementById('colorAlert').classList.add('success');

                        //Show success message
                        document.getElementById('message').innerText = "Question Creation Successfull";
                        
                    },1000);

                    setTimeout(function(){

                        $('#statusSubmit').hide(100);

                        $('#navigation').show(100);

                        //$("#newContainer").css('padding-top', '200px');
                        
                    },2500);


                },
                error: function(error){
                    console.log(error)

                    document.getElementById('actBtnEdit').click();

                    $('#statusSubmit').show();

                    $('#navigation').hide();

                    
                    setTimeout(function(){

                        //Show success color
                        document.getElementById('colorAlert').classList.add('failed');

                        //Show success message
                        document.getElementById('message').innerText = "Question Creation Failed";

                
                    },1000);

                    setTimeout(function(){

                        $('#statusSubmit').hide(100);

                        $('#navigation').show(100);
                        
                    },2500);

        
                }
            })

        });

    }
    

});


//Here we listen to the submit event of the great form 

