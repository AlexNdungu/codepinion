//Lets get the drop zone area

let DropArea = document.getElementById('theZone');

export let inputDrop = document.getElementById('myInputDrop');

let images = document.getElementById('images');

//Now we prevent default

DropArea.addEventListener('dragover', e => {
    e.preventDefault();
    //console.log('over')
});

//let newList = [];

$("#dropMax").hide();


DropArea.addEventListener('drop', e => {
    e.preventDefault();
    
    //files = e.dataTransfer.files

    if(e.dataTransfer.files.length > 0 && e.dataTransfer.files.length < 5){

        $("#dropMax").hide(100);

       // console.log('hello')

        inputDrop.files = e.dataTransfer.files;

        if(images.hasChildNodes()){
            images.innerHTML = "";

            for(var q =0; q < inputDrop.files.length; q++){
        
                //console.log(inputDrop.files[q].name)

                if(inputDrop.files[q].type.startsWith("image/")){

                    let item = inputDrop.files[q];
        
                    var src = URL.createObjectURL(item);
            
                    images.innerHTML += `<div class="actDrImg">
                                            <img src="${src}" alt="">
                                        </div>`;

                }
                else{
                    images.innerHTML = "";

                    $("#myInputDrop").val('');

                    $("#dropMax").show(100);

                    document.getElementById('messageZone').innerHTML = 'Invalid File Type';

                    setTimeout(function(){
                        images.innerHTML = `<div class="remImages" id="remImages" >
            
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10h-4.083l1.271-1.396.812.396.676-.862 1.324 1.862zm.88 3h-7.88v-8h9.204c.739 1.612 2.024 1.696 3.796 2.509v4.648c-1.638-.182-3.985-.26-5.12.843zm.12-6h-6v4h6v-4zm9.17-1.833c-.806-1.165-5.031-1.924-6.742-2.167-.169.727.111 1.643.859 2.076.729.422 2.847 1.078 3.473 1.702.812.808 2.026 4.668.028 7.282-2.076-.589-4.24-.527-5.415-.048-1.153.47-1.013 1.908.189 2.045 3.42.39 7.587 1.161 10.322 4.943 0 0 1.821-1.885 4.115-4.426-3.668-3.053-4.198-7.606-6.829-11.407zm-13.92 2.833c-.138 0-.25.112-.25.25s.112.25.25.25c.139 0 .25-.112.25-.25s-.111-.25-.25-.25z"/></svg>
            
                                            <span>Max Of 4 Images</span>
                                        </div>`;
                    },100);
                }

            };
        
            //console.log(e.dataTransfer.files.length)
    

        }
        else{

            for(var q =0; q < inputDrop.files.length; q++){
        
            
                if(inputDrop.files[q].type.startsWith("image/")){

                    let lopItmem = inputDrop.files[q]
        
                    var src = URL.createObjectURL(lopItmem);
            
                    images.innerHTML += `<div class="actDrImg">
                                            <img src="${src}" alt="">
                                        </div>`;

                }
                else{
                    images.innerHTML = "";

                    $("#myInputDrop").val('');

                    $("#dropMax").show(100);

                    document.getElementById('messageZone').innerHTML = 'Invalid File Type';

                    setTimeout(function(){
                        images.innerHTML = `<div class="remImages" id="remImages" >
            
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10h-4.083l1.271-1.396.812.396.676-.862 1.324 1.862zm.88 3h-7.88v-8h9.204c.739 1.612 2.024 1.696 3.796 2.509v4.648c-1.638-.182-3.985-.26-5.12.843zm.12-6h-6v4h6v-4zm9.17-1.833c-.806-1.165-5.031-1.924-6.742-2.167-.169.727.111 1.643.859 2.076.729.422 2.847 1.078 3.473 1.702.812.808 2.026 4.668.028 7.282-2.076-.589-4.24-.527-5.415-.048-1.153.47-1.013 1.908.189 2.045 3.42.39 7.587 1.161 10.322 4.943 0 0 1.821-1.885 4.115-4.426-3.668-3.053-4.198-7.606-6.829-11.407zm-13.92 2.833c-.138 0-.25.112-.25.25s.112.25.25.25c.139 0 .25-.112.25-.25s-.111-.25-.25-.25z"/></svg>
            
                                            <span>Max Of 4 Images</span>
                                        </div>`;
                    },100);
                };
            };
        
            //console.log(e.dataTransfer.files.length)
    
        }

        //console.log(e.dataTransfer.files)
    }
    else{

        images.innerHTML = "";

        document.getElementById('messageZone').innerHTML = 'Dropzone Max Reached';

        setTimeout(function(){
            images.innerHTML = `<div class="remImages" id="remImages" >

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10h-4.083l1.271-1.396.812.396.676-.862 1.324 1.862zm.88 3h-7.88v-8h9.204c.739 1.612 2.024 1.696 3.796 2.509v4.648c-1.638-.182-3.985-.26-5.12.843zm.12-6h-6v4h6v-4zm9.17-1.833c-.806-1.165-5.031-1.924-6.742-2.167-.169.727.111 1.643.859 2.076.729.422 2.847 1.078 3.473 1.702.812.808 2.026 4.668.028 7.282-2.076-.589-4.24-.527-5.415-.048-1.153.47-1.013 1.908.189 2.045 3.42.39 7.587 1.161 10.322 4.943 0 0 1.821-1.885 4.115-4.426-3.668-3.053-4.198-7.606-6.829-11.407zm-13.92 2.833c-.138 0-.25.112-.25.25s.112.25.25.25c.139 0 .25-.112.25-.25s-.111-.25-.25-.25z"/></svg>

                                <span>Max Of 4 Images</span>
                            </div>`;
        },100);

        $("#myInputDrop").val('');

        $("#dropMax").show(100);
    }


});

inputDrop.addEventListener('drop', ()=> {
    //console.log('change')
})