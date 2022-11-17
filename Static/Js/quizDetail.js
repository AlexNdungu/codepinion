//Here we send a friends request


let initReq = document.getElementById('sendHand');

//The form
let requestOwnerForm = document.getElementById('sendReqFormOwner');

//The receiver and sender
let ownerSender = document.getElementById('senderIn');

let ownerReceiver = document.getElementById('receiverIn');

//now the two submit buttons
let ownerBtnSubmit = document.getElementById('btnSendReqQuizOwner');

let bostrapOwnSend = document.getElementById('bostrapOwnSend');

//Csrf
let csrf = document.getElementsByName('csrfmiddlewaretoken');


bostrapOwnSend.addEventListener('click', ()=> {

    //Here we click the submit button

    ownerBtnSubmit.click();

});

//Here we submit the form

requestOwnerForm.addEventListener('submit', e=> {
    e.preventDefault();

    let formData = new FormData();

    //The request sender
    formData.append('sender',ownerSender.value);
    //The request receiver
    formData.append('receiver',ownerReceiver.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    //Now let use send the data
    $.ajax({
        type:'POST',
        url:'/Room/handShake/',
        data: formData,
        processData: false,
        contentType: false,

        //The success
        success: function(response){

            console.log(response)

            requestOwnerForm.reset();

            initReq.style.pointerEvents = "none";

            initReq.classList.add('greetAct');

            setTimeout(function(){

                document.getElementById('requestClose').click();
                
            },1000);



        },
        error: function(error){
            console.log(error)

            requestOwnerForm.reset();

            setTimeout(function(){

                document.getElementById('requestClose').click();
                
            },1000);

        }
    })


})