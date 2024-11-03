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

            sections.add("Total");

            return sections;
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

            return scores;
        }
    },
    data() {
        return {
            step: 0,
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

            console.log(this.questions);
        },

        submit(){

        }
    },
    template: /*html*/`<!-- Navigation-->   
        <main class="container">
            <div class="rounded">
                <div class="row">
                    <div class="col-xl-8 col-10 mx-auto">
                        <div class="my-3">
                            <h1>Cough Study Questionnaire</h1>
                            <p class="lead">This questionnaire is intended to measure the severity of your cough.</p>

                            <hr class="my-4"/>

                            <div v-if="this.step < this.questions.length">
                                <p>Select the response that best describes how you have been in the past week.</p>

                                <div>
                                    <div class="">
                                        <Question class="my-2" v-for="(question, index) in this.questions"
                                            :Index="index + 1"
                                            :Text="question.Text"
                                            :Options="question.Options"
                                            :Score="question.Score"

                                            @updated="answer => this.updateAnswer(index, answer)"
                                        >
                                        </Question>

                                        <hr class="my-4"/>

                                        <div class="d-flex">
                                            <div class="mx-auto">
                                                <!--<button v-if="this.step + 1 < this.questions.length" class="btn btn-primary" @click="this.step++">
                                                    Next >
                                                </button>-->
                                                <button class="btn btn-primary" @click="this.step=this.questions.length + 1">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <p>Please show this page to your health practitioner</p>
                                <div>
                                    <div>
                                        <h4>Calculated scores</h4>
                                        <table class="table mb-5">
                                            <thead>
                                                <tr>
                                                    <th>Section</th>
                                                    <th>Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="section in this.getSections">
                                                    <td class="p-2 pe-4" style="width: 1%">{{section}}</td>
                                                    <td class="p-2">{{this.calculateScores.get(section)}}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div class="d-flex">
                                            <div class="">
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