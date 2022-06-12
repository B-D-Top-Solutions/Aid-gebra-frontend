<template>
    <div v-if="pretest.length != 0">
        <span class="badge bg-success">Pre test</span>

        <div class="my-2 border-bottom" v-for="e in list" v-bind:key="e._id">
            <p class="text-dark text-boldcolor d-block mb-2">Question : {{e.question}}</p>
            <input type="text" class="form-control form-control-sm border-maincolor mb-3" v-model="answers[e.index].answer" placeholder="Your answer.."/>
            <small class="d-block border rounded fw-bold p-2 mb-1">A. {{e?.choiceA.value}}</small>
            <small class="d-block border rounded fw-bold p-2 mb-1">B. {{e?.choiceB.value}}</small>
            <small class="d-block border rounded fw-bold p-2 mb-1">C. {{e?.choiceC.value}}</small>
            <small class="d-block border rounded fw-bold p-2 mb-1">D. {{e?.choiceD.value}}</small>
        </div>

        <small class="text-muted d-block mt-4 mb-2">Please review all your answer before you submit.</small>
        <button class="btn d-block w-100 bg-main text-bolder text-light btn-lg" @click="submit()">Submit</button>
    </div>
    <!-- <slot/> = props.children -->
</template>

<script>
import axios from 'axios'
import auth from '../../utils/authHeader'
export default {
    name : "student-pretest",
    props : ['pretest'],
    data () {
        return {
            answers : [],
            list : [],
        }
    },
    mounted () {
        auth("student")
    },
    computed :{
        myPretest: function(){
            return this.pretest;
        }
    },
    watch: {
        pretest (n, o) {
            // console.log("ON WATCH")
            this.list = n.map((e,i) => {
                return {...e,index : i}
            })
            // console.log(this.list)
            // console.log("ANSWER ARRAY")
            this.answers = this.list.map(e => {
                return {
                    number : (e.index+1) + "",
                    answer : ""
                }
            })
            // console.log(this.answers)
        }
    },
    methods : {
        async submit(){
            try{
                const room = this.$route.params.id
                const lesson = this.$route.params.lesson

                const entry = await axios
                .post(
                    import.meta.env.VITE_SERVER+
                    import.meta.env.VITE_API_PRETEST_SUBMIT+room+"/lesson/"+lesson+"/pretest",
                    {answers:this.answers}
                )

                const res = entry.data
                console.log(res)
                if(!res.status) throw res.error
                alert("PRE TEST SUBMITTED!")
                setTimeout(t => location.reload(),1500)
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
    }
}
</script>