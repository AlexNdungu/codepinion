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


/* Sending request to the rest */

let sendRestToOthers = document.getElementsByClassName('toGreetOther');

let toBeSentToImg = document.getElementById('toBeSentToImg');

let toBesentTo = document.getElementsByClassName('toSendImgProfSee');

let toBeSendId = document.getElementsByClassName('toBeSendId');

let ToBeSentInput = document.getElementById('receiverInOtehr');

for(let a = 0; a < sendRestToOthers.length; a++){

    sendRestToOthers[a].addEventListener('click', ()=> {

        console.log(sendRestToOthers[a].parentNode.parentNode.getElementsByClassName('toBeSendId')[0].innerHTML)

        toBeSentToImg.src = sendRestToOthers[a].parentNode.parentNode.parentNode.getElementsByClassName('toSendImgProfSee')[0].src;

        ToBeSentInput.value = sendRestToOthers[a].parentNode.parentNode.getElementsByClassName('toBeSendId')[0].innerHTML;

    });

}