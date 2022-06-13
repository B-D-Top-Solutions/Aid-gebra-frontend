<template>
    <Navigation/>
    <br/>
    <div class="container py-5">
        <div class="d-flex flex-column align-items-center">
            <select class="form-control" style="max-width:350px" v-on:change="(e) => setClass(e.target.value)">
                <option value="" class="text-center">--Select classroom--</option>
                <option v-for="e in classes" v-bind:key="e._id" :value="e._id" class="text-center" :selected="`${this.$route.params.class ? 'true' : 'false'} `">
                    <small class="d-block text-muted ">[{{e.code}}]</small> &nbsp;{{e.name}}
                </option>
            </select>
        </div>

        <div class="d-flex mt-4 mb-5" v-if="this.$route.params.class">
            <span class="flex-fill pe-3">
                <input :key="key" @click="content_type='lesson'" type="radio" class="btn-check" name="options-outlined" id="success1" value="lesson">
                <label class="btn btn-outline-success btn-sm w-100 d-block" for="success1">Lessons</label>
            </span>
            <span class="flex-fill pe-3">
                <input :key="key" @click="content_type='concept'" type="radio" class="btn-check" name="options-outlined" id="success2" value="concept">
                <label class="btn btn-outline-success btn-sm w-100 d-block" for="success2">Concepts</label>
            </span>
            <span class="flex-fill pe-3">
                <input :key="key" @click="content_type='lecture'" type="radio" class="btn-check" name="options-outlined" id="success3" value="lecture">
                <label class="btn btn-outline-success btn-sm w-100 d-block" for="success3">Lectures</label>
            </span>
            <span class="flex-fill pe-3">
                <input :key="key" @click="content_type='question'" type="radio" class="btn-check" name="options-outlined" id="success4" value="assessment">
                <label class="btn btn-outline-success btn-sm w-100 d-block" for="success4">Questions</label>
            </span>
            <span class="flex-fill pe-3">
                <input :key="key" @click="content_type='pretest'" type="radio" class="btn-check" name="options-outlined" id="success5" value="pretest">
                <label class="btn btn-outline-success btn-sm w-100 d-block" for="success5">Pre test</label>
            </span>
            <span class="flex-fill pe-3">
                <input :key="key" @click="content_type='posttest'" type="radio" class="btn-check" name="options-outlined" id="success6" value="posttest">
                <label class="btn btn-outline-success btn-sm w-100 d-block" for="success6">Post test</label>
            </span>
        </div>

        <Lessons v-if="content_type == 'lesson'"/>
        <Concepts v-if="content_type == 'concept'"/>
        <Lectures v-if="content_type == 'lecture'"/>
        <Questions v-if="content_type == 'question'"/>
        <Pretests v-if="content_type == 'pretest'"/>
        <Posttests v-if="content_type == 'posttest'"/>
    </div>
</template>

<script>
import axios from "axios"
import Navigation from '../../components/admin/navigation.vue'
import Lessons from '../../components/admin/lessons.vue'
import Lectures from '../../components/admin/lectures.vue'
import Concepts from '../../components/admin/concepts.vue'
import Questions from '../../components/admin/questions.vue'
import Pretests from '../../components/admin/pretests.vue'
import Posttests from '../../components/admin/posttests.vue'
import auth from '../../utils/authHeader'

export default {
    name : 'admin-class',
    components : {
        Navigation,Lessons,
        Concepts,Lectures,Questions,
        Pretests,Posttests
    },
    data() {
        return {
            classes : [],
            content_type : null,
            key : 1
        }
    },
    mounted () {
        auth("admin")

        this.getClass()
    },
    methods : {
        async  getClass() {
            try{
                const entry =  await axios
                .get(
                    import.meta.env.VITE_SERVER+
                    "/api/classes",
                )

                const res = entry.data
                console.log("CLASS")
                console.log(res)
                if(!res.status) throw res.error
                this.classes = res.data

                if(this.$route.params.class) this.setClass(this.$route.params.class)
            }
            catch(error){
                console.log(error)
                alert(error)
            }
        },
        setClass(class_id) {
            this.$router.push({ name: 'admin-class', 
                params: { 
                    class: class_id
                }
            })
            this.content_type = null
            this.key =+ Math.random(1)
        },
        
    }
}
</script>