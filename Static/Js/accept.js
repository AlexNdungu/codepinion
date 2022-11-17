//Lets get the buttons to accept and decline
let allButtns = document.querySelectorAll('.recDec');
let accepts = document.getElementsByClassName('recAccept');
let declines = document.getElementsByClassName('recDecline');
let ids = document.getElementsByClassName('reId');
let details = document.getElementsByClassName('recDetails');
let recControls = document.querySelectorAll('.recControls')

let newrecDec = document.querySelectorAll('.newrecDec');

//Form Accept
let formAccept = document.getElementById('acceptForm');

let csrf = document.getElementsByName('csrfmiddlewaretoken');

let acceptClick = document.getElementById('acceptClick');

//This is the number of new requests
let newRequests = document.getElementById('AskingAcc');


//We need to check which button has been clicked

let num = ''
let acceptState = true


let recAccept1 = document.querySelectorAll('.recAccept1');
let recDec2 = document.querySelectorAll('.recDec2');

for (let i = 0; i < recAccept1.length; i++) {
    recAccept1[i].addEventListener('click', function(i) {
        console.log('You clicked element #' + i);

        setTimeout(function(){

            num = i

            acceptState = true;

        },800);

        
   }.bind(null, i));
}

for (let i = 0; i < recDec2.length; i++) {
    recDec2[i].addEventListener('click', function(i) {
        console.log('You clicked element #' + i);

        setTimeout(function(){

            num = i

            acceptState = false;


        },800);

        
   }.bind(null, i));
}




$('.recDec').click(function(event) {
    

    setTimeout(function(){
    
        acceptClick.click();

    },1000); 

});



formAccept.addEventListener('submit', e=> {
    e.preventDefault()

    if(acceptState == true)

        $.ajax({
            type:'POST',
            url:'/accept/',
            data:{
                'csrfmiddlewaretoken': csrf[0].value,
                'id':ids[num].innerHTML,
            
            },
        
            success: function(response){

                    //console.log(formData)
                console.log(response);

                let oldNum = newRequests.innerHTML;

                //console.log(oldNum)

                let newNum = parseInt(oldNum) - 1

                console.log(newNum);

                newRequests.innerHTML = newNum;

                //recAccAct

                recAccept1[num].classList.add('recAccAct');

                recDec2[num].style.display = "none";
                details[num].style.display = "none";

                    //style.display = "none";

                formAccept.reset();

                recControls[num].style.width = "max-content";  

            },
            error: function(error){
                console.log(error)
            }
        });
    
    else {

        $.ajax({
            type:'POST',
            url:'/decline/',
            data:{
                'csrfmiddlewaretoken': csrf[0].value,
                'id':ids[num].innerHTML,
            
            },
        
            success: function(response){

                //console.log(formData)
                console.log(response);

                let oldNum = newRequests.innerHTML;

                //console.log(oldNum)

                let newNum = parseInt(oldNum) - 1

                console.log(newNum);

                newRequests.innerHTML = newNum;

                //recAccAct

                declines[num].classList.add('recDecAct');

                accepts[num].style.display = "none";
                details[num].style.display = "none";

                formAccept.reset();

                recControls[num].style.width = "max-content";  

            },
            error: function(error){
                console.log(error)
            }
        });
        
    }

});