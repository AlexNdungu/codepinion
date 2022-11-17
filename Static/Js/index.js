$(document).ready(function(){

    $('#mainBody').css('background-color','#c9cbff');

    //This is the drop down menu logic

    let dropStatus = false;

    //Using Ajax Click event

    $('#midNav').hide()

    //This is the fuction for drop down menu
    $('#dropMenu').click(function(){

        if(dropStatus == false){
            //Main Nav
            $('#navigation').css("height","300px");
            //White Nav
            $('#navig').css("height","260px");
            //The new nav
            $('#midNav').show(400);
            //The new content div
            $('#newContainer').css("padding-top","300px");
            //Rotating arrow
            $('#dropMenu svg').css("transform","rotate(180deg)");

            dropStatus = true;

        }

        else
        {
            $('#navigation').css("height","");

            $('#navig').css("height","");

            //The new nav
            $('#midNav').hide(400);
            //The new content div
            $('#newContainer').css("padding-top","");
            //Rotating arrow
            $('#dropMenu svg').css("transform","rotate(0deg)");

            dropStatus = false;
        }

        console.log('click')
    });


    //This is is the authentication toggle

    //$('#auth').hide();

    //Here we either show or hide the auth place
    let logUser = document.getElementById('logUser');

    //Lets either hide or show
    if(logUser.value == 'AnonymousUser'){
        $('#auth').show();
    }
    else{
        $('#auth').hide();
    }
    


    
    /* Here we deal with the notification section */

    $('#notiication').hide()

    let showNotBtn = document.getElementById('hideX');

    let seeNewShakes = document.getElementById('seeNewShakes');

    
    seeNewShakes.addEventListener('click', ()=> {

        $('#notiication').show(400);

            
    });
    

    showNotBtn.addEventListener('click', ()=> {

        $('#notiication').hide(400);

            
    });


});




