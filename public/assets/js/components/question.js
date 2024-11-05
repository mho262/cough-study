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
          // this.score = newVal
        }
    },
    data() {
        return {
        }
    },
    methods: {
        answerChanged(event) {
            this.$emit("updated", event.target.value)
        }
    },
    template: /*html*/`
    <div>
        <div class="d-flex">
           <div>{{this.Index}}.</div>
           <div class="ms-3">
                <div>{{this.Text}}</div>

                <div class="ms-3 mt-3">
                    <div class="form-check my-2" v-for="(option, index) in this.Options">
                        <input class="form-check-input" type="radio" :name="'questionOptionsGroup_' + this.Index" :id="'questionOptionsGroup_' + this.Index + '_questionOption_' + index" :value="index" @change="this.answerChanged" :checked="index == this.Score">
                        <label class="form-check-label" :for="'questionOptionsGroup_' + this.Index + '_questionOption_' + index">
                            {{option}}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}