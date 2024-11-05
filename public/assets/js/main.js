import Question from './components/question.js'

export default {
    setup() {
    },
    components: {
        Question
    },
    computed: {
        getQuestion(){
            let question = this.questions[this.step];
            if(!question.Score)
                question.Score = 0;

            return question;
        },

        getSections(){
            let sections = new Set();
            this.questions.forEach(question => {
                sections.add(question.Section);
            });

            // sections.add("Total");

            return sections;
        }
    },
    data() {
        return {
            step: 0,
            scores: new Map(),
            questions: [
                {
                    "Section": "Frequency",
                    "Text": "On average, in the past week, how often did you experience urge-to-cough sensations (e.g. throat irritation, tickle, feeling of something stuck)?",
                    "Options": [
                        "Never",
                        "Hardly ever",
                        "A few times",
                        "Several times",
                        "Many times",
                        "A great many times",
                        "All the time"
                    ]
                },
                {
                    "Section": "Frequency",
                    "Text": "On average, in the past week, how often did you cough in response to triggers (e.g., smoke, talking, changes in temperature, exercise, etc.)?",
                    "Options": [
                        "Never",
                        "Hardly ever",
                        "A few times",
                        "Several times",
                        "Many times",
                        "A great many times",
                        "All the time"
                    ]
                },
                {
                    "Section": "Intensity",
                    "Text": "On average, in the past week, how often were you able to control your cough?",
                    "Options": [
                        "All the time",
                        "Almost all the time",
                        "Most of the time",
                        "Some of the time",
                        "A little of the time",
                        "Hardly ever",
                        "Never"
                    ]
                },
                {
                    "Section": "Frequency",
                    "Text": "On average, in the past week, how ofen did you cough during the day while awake?",
                    "Options": [
                        "Never",
                        "Hardly ever",
                        "A few times",
                        "Several times",
                        "Many times",
                        "A great many times",
                        "All the time"
                    ]
                },
                {
                    "Section": "Intensity",
                    "Text": "On average, in the past week, how ofen did coughing disturb your sleep at night?",
                    "Options": [
                        "Never",
                        "Hardly ever",
                        "A few times",
                        "Several times",
                        "Many times",
                        "A great many times",
                        "All the time"
                    ]
                },
                {
                    "Section": "Intensity",
                    "Text": "On average, in the past week, how ofen did you experience prolonged episodes/bouts of coughing?",
                    "Options": [
                        "Never",
                        "Hardly ever",
                        "A few times",
                        "Several times",
                        "Many times",
                        "A great many times",
                        "All the time"
                    ]
                },
                {
                    "Section": "Intensity",
                    "Text": "In the past week, how long, on average, have your episodes/bouts of cough lasted?",
                    "Options": [
                        "Not at all long",
                        "A little long",
                        "Somewhat long",
                        "Moderately long",
                        "Quite long",
                        "Very long",
                        "Extremely long"
                    ]
                },
                {
                    "Section": "Intensity",
                    "Text": "On average, in the past week, how harsh was your cough?",
                    "Options": [
                        "Not at all harsh",
                        "A little harsh",
                        "Somewhat harsh",
                        "Moderately harsh",
                        "Quite harsh",
                        "Very harsh",
                        "Extremely harsh"
                    ]
                }
            ]
        }
    },
    methods: {
        updateAnswer(questionIndex, answer){
            this.questions[questionIndex].Score = parseInt(answer);

            // go  to next question
            let nextQuestionIndex = questionIndex + 1;
            let nextQuestion = document.getElementById("scrollspyQuestion-" + nextQuestionIndex);
            if(nextQuestion) {
                nextQuestion.scrollIntoView();

                // make sure next question is visible
                // nextQuestion.classList.remove("overlay");
            }
                
        },

        calculateScores(){
            let counts = new Map();
            let scores = new Map();
            
            counts.set("Total", 0);
            scores.set("Total", 0);

            this.questions.forEach(question => {
                if(!counts.has(question.Section))
                    counts.set(question.Section, 0);

                if(!scores.has(question.Section))
                    scores.set(question.Section, 0);

                if(question.Score)
                {
                    let score = scores.get(question.Section);
                    scores.set(question.Section, score + question.Score);

                    let total = scores.get("Total");
                    scores.set("Total", total + question.Score);
                }
                
                counts.set(question.Section, counts.get(question.Section) + 1);
                counts.set("Total", counts.get("Total") + 1);
            });

            [...counts.keys()].forEach(key => {
                let score = scores.get(key);
                let count = counts.get(key);
                let average = score / count;
                scores.set(key, average);
            })

            this.scores = scores;
        },

        submit(){
            this.calculateScores();
            this.step=this.questions.length + 1;
        },

        isInViewport() {
            const middleOfScreen = $(window).scrollTop() + $(window).height()/3;
            const numberOfElements = $('.question-wrapper').length;

            for (let index = 0; index < numberOfElements; index++) {
                const element = $('#scrollspyQuestion-' + index);
                const elementHeight = element.outerHeight();
                
                let topOfElement = 0;
                if (element.length) {
                    topOfElement = element.offset().top;
                }
                
                const bottomOfElement = topOfElement + elementHeight;

                if ((middleOfScreen > topOfElement) && (middleOfScreen <  bottomOfElement)){
                        element.removeClass('overlay');
                    } else {
                        element.addClass('overlay');
                }

                // if at top of page show element
                // if(index == 0 && ($(window).scrollTop() == 0)){
                //     // $('#scrollspyQuestion-' + (index - 1)).addClass('overlay'); // hide second last question
                //     element.removeClass('overlay');
                // }

                // if at bottom of page show element
                if(index == numberOfElements - 1 && ($(window).scrollTop() + $(window).height() == $(document).height())){
                    $('#scrollspyQuestion-' + (index - 1)).addClass('overlay'); // hide second last question
                    element.removeClass('overlay');
                }
                    
            }
        },

        round(number, decimalPlaces) {
            return (Math.round(number * 100) / 100).toFixed(decimalPlaces)
        }
    },
    mounted(){

        // set scores to zero if nothing selected
        this.calculateScores();

        var vueObj = this;
        $(document).ready(function(){
            // remove overlay from first question
            $('#scrollspyQuestion-0').removeClass('overlay');

            $(window).on( 'scroll', function(){
                vueObj.isInViewport();
            });
        });

        
        // const firstScrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
        // firstScrollSpyEl.addEventListener('activate.bs.scrollspy', (event) => {
            

        //     let activeIndex = event.relatedTarget.getAttribute("href").split("-")[1];
        //     console.log("scrolled past", event.relatedTarget, activeIndex);

        //     for(let i = 0; i < this.questions.length; i++){
        //         let el = document.getElementById("scrollspyQuestion-" + i);
        //         if(i == activeIndex) {
        //             el.classList.remove("overlay");
        //         }
        //         else {
        //             el.classList.add("overlay");
        //         }

        //         console.log(activeIndex, el);
        //     }
        // })
            
    },
    template: /*html*/`
        <nav class="navbar" style="background-color: #7A003C">
            <div class="container-fluid">
            <a class="navbar-brand ps-3" href="#" style="color: #FDBF57">
                <!--<img src="/assets/images/mcmaster-logo-2024-col-768x768.jpg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">-->
                McMaster University Cough Study
            </a>
            </div>
        </nav>

        <main class="container pt-5">
            <div class="rounded pt-3">
                <div class="row">
                    <div class="col-xl-8 col-10 mx-auto">
                        <div class="my-3">
                            <h1>McMaster Cough Severity Questionnaire</h1>
                            <p class="lead">This questionnaire is intended to measure the severity of your cough. It is for informational purposes only.</p>


                            <hr class="my-4"/>

                            <div v-if="this.step < this.questions.length">
                                <p>Select the response that best describes how you have been in the past week.</p>

                                <div>
                                    <div data-bs-spy="scroll" data-bs-smooth-scroll="true">
                                        <div class="question-wrapper overlay py-5" :id="'scrollspyQuestion-' + index" v-for="(question, index) in this.questions">
                                            <Question class="py-5"
                                                :Index="index + 1"
                                                :Text="question.Text"
                                                :Options="question.Options"
                                                :Score="question.Score"

                                                @updated="answer => this.updateAnswer(index, answer)"
                                            >
                                            </Question>
                                        </div>

                                        <hr class="my-4"/>

                                        <div class="d-flex">
                                            <div class="mx-auto">
                                                <!--<button v-if="this.step + 1 < this.questions.length" class="btn btn-primary" @click="this.step++">
                                                    Next >
                                                </button>-->
                                                <button class="btn btn-primary" @click="this.submit()">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <p>Please show this page to the study investigator</p>
                                <div>
                                    <div>
                                        <div class="border rounded p-3 m-3 text-center">
                                            <h4>Cough Score</h4>
                                            <h3>{{this.round(this.scores.get("Total"), 2)}}</h3>
                                        </div>

                                        <div class="d-flex">
                                            <div class="col-lg-6 col p-3" v-for="section in this.getSections">
                                                <div class="border rounded p-3 text-center">
                                                    <h4>{{section}}</h4>
                                                    <h3>{{this.round(this.scores.get(section), 2)}}</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <!--<table class="table mb-5">
                                            <thead>
                                                <tr>
                                                    <th>Section</th>
                                                    <th>Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="section in this.getSections">
                                                    <td class="p-2 pe-4" style="width: 1%">{{section}}</td>
                                                    <td class="p-2">{{(Math.round(this.scores.get(section) * 100) / 100).toFixed(2)}}</td>
                                                </tr>
                                            </tbody>
                                        </table>-->

                                        <div class="mt-5">
                                            <div class="d-grid gap-2">
                                                <button class="btn btn-primary" @click="this.step = 0">
                                                    Take the questionnaire again
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer-->
        <footer class="footer bg-black small text-center text-white-50">
            <div class="container px-4 px-lg-5"></div>
        </footer>`
}