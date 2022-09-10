//Here we make an ajax call to get all the tags

let allTags = document.getElementById('allTags');

let allLangs = document.querySelectorAll('.Lang');

let allChecks = document.querySelectorAll('.check');

let addedT = document.querySelectorAll('.addedT');

let removedT = document.querySelectorAll('.removedT');

let allTheTags = document.querySelectorAll('.meTag');

let owned = [];

//This will include those tags to be removed
let toRemove = [];
//This are the tags to be added
let toAdd = [];

const getData = () =>{
    console.log('hello');

    //setInterval(function(){

        $.ajax({
            type:'GET',
            url:'/Profile/tags/',
            success: function(response){
                console.log(response)
    
                const data = response.data

                for(let q = 0; q<data.length;q++){
                    owned.push(data[q].name)

                }

                console.log(owned)

                for(let q = 0; q<allLangs.length;q++){
                    
                    console.log(allLangs[q].innerHTML)

                    if(owned.includes(allLangs[q].innerHTML)){
                        allChecks[q].checked = true


                        $(addedT[q]).show();
                        $(removedT[q]).hide();

                        allTheTags[q].classList.add('tAct');

                    
                    }
                    else{

                        $(addedT[q]).hide();
                        $(removedT[q]).show();

                    }

                }

    
            },
            error: function(error){
                console.log(error)
            }
        })

        
    
        
    //},1000);
    
};


//Call this fuction after 100ms

getData();


//Here we add events
let Tags = document.querySelectorAll('.meTag');

for(let q = 0; q < Tags.length; q++){
    console.log(Tags[q])
    Tags[q].addEventListener('click', ()=> {

        console.log(owned)

        if(Tags[q].classList.contains('old')){

            if(allChecks[q].checked == true){

                Tags[q].classList.remove('old');
                Tags[q].classList.add('new');
    
                console.log('yes')
    
                allChecks[q].checked = false;
    
                toRemove.push(allLangs[q].innerHTML);

                $(addedT[q]).hide(100);
                $(removedT[q]).show(100);

                allTheTags[q].classList.remove('tAct');
    
    
            }
            else if(allChecks[q].checked == false){
    
                Tags[q].classList.remove('old');
                Tags[q].classList.add('new');
    
                console.log('not');
    
                allChecks[q].checked = true;
    
                toAdd.push(allLangs[q].innerHTML);

                $(addedT[q]).show(100);
                $(removedT[q]).hide(100);

                allTheTags[q].classList.add('tAct')
    
            }

        }
        else if(Tags[q].classList.contains('new')){

            if(allChecks[q].checked == true){

                Tags[q].classList.remove('new');
                Tags[q].classList.add('old');

                allChecks[q].checked = false;

                allTheTags[q].classList.remove('tAct');

                $(addedT[q]).hide(100);
                $(removedT[q]).show(100);
                

                if(toAdd.includes(allLangs[q].innerHTML)){
                    
                    let myIndex = toAdd.indexOf(allLangs[q].innerHTML);
                    if (myIndex !== -1) {

                        toAdd.splice(myIndex, 1);

                    };


                };

            }
            else if(allChecks[q].checked == false){

                Tags[q].classList.remove('new');
                Tags[q].classList.add('old');

                allChecks[q].checked = true;

                $(addedT[q]).show(100);
                $(removedT[q]).hide(100);

                allTheTags[q].classList.add('tAct');


                if(toRemove.includes(allLangs[q].innerHTML)){
                    
                    let myIndex = toRemove.indexOf(allLangs[q].innerHTML);
                    if (myIndex !== -1) {

                        toRemove.splice(myIndex, 1);

                    };
                };
            };
        };
    });
};


//Here lets preview the profile picture and info picture

let clickChangeInfo = document.getElementById('changeInfo');

clickChangeInfo.addEventListener('click', ()=> {

    document.getElementById('updateInfoPic').click();

});


//Here we click to change the profile picture

let clickChangePro = document.getElementById('changePr');

clickChangePro.addEventListener('click', ()=> {

    document.getElementById('updateProPic').click()

});

//Activate full name edit text

let activeFName = document.getElementById('activeFName');

activeFName.addEventListener('click', ()=> {

    console.log('click') 

    document.getElementById('userNameChange').disabled = false;

    activeFName.classList.add('activeFName');

});


//Here we enable the info edit text

