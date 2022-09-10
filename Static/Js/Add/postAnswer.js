let currentUser = document.getElementById('currentUser').value;

$('#currentUser').hide()

console.log(currentUser)

if(currentUser == 'AnonymousUser'){
    $('#trickSee').hide()

}

//Here we create a form to submit the data
let createForm = document.getElementById('revBtn');
let childEl = document.getElementById('reviewAnswer');


createForm.addEventListener('click', ()=> {

    setTimeout(function(){

        var parent = childEl.parentNode;
        var wrapper = document.createElement('form');

        parent.replaceChild(wrapper, childEl);

        wrapper.appendChild(childEl);

        wrapper.setAttribute("id","answerForm");
        wrapper.setAttribute("method","POST");
        
    },1000);

})


//Now lets remove the form when we go back to edit the code


let reviewAnswer = document.getElementById('editAnswer');

//Here we get back to review the answer

reviewAnswer.addEventListener('click', ()=> {

    console.log('hello')
    document.getElementById('return').click()

    let answerForm = document.getElementById('answerForm');

    let childNew = document.getElementById('reviewAnswer')

    //childEl.parentElement.remove()

    setTimeout(function(){

        answerForm.replaceWith(childNew);
        
    },100);


})


//Lets get the csrf token
let csrf = document.getElementsByName('csrfmiddlewaretoken');

let submitGreatForm = document.getElementById('submitGreatForm');

let quizMedia = document.getElementById('myInputDrop');


let submitData = document.getElementById('createForm');

submitData.addEventListener('click', ()=> {
    submitGreatForm.click();
    //console.log(quizTitle.value)
    console.log(quizMedia.files)

});


//The rich edit text
let richText = document.getElementById('richEdit');

//This are the code blocks
import {editor1Value,editor2Value,editor3Value,editor4Value} from './code.js'

import {inputDrop} from './drop.js'


//Here we collect the languages indicated in the code blocks
let lang1 = document.getElementById('code_1_lang');
let lang2 = document.getElementById('code_1_lang1');
let lang3 = document.getElementById('code_1_lang2');
let lang4 = document.getElementById('code_1_lang3');

//The question owning this answer

let quizID = document.getElementById('quizID');

//The result status show
let answerSee = document.getElementById('answerSee');

$('#answerSee').hide();

//The message
let ansSeeMess = document.getElementById('ansSeeMess');


submitGreatForm.addEventListener('click', ()=> {
    console.log('click')

    if(document.getElementById('answerForm') !== null){

        let answerForm = document.getElementById('answerForm');

        answerForm.addEventListener('submit', e=> {
            e.preventDefault();
            console.log(csrf)

            //Now we perform the ajax call

            //First we create form data
            let formData = new FormData();

            
            //formData.append('Frameworks',JSON.stringify(framesArray));
            formData.append('Body',richText.innerHTML);
            formData.append('question',quizID.value);
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
                url:'/theAnswers/',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response){

                    console.log(response)

                    //Here we display the message

                    document.getElementById('editAnswer').click()

                    $('#answerSee').show(100);

                    answerSee.classList.add('anSucc')

                    ansSeeMess.innerHTML = "Answer Posted Successfullly";
                    
                    setTimeout(function(){

                        $('#answerSee').hide(100);
                        
                    },2500);


                },
                error: function(error){

                    console.log(error)

                    document.getElementById('editAnswer').click()

                    $('#answerSee').show(100);

                    answerSee.classList.add('unFail')

                    ansSeeMess.innerHTML = "Answer Posting Failed";

                    setTimeout(function(){

                        $('#answerSee').hide(100);
                        
                    },2500);
        
                }
            })

        });

    }
    

});


