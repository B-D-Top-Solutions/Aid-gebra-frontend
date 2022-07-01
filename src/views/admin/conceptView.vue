<template>
  <div class="row p-4">
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lecture A</h5>
          <p class="card-text">The Default Lecture</p>
          <RouterLink :to="{ name: 'admin-lecture-view', params: { conceptId, setType: 'A' } }" class="card-link">View</RouterLink>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lecture B</h5>
          <p class="card-text">The Special Lecture</p>
          <RouterLink :to="{ name: 'admin-lecture-view', params: { conceptId, setType: 'B' } }" class="card-link">View</RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div class="row" v-if="!isLoading">
    <div class="card">
      <div class="card-header p-4">
        <h2 class="m-auto">
          {{ concept.name }}
          <RouterLink
          class="btn btn-primary float-end"
          :to="{
            name: 'admin-lessons-view',
            params: { lessonId: concept.lessonId },
          }"
          >
            Back To Lessons
          </RouterLink>
        </h2>
      </div>
      <div class="card-body">
        <h5 class="card-title">Questions</h5>
        <div class="card my-3" v-for="(question, index) in conceptQuestions"  v-bind:key="question._id">
          <div class="card-header d-flex justify-content-between">
            <div class="">{{index + 1  }}.  Difficulty:  {{ question.difficulty }}</div>
            <div class="">
							<button
								class="shadow-sm btn btn-sm bg-main text-light mx-1"
								@click="loadQuestion(question._id)"
								data-bs-toggle="modal"
								data-bs-target="#class_modal"
							>
								Modify
							</button>
							<button
								class="shadow-sm btn btn-sm bg-danger text-light mx-1"
								@click="deleteQuestion(question._id)"
							>
								Delete
							</button>
						</div>
          </div>
          <div class="card-body">
            <h5 class="card-title" v-html="question.text"></h5>
						<p class="card-text">
              Answer: {{ question.answer }}
            </p>
            <p class="card-text">
							<p>{{ question.choiceA.value }} . <span v-html=" question.choiceA.text  "></span></p>
							<p>{{ question.choiceB.value }} . <span v-html=" question.choiceB.text  "></span></p>
							<p>{{ question.choiceC.value }} . <span v-html=" question.choiceC.text  "></span></p>
							<p>{{ question.choiceD.value }} . <span v-html=" question.choiceD.text  "></span></p>
            </p>
          </div>
          <div class="card-footer">
						Explanation:
						<p class="card-text p-2" v-html="question.explaination"></p>
					</div>
        </div>
        <button
          v-if="conceptQuestions.length < 50"
          href="#"
          class="btn btn-primary my-4"
          @click="clearModal()"
          data-bs-toggle="modal"
          data-bs-target="#class_modal"
        >
          Add Question
        </button>
      </div>
    </div>
  </div>

	<div class="modal fade" id="class_modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <input type="hidden" v-model.trim=" questionModel.id " />
          <div class="form-floating mb-3">
            <select
              v-model.trim="questionModel.difficulty"
              class="form-select"
              id="floatingSelect"
            >
              <option value="EASY">EASY</option>
							<option value="AVERAGE">AVERAGE</option>
							<option value="DIFFICULT">DIFFICULT</option>
            </select>
            <label for="floatingSelect">Difficulty</label>
          </div>		
          <div class="form mb-3">
            <label for="">Question</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model="questionModel.text"
              v-model:content="questionModel.text"
              contentType="html"
              placeholder="Enter Question"
            />
          </div>
					<div class="form mb-3">
            <label for="">Choice A</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model:content="questionModel.choiceA"
              contentType="html"
              placeholder="Enter Choice A"
            />
          </div>
					<div class="form mb-3">
            <label for="">Choice B</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model:content="questionModel.choiceB"
              contentType="html"
              placeholder="Enter Choice B"
            />
          </div>
					<div class="form mb-3">
            <label for="">Choice C</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model:content="questionModel.choiceC"
              contentType="html"
              placeholder="Enter Choice C"
            />
          </div>
					<div class="form mb-3">
            <label for="">Choice D</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model:content="questionModel.choiceD"
              contentType="html"
              placeholder="Enter Choice D"
            />
          </div>
					<div class="form-floating mb-3">
            <select
              v-model.trim="questionModel.answer"
              class="form-select"
              id="floatingSelect"
            >
              <option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
							<option value="D">D</option>
            </select>
            <label for="floatingSelect">Answer</label>
          </div>
					<div class="form mb-3">
            <label for="">Explaination</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model:content="questionModel.explaination"
              contentType="html"
              placeholder="Enter Explaination"
            />
					</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" v-if=" isUpdate " @click=" updateQuestion() " class="btn text-light bg-main">
            Save changes
          </button>
          <button type="button" v-if=" !isUpdate " @click=" createQuestion() " class="btn text-light bg-main">
            Create
          </button>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import axiosClient from '../../axios';
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  name: "admin-concepts-view",
  props: ["conceptId"],
  data() {
    return {
      isLoading: true,
      isUpdate: false,
      concept: {},
			conceptQuestions: [],
			questionModel: {
				_id: "",
				explaination: "",
				difficulty: "",
				text: "",
				answer: '',
				choiceA: '',
				choiceB: '',
				choiceC: '',
				choiceD: '',
			}
    };
	},
	mounted() {
		this.getConcept();
		this.getQuestions();
	},
	methods: {
		clearModal() {
			this.questionModel._id = "";
			this.questionModel.concept = this.concept.id;
			this.questionModel.explaination = "";
			this.questionModel.difficulty = "";
			this.questionModel.text = "";
			this.questionModel.answer = '';
			this.questionModel.choiceA = '';
			this.questionModel.choiceB = '';
			this.questionModel.choiceC = '';
			this.questionModel.choiceD = '';
      this.isUpdate = false;
    },
		async getConcept () {
			try
      {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_SHOW_V2 +
          "/" +
          this.conceptId
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

        this.concept = res.data;
        this.isLoading = false;
      } catch ( error )
      {
        console.log( error );
        alert( error.message );
      }
		},
		async getQuestions () {
			try
      {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_QUESTIONS_ALL_V2 +
          `?concept=${ this.conceptId }`
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

				console.log(res.data)

        this.conceptQuestions = res.data;
      } catch ( error )
      {
        console.log( error );
        alert( error );
      }
		},
		async loadQuestion ( id ) {
      try
			{
        this.clearModal();
        this.isUpdate = true;
        const data = this.conceptQuestions.find( question => question._id === id );
        this.questionModel._id = data._id;
				this.questionModel.text = data.text;
				this.questionModel.difficulty = data.difficulty;
				this.questionModel.explaination = data.explaination;
				this.questionModel.answer = data.answer;
				this.questionModel.choiceA = data.choiceA.text;
				this.questionModel.choiceB = data.choiceB.text;
				this.questionModel.choiceC = data.choiceC.text;
				this.questionModel.choiceD = data.choiceD.text;
      } catch ( error )
      {
        console.log( error );
        alert( error );
      }
		},
		async createQuestion () {
      try
			{
				const inputData = {
					concept: this.conceptId,
					text: this.questionModel.text,
					difficulty: this.questionModel.difficulty,
					explaination: this.questionModel.explaination,
					answer: this.questionModel.answer,
					choiceA: this.questionModel.choiceA,
					choiceB: this.questionModel.choiceB,
					choiceC: this.questionModel.choiceC,
					choiceD: this.questionModel.choiceD,
				}
				
        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_QUESTIONS_CREATE_V2,
          inputData
        );

        const res = entry.data;
        if (res.status == false) throw res.error;
        console.log( res.data );

        this.conceptQuestions.push( {
					_id: res.data._id,
					text: res.data.text,
					difficulty: res.data.difficulty,
					explaination: res.data.explaination,
					answer: res.data.answer,
					choiceA: res.data.choiceA.text,
					choiceB: res.data.choiceB.text,
					choiceC: res.data.choiceC.text,
					choiceD: res.data.choiceD.text,

        });
				alert("Question created successfully");
        this.clearModal();
      } catch ( error )
      {
        console.log( error );
        alert( error );
      }
		},
		async updateQuestion () {
			try
			{
				const inputData = {
					concept: this.conceptId,
					text: this.questionModel.text,
					difficulty: this.questionModel.difficulty,
					explaination: this.questionModel.explaination,
					answer: this.questionModel.answer,
					choiceA: this.questionModel.choiceA,
					choiceB: this.questionModel.choiceB,
					choiceC: this.questionModel.choiceC,
					choiceD: this.questionModel.choiceD,
				}

        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_QUESTIONS_UPDATE_V2 +
          "/" +
          this.questionModel._id,
					inputData
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

        const index = this.conceptQuestions.findIndex( question => question._id === this.questionModel._id );
        this.conceptQuestions[ index ] = { 
					_id: res.data._id,
					text: res.data.text,
					difficulty: res.data.difficulty,
					explaination: res.data.explaination,
					answer: res.data.answer,
					choiceA: res.data.choiceA.text,
					choiceB: res.data.choiceB.text,
					choiceC: res.data.choiceC.text,
					choiceD: res.data.choiceD.text,
				};

				alert("Question updated successfully");
        
        this.clearModal();
      } catch ( error )
      {
        console.log( error );
        alert( error.message );
      }
		},
		async deleteQuestion (id) {
			try
			{
				if (
					confirm(
						"Are you sure you want to delete this question? Operation can not be undone!"
					)
				)
				{
					const entry = await axiosClient.delete(
						import.meta.env.VITE_SERVER +
						import.meta.env.VITE_API_CONCEPT_QUESTIONS_DELETE_V2 +
						"/" +
						id
					);

					const res = entry.data;
					if ( !res.status ) throw res.error;

					this.conceptQuestions = this.conceptQuestions.filter( question => question._id !== id );
					alert( "Question deleted successfully" );
				}

			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
		}
	}
};
</script>

<style scoped></style>