let enableTextIn = document.getElementById('enableTextIn');

enableTextIn.addEventListener('click', ()=> {

    console.log('click') 

    document.getElementById('textInfo').disabled = false;

    enableTextIn.classList.add('activeFName');

});



//Hide the success message
$('#message').hide();

let message = document.getElementById('message');

let innerInfo = document.getElementById('isMess');

let innerMess = document.getElementById('innerMess');


//Now lets update the profile 

//First we play around with the form

let submitNow = document.getElementById('subNow');

$(submitNow).hide();

let AddForm = document.getElementById('formFomm');

let childEl = document.getElementById('proFuja');

AddForm.addEventListener('click', ()=> {

    setTimeout(function(){

        var parent = childEl.parentNode;
        var wrapper = document.createElement('form');

        parent.replaceChild(wrapper, childEl);

        wrapper.appendChild(childEl);

        wrapper.setAttribute("id","profileUpdate");
        wrapper.setAttribute("method","POST");
        
    },100);


    setTimeout(function(){

        submitNow.click()
        
    },500);

})


//Lets submit the form

let csrf = document.getElementsByName('csrfmiddlewaretoken');

let fullname = document.getElementById('userNameChange');

let bio = document.getElementById('textInfo');

let profilePicture = document.getElementById('updateProPic');

let infoPicture = document.getElementById('updateInfoPic');

//Lets take the tag to make sure it doesnt cause a bug
let meTag = document.querySelectorAll('.meTag');


submitNow.addEventListener('click', ()=> {

    console.log('submitting...')

    let profileForm = document.getElementById('profileUpdate');


    profileForm.addEventListener('submit', e=> {

        e.preventDefault();
        //console.log(csrf)
    
        let formData = new FormData();
    
        //This are the tags to be removed form the tag list of a profile
        for(let item = 0; item < toRemove.length; item++ ){
            console.log(toRemove[item])
            formData.append('RemoveTag',toRemove[item]);
        }
    
        //This are the tags to be added to the profile
        for(let item = 0; item < toAdd.length; item++ ){
            console.log(toAdd[item])
            formData.append('AddTags',toAdd[item]);
        }
    
        //The fullname
        formData.append('FullName',fullname.value);
        //The profile info
        formData.append('Bio',bio.value);
    
        //The profile picture
        formData.append('ProfilePicture',profilePicture.files[0]);
    
        //The infomation picture
        formData.append('InfoPicture',infoPicture.files[0]);
    
        //formData.append('medias',inputDrop.files);
        formData.append('csrfmiddlewaretoken', csrf[0].value);
    
        $.ajax({
            type:'POST',
            url:'/Profile/profileForm/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){
                console.log(response)
    
                //Lets remove the form
    
                let greatForm = document.getElementById('profileUpdate');
    
                let childNew = document.getElementById('proFuja')
    
                //childEl.parentElement.remove()
    
                setTimeout(function(){
    
                    greatForm.replaceWith(childNew);
                    
                },100);
    
                window.scrollTo({ top: 0, behavior: 'smooth' });
    
                $('#message').show(100);
    
                innerMess.classList.add('prSuccess');
    
                innerInfo.innerText = "Profile Updated!!";
    
                setTimeout(function(){
    
                    $('#message').hide(100);
                    
                },2000);
    
                for(let q = 0; q < Tags.length; q++){
    
                    if(Tags[q].classList.contains('new')){
    
                        Tags[q].classList.remove('new');
                        Tags[q].classList.add('old');
    
                    }
    
                }
    
    
            },
            error: function(error){
                console.log(error)
    
                //Lets remove the form
    
                let greatForm = document.getElementById('profileUpdate');
    
                let childNew = document.getElementById('proFuja')
    
                //childEl.parentElement.remove()
    
                setTimeout(function(){
    
                    greatForm.replaceWith(childNew);
                    
                },100);
    
    
                window.scrollTo({ top: 0, behavior: 'smooth' });
    
                $('#message').show(100);
    
                innerMess.classList.add('prFailed');
    
                innerInfo.innerText = "Profile Update Failed!!";
    
                setTimeout(function(){
    
                    $('#message').hide(100);
    
                    window.location.reload();
                    
                },2000);
    
    
            }
        });
    
    
    });
    

})

//Here we discharge changes 

document.getElementById('discharge').addEventListener('click', ()=> {

    window.location.reload();

})
