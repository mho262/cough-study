export default {
    setup() {
    },
    props: {
        Index: Number,
        Text: String,
        Options: Array,
        Score: Number
    },
    watch: { 
        Score: function(newVal, oldVal) { // watch it
          this.score = newVal
        }
    },
    data() {
        return {
            score: 0
        }
    },
    methods: {
        answerChanged(event) {
            this.$emit("updated", event.target.value)
        }
    },
    template: /*html*/`
    <div>
        <div class="">
            {{this.Index}}. {{this.Text}}
        </div>
        <div class="ms-4 mt-3">
            <div class="form-check my-2" v-for="(option, index) in this.Options">
                <input class="form-check-input" type="radio" :name="'questionOptionsGroup_' + this.Index" :id="'questionOptionsGroup_' + this.Index + '_questionOption_' + index" v-model="this.score" :value="index" @change="this.answerChanged">
                <label class="form-check-label" :for="'questionOptionsGroup_' + this.Index + '_questionOption_' + index">
                    {{option}}
                </label>
            </div>
        </div>
    </div>`
}