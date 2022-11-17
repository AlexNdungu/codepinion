$(document).ready(function(){

    $('#noQuiz').hide();

    //Now lets update the list of questions using ajax call

    const getQuestions = () =>{

        $.ajax({

            type:'GET',
            url:'/loadAnswered/',
            success: function(response){
                console.log(response.quizs);

                //Here we append to the question section

                const data = response.quizs;

                $('#allQuiz').empty();

                if(data.length > 0){

                    for(let oneQ = 0; oneQ < data.length; oneQ++){

                    
                        let quiz = `
    
                        <a  class="removeUnder" href="/Question_Detail/${data[oneQ].quiz_id}/">
    
                        <div class="indNewQuiz">
    
                        <!--This contains the user pic, name and time the question was posted-->
    
                        <div class="userTime">
    
                            <!--The user detail -->
    
                            <div class="userNewQuiz">
    
                                <!--contains the user image-->
                                <div class="newUserImg">
                                    <img src="${data[oneQ].profile}" alt="theUserImage">
                                </div>
    
                                <span class="newQuizUserName" >${data[oneQ].Full_name}</span>
    
                            </div>
    
    
                            <!--The time the question was posted-->
                            <h4 class="hrsNew" >${data[oneQ].create_date}</h4>
    
                        </div>
    
    
                        <!--Contains the question title-->
    
                        <div class="newQuizTitle">
    
                            <h2>${data[oneQ].title}</h2>
    
                        </div>
    
                        
                        <!--This div contains tags and controls-->
                        <div class="tagsContsNew">
    
                            <!--The tags-->
                            <div class="newTags">
    
                                
    
                            </div>
    
                            <!--New controls-->
    
                            <div class="newControls">
    
                                <!--Checked annswer-->
    
                                <div class="newCheck">
    
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 6.278l-11.16 12.722-6.84-6 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.278zm-22.681 5.232l6.835 6.01-1.314 1.48-6.84-6 1.319-1.49zm9.278.218l5.921-6.728 1.482 1.285-5.921 6.756-1.482-1.313z"/></svg>
    
                                </div>
    
                                <!--No of answers-->
    
                                <div class="newAnswers">
    
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 1v16.981h-13l-7 5.02v-5.02h-4v-16.981h24zm-6 5.285l-6.622 7.715-4.378-3.852 1.319-1.489 2.879 2.519 5.327-6.178 1.475 1.285z"/></svg>
    
                                    <div class="newNumber">
                                        <span>20</span>
                                    </div>
    
                                </div>
    
                                <!--No of views-->
    
                                <div class="newViews">
    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
    
                                    <div class="newNumber">
                                        <span>20</span>
                                    </div>
    
                                </div>
    
                                <!--No of upvotes-->
    
                                <div class="newVotesQuiz">
    
                                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.001 10.978h-3.251c-.412 0-.75-.335-.75-.752 0-.188.071-.375.206-.518 1.685-1.775 4.692-4.945 6.069-6.396.189-.2.452-.312.725-.312.274 0 .536.112.725.312 1.377 1.451 4.385 4.621 6.068 6.396.136.143.207.33.207.518 0 .417-.337.752-.75.752h-3.251v9.02c0 .531-.47 1.002-1 1.002h-3.998c-.53 0-1-.471-1-1.002z" fill-rule="nonzero"/></svg>
    
                                    <div class="newNumber">
                                        <span>20</span>
                                    </div>
    
                                </div>
    
    
                            </div>
    
                        </div>
                        
    
                        </div>
                        </a>
    
                        `
    
    
                        $("#allQuiz").append(quiz);
    
                        let newAllTags = document.querySelectorAll('.newTags')
    
                        for(let tagOne = 0; tagOne < data[oneQ].tags.length; tagOne++){
                            console.log(data[oneQ].tags[tagOne]);
    
                            let newTT = `<div class="newIndTags">
                            <span>${data[oneQ].tags[tagOne]}</span>
                            </div>`
    
                            newAllTags[oneQ].innerHTML += newTT
    
                            //$(".newTags").append(newTT)
    
                        }
    
    
                    }

                    $('#noQuiz').hide(100);

                }
                else{

                    $('#noQuiz').show(100);

                }


            },
            error: function(error){
                console.log(error)
            },

        })

    }

    setInterval(function() {

        //Call The fuction
        getQuestions()

        $('#loading').hide(100);

    }, 10000);


});
