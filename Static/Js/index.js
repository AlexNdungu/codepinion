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

    
    $('#authTog').click(function(){

        $('#auth').show(400);
        
    });


    //This will close tha div

    $('#logToggle').click(function(){

        $('#auth').hide(400);
        
    });

});


