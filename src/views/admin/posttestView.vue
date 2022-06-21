<template>
  <div class="row">
    <div class="card">
      <div class="card-header p-4">
        <h2 class="m-auto">
          Post-test Questions
          <RouterLink
          v-if="!isLoading"
          class="btn btn-primary float-end"
          :to="{
            name: 'admin-lessons-view',
            params: { lessonId: lessonId },
          }"
          >
            Back To Lessons
          </RouterLink>
        </h2>
      </div>
      <div class="card-body">
        <h5 class="card-title"><small>Max of 20 Questions, Every question must have an order between 1 to 20</small></h5>
        <div class="card my-3" v-for="(question, index) in posttestQuestions"  v-bind:key="question._id">
          <div class="card-header d-flex justify-content-between">
            <div class="">Question: {{ question.order  }}</div>
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
						Tag:
						<p class="card-text p-2">{{ question.tags }}</p>
					</div>
        </div>
        <button
          v-if="posttestQuestions.length < 20"
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
            <input type="number" v-model.trim=" questionModel.order " class="form-control" id="floatingInput"
              placeholder="Concept Order" min="1" max="20" />
            <label for="floatingInput">Order</label>
          </div>
          <div class="form mb-3">
            <label for="">Question</label>
            <QuillEditor
              theme="snow"
              toolbar="full"
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
					<!-- add textarea -->
					<div class="form-floating mb-3">
            <input type="text" v-model.trim=" questionModel.tags " class="form-control" id="floatingInput"
              placeholder="Tag" />
            <label for="floatingInput">Tag</label>
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
  name: "admin-posttest-view",
  props: ["lessonId"],
  data() {
		return {
			posttestIdnum: null,
      isUpdate: false,
      posttest: {},
			posttestQuestions: [],
			questionModel: {
				posttesttId: null,
				_id: "",
				tags: "",
				text: "",
				order: "",
				answer: '',
				choiceA: '',
				choiceB: '',
				choiceC: '',
				choiceD: '',
			}
    };
	},
	mounted() {
		this.getPosttest();
	},
	methods: {
		clearModal() {
			this.questionModel._id = "";
			this.questionModel.posttestId = "";
			this.questionModel.order = "";
			this.questionModel.tags = "";
			this.questionModel.text = "";
			this.questionModel.answer = '';
			this.questionModel.choiceA = '';
			this.questionModel.choiceB = '';
			this.questionModel.choiceC = '';
			this.questionModel.choiceD = '';
      this.isUpdate = false;
    },
		async getPosttest () {
			try
      {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_POSTTEST_ALL_V2 +
          "?lesson=" +
          this.lessonId
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

				console.log(res.data);
				this.posttestIdnum = res.data[ 0 ]._id;
				this.posttest = res.data[ 0 ];

				await this.getQuestions()
      } catch ( error )
      {
        console.log( error );
        alert( error );
      }
		},
		async getQuestions () {
			try
      {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_POSTTEST_QUESTIONS_ALL_V2 +
          `?posttest=${ this.posttestIdnum }`
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

				console.log( res.data )

				const sortedData = res.data.sort( ( a, b ) => {
					return a.order - b.order;
				} );

        this.posttestQuestions = sortedData;
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
        const data = this.posttestQuestions.find( question => question._id === id );
				this.questionModel._id = data._id;
				this.questionModel.order = data.order;
				this.questionModel.text = data.text;
				this.questionModel.tags = data.tags;
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
					posttest: this.posttestIdnum,
					order: this.questionModel.order,
					text: this.questionModel.text,
					tags: this.questionModel.tags,
					answer: this.questionModel.answer,
					choiceA: this.questionModel.choiceA,
					choiceB: this.questionModel.choiceB,
					choiceC: this.questionModel.choiceC,
					choiceD: this.questionModel.choiceD,
				}
				
        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_POSTTEST_QUESTIONS_CREATE_V2,
          inputData
        );

        const res = entry.data;
        if (res.status == false) throw res.error;
				console.log( res.data );

				const data = res.data[0];

        this.posttestQuestions.push( {
					_id: data._id,
					order: data.order,
					text: data.text,
					posttestId: data.posttestId,
					tags: data.tags,
					answer: data.answer,
					choiceA: data.choiceA,
					choiceB: data.choiceB,
					choiceC: data.choiceC,
					choiceD: data.choiceD,
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
					text: this.questionModel.text,
					order: this.questionModel.order,
					tags: this.questionModel.tags,
					answer: this.questionModel.answer,
					choiceA: this.questionModel.choiceA,
					choiceB: this.questionModel.choiceB,
					choiceC: this.questionModel.choiceC,
					choiceD: this.questionModel.choiceD,
				}

        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_POSTTEST_QUESTIONS_UPDATE_V2 +
          "/" +
          this.questionModel._id,
					inputData
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

        const index = this.posttestQuestions.findIndex( question => question._id === this.questionModel._id );
        this.posttestQuestions[ index ] = { 
					_id: res.data._id,
					posttestId: res.data.posttestId,
					order: res.data.order,
					text: res.data.text,
					tags: res.data.tags,
					answer: res.data.answer,
					choiceA: res.data.choiceA,
					choiceB: res.data.choiceB,
					choiceC: res.data.choiceC,
					choiceD: res.data.choiceD,
				};

				this.posttestQuestions = this.posttestQuestions.sort( ( a, b ) => a.order - b.order );

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
						import.meta.env.VITE_API_POSTTEST_QUESTIONS_DELETE_V2 +
						"/" +
						id
					);

					const res = entry.data;
					if ( !res.status ) throw res.error;

					this.posttestQuestions = this.posttestQuestions.filter( question => question._id !== id );
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
