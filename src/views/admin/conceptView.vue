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
  <div class="row">
    <div class="card">
      <div class="card-header p-4">
        <h2 class="m-auto">{{ concept.name }}</h2>
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
            <h5 class="card-title">{{ question.text }}</h5>
						<p class="card-text">
              Answer: {{ question.answer }}
            </p>
            <p class="card-text d-flex justify-content-around">
							<p>{{ question.choiceA.value }} . {{ question.choiceA.text  }}</p>
							<p>{{ question.choiceB.value }} . {{ question.choiceB.text  }}</p>
							<p>{{ question.choiceC.value }} . {{ question.choiceC.text  }}</p>
							<p>{{ question.choiceD.value }} . {{ question.choiceD.text  }}</p>
            </p>
          </div>
          <div class="card-footer">
						Explaination:
						<p class="card-text p-2">{{ question.explaination }}</p>
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
          <div class="form-floating mb-3">
            <input type="text" v-model.trim=" questionModel.text " class="form-control" id="floatingInput"
              placeholder="Question" />
            <label for="floatingInput">Question</label>
          </div>
					<div class="form-floating mb-3">
            <input type="text" v-model.trim=" questionModel.choiceA " class="form-control" id="floatingInput"
              placeholder="Question" />
            <label for="floatingInput">Choice A</label>
          </div>
					<div class="form-floating mb-3">
            <input type="text" v-model.trim=" questionModel.choiceB " class="form-control" id="floatingInput"
              placeholder="Question" />
            <label for="floatingInput">Choice B</label>
          </div>
					<div class="form-floating mb-3">
            <input type="text" v-model.trim=" questionModel.choiceC " class="form-control" id="floatingInput"
              placeholder="Question" />
            <label for="floatingInput">Choice C</label>
          </div>
					<div class="form-floating mb-3">
            <input type="text" v-model.trim=" questionModel.choiceD " class="form-control" id="floatingInput"
              placeholder="Question" />
            <label for="floatingInput">Choice D</label>
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
					<!-- add textarea -->
					<div class="form-floating mb-3">
						<textarea v-model.trim=" questionModel.explaination " class="form-control" id="floatingInput"
							placeholder="Explaination"></textarea>
						<label for="floatingInput">Explaination</label>
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

export default {
  name: "admin-concepts-view",
  props: ["conceptId"],
  data() {
    return {
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
        alert( error.message );
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
