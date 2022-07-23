//THIS IS THE LANGUAGE JS

//This are all the tags
let tags = document.querySelectorAll('.indTag');
//This are all the radio buttons
let checkCheck = document.querySelectorAll('.tagStatus');
//The ticks are checked
let ticks = document.getElementsByClassName('tagTick');
//Cancel ticks tags
let cancels = document.getElementsByClassName('tagUncheck');
//The big div containing all tags
let bigTags = document.querySelectorAll('.indTag');

//let showFrames = document.querySelectorAll('.show');



  
tags.forEach((item,index) => {
    item.addEventListener('click', ()=> {
        checkCheck[index].click()
    })
});

let tagsArray = []

checkCheck.forEach((item,index) => {
    item.addEventListener('click', ()=> {

        let child = tags[index].childNodes

        if(checkCheck[index].checked){

            tagsArray.push(checkCheck[index].id)

            //console.log(tagsArray)

            //Here we toggle the the tick and cancle

            ticks[index].style.display = 'flex';

            cancels[index].style.display = 'none';

            bigTags[index].classList.add('active');

            //console.log(checkFrames.length)


        }
        else{

            let ind = tagsArray.indexOf(checkCheck[index].id); // get index if value found otherwise -1

            if (ind > -1) { //if found
                tagsArray.splice(ind, 1);
            }

            //console.log(tagsArray)

            //Here we toggle the the tick and cancle

            ticks[index].style.display = 'none';

            cancels[index].style.display = 'flex';

            bigTags[index].classList.remove('active')


        
        }

    })
});
//for(var i = 0 ; i < tags.length; i++){
    //tags[i].onclick = function(){
       // console.log(i)
    ///}
//};




//This are all the tags
let frameworks = document.querySelectorAll('.frameInd');
//This are all the radio buttons
let checkCheckFrame = document.querySelectorAll('.tagStatusFrame');
//The ticks are checked
let ticksFrame = document.getElementsByClassName('tagTickFrame');
//Cancel ticks tags
let cancelsFrame = document.getElementsByClassName('tagUncheckFrame');
//The big div containing all tags
let bigTagsFrame = document.querySelectorAll('.frameInd');


  
frameworks.forEach((item,index) => {
    item.addEventListener('click', ()=> {
        checkCheckFrame[index].click()
    })
});

let framesArray = []

checkCheckFrame.forEach((item,index) => {
    item.addEventListener('change', ()=> {

        let allFrames = document.querySelectorAll('.allFrames');

        if(checkCheckFrame[index].checked){
            //console.log(checkCheckFrame[index].id)



            framesArray.push(checkCheckFrame[index].id)

            console.log(framesArray)

            //Here we toggle the the tick and cancle

            ticksFrame[index].style.display = 'flex';

            cancelsFrame[index].style.display = 'none';

            bigTagsFrame[index].classList.add('active');

        }
        else{

            //tags.pop(checkCheck[index].id)

            //console.log(tags)

            let indFr = framesArray.indexOf(checkCheckFrame[index].id); // get index if value found otherwise -1

            if (indFr > -1) { //if found
                framesArray.splice(indFr, 1);
            }

            console.log(framesArray)

            //Here we toggle the the tick and cancle

            ticksFrame[index].style.display = 'none';

            cancelsFrame[index].style.display = 'flex';

            bigTagsFrame[index].classList.remove('active')

        }

    })
});
//for(var i = 0 ; i < tags.length; i++){
    //tags[i].onclick = function(){
       // console.log(i)
    ///}
//};


//Here we will untag frameworks which there languages are untaged

let allLangs = document.getElementById('theTags');

let allFrameDiv = document.getElementById('clickFrames');

let choosenLang = document.querySelectorAll('.tagStatus');

let containFrame = document.querySelectorAll('.allFrames');

let frameChecks = document.querySelectorAll('.tagStatusFrame');


allLangs.addEventListener('click', function(event){
   // console.log(event.target.nodeName)

   let statusShow = document.querySelectorAll('.show');

   //console.log(statusShow)

});




for (var i = 0, len = allLangs.children.length; i < len; i++)
{

    (function(index){

        allLangs.children[i].onclick = function(){


            if(choosenLang[index].checked == false){
                

                let allFrameChild = containFrame[index].children

                //console.log(allFrameChild)

                for(var cr =0; cr < allFrameChild.length; cr++){

                    let theFrameItself = allFrameChild[cr].children

                    //console.log(theFrameItself)

                    let theFrameCheck = theFrameItself[3]

                    //console.log(theFrameCheck.nodeName)

                    //console.log(theFrameItself)



                    if(theFrameCheck.nodeName == 'INPUT'){

                        for (var i = 0; i < theFrameItself.length; i++) {
                            //console.log(theFrameItself[i])

                            if(theFrameItself[3].checked == true){
                                //console.log('Checked')

                                theFrameItself[3].click()

                            }
                            else{
                                //console.log('unchecked')
                            }
                        // Do stuff
                        }

    

                    }

                    
                }
                

            }
            else{
                //console.log('true')
            }

        }    
    })(i);

}

/*

$(document).ready(function () {
    $("#theTags").click(function () {
        alert($(this).find('div.tagName').text());
    });
 });

*/



