$(document).ready(function(){

    //This will toggle report and hide

    $('.newMore').hide();

    //let showReport = false;

    $('.moreNew').each(function(){

        $(this).bind('click', function(){

            $(this).next('.newMore').toggle(400);

        });

    });

    /*  
    
    if(showReport == false){

            $(this).next('.newMore').show(400);


            showReport = true;

        }

        else{

            $(this).next('.newMore').hide(400);

            showReport = false;

        }

    */

     /*

    $('.moreNew').each(function(){

        $(this).bind('click', function(){

            if(showReport == false){

                $(this).next('.newMore').show(400);
    
    
                showReport = true;
    
            }
    
            else{
    
                $(this).next('.newMore').hide(400);
    
                showReport = false;
    
            }

        });

    });

    */


});