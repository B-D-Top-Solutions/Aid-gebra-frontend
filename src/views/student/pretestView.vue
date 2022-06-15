<template>
  <div class="row">

		<div v-if="completedPretest" class="card-body">
			<div class="text-center">
				<h5 class="card-title">You already took this pretest.</h5>
			</div>
		</div>

		<div class="card" v-if="(completedPretest)">

      <div class="card-header p-4">
        <h2 class="m-auto">Pre-test Results</h2>
				<small>{{ pretestResult.totalScore }} Points</small>
      </div>
      <div class="card-body">
        <h5 class="card-title"><small>Knowledge Level: {{ pretestResult.knowledgeLevel }}</small></h5>
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<td>
										<span class="card-title">Concept</span>
									</td>
									<td>
										<span class="card-title">Correct Answers</span>
									</td>
									<td>
										<span class="card-title">Mastery</span>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="concept in pretestResult.result">
									<td>
										<span class="card-title">{{ concept.conceptName }}</span>
									</td>
									<td>
										<span class="card-title">{{ concept.correctAnswers }}</span>
									</td>
									<td>
										<span class="card-title">{{ concept.mastery }}</span>
									</td>
								</tr>
							</tbody>
						</table>
			
	
        <div class="card my-3" v-for="(question, index) in pretestResult.questions"  v-bind:key="question._id">
          <div class="card-header d-flex justify-content-between">
            <div class="">Question: {{ question.order  }}</div>
						<span
              :class="`badge bg-${
                question.correctAnswer.toUpperCase() == question.answer.toUpperCase() ? 'success' : 'danger'
              }`"
              >{{ question.correctAnswer.toUpperCase() == question.answer.toUpperCase() ? '✔' : '❌' }}</span
            >
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ question.question }}</h5>
            <p class="card-text ">
							<div>Correct: {{ question.correctText  }}</div>
							<div>Your Answer: {{ question.answerText  }}</div>
            </p>
          </div>
        </div>
      </div>
    </div>

			<div v-if="notYetComplete" class="card-body">
			<div class="text-center">
				<h5 class="card-title">This pretest does not have enough questions.</h5>
			</div>
		</div>

    <div class="card" v-if="(!completedPretest && !notYetComplete)">

      <div class="card-header p-4">
        <h2 class="m-auto">Pre-test</h2>
      </div>
      <div class="card-body">
        <h5 class="card-title"><small>Type the letter of the answer</small></h5>
        <div class="card my-3" v-for="(question, index) in pretestQuestions"  v-bind:key="question._id">
          <div class="card-header d-flex justify-content-between">
            <div class="">Question: {{ question.order  }}</div>
						<span>Tag: {{ question.tags }}</span>
          </div>
          <div class="card-body">
            <h5 class="card-title" v-html="question.text"></h5>
            <p class="card-text">
							<p>{{ question.choiceA.value }} . <span v-html=" question.choiceA.text  "></span></p>
							<p>{{ question.choiceB.value }} . <span v-html=" question.choiceB.text  "></span></p>
							<p>{{ question.choiceC.value }} . <span v-html=" question.choiceC.text  "></span></p>
							<p>{{ question.choiceD.value }} . <span v-html=" question.choiceD.text  "></span></p>
            </p>
						<input required v-model="answers[question.order - 1]" class="form-control" type="text" >
          </div>
        </div>
        <button
          class="btn btn-primary my-4"
          @click="saveTest()"
        >
          Submit
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import axiosClient from '../../axios';
import store from '../../store';

export default {
	name: "student-pretest-view",
	props: [ "lessonId" ],
	data () {
		return {
			completedPretest:false,
			hasPretest: false,
			notYetComplete: false,
			pretestResult: null,
			studentId: store.state.user.data._id,
			student: {},
			pretestIdnum: null,
			pretest: {},
			pretestQuestions: [],
			answers: [],
		};
	},
	mounted () {
		this.getStudent();
	},
	methods: {
		async getStudent() {
			try
			{
				const entry = await axiosClient.get(
					import.meta.env.VITE_SERVER + import.meta.env.VITE_API_STUDENT_SHOW_V2 +
					`/${ this.studentId }`
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				console.log( res );

				this.student = res.data;

				await this.getPretest();
				
			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
		},
		async getStudentPretest () {
			try
			{
				const entry = await axiosClient.get(
					import.meta.env.VITE_SERVER + import.meta.env.VITE_API_PRETEST_RESULTS_ALL_V2 +
					`/?student=${ this.student._id }&lesson=${ this.lessonId }`
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				if(res.data.length > 0) {
					this.completedPretest = true;
					this.pretestResult = res.data[ 0 ];
					console.log( this.pretestResult );
					return
				}

				this.completedPretest = false;
				await this.getQuestions()

			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
		},
		async getPretest () {
			try
			{
				const entry = await axiosClient.get(
					import.meta.env.VITE_SERVER +
					import.meta.env.VITE_API_PRETEST_ALL_V2 +
					"?lesson=" +
					this.lessonId
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				if ( res.data.length <= 0 ) throw "This lesson has no pretest yet";

				this.pretestIdnum = res.data[ 0 ]._id;
				this.pretest = res.data[ 0 ];
				this.hasPretest = true;

				await this.getStudentPretest();

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
					import.meta.env.VITE_API_PRETEST_QUESTIONS_ALL_V2 +
					`?pretest=${ this.pretestIdnum }`
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				console.log( res.data )

				// check if res has 20 items
				if ( res.data.length !== 20 )
				{	
					this.notYetComplete = true;
					return
				}
				this.notYetComplete = false;

				const sortedData = res.data.sort( ( a, b ) => {
					return a.order - b.order;
				} );

				this.pretestQuestions = sortedData;
			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
		},
		async saveTest () {
			try
			{
				let inputData = {
					lesson: this.lessonId,
				}

				// check if any values in answer is null
				for ( let i = 0; i < this.answers.length; i++ )
				{
					console.log( this.answers[ i ] );
					if ( this.answers[ i ] == null )
					{
						throw "Please fill in all answers";
					}
				}

				const allowedAnswers = [ 'A', 'B', 'C', 'D' ];
				for ( let i = 0; i < this.answers.length; i++ )
				{
					if ( !allowedAnswers.includes( this.answers[ i ].toUpperCase() ) )
					{
						throw "Please use A, B, C, or D for answers";
					}
				}

				// format the answers to be in the same format as the database
				let answers = [];
				for ( let i = 0; i < this.answers.length; i++ )
				{
					answers.push( {
						number: i + 1,
						answer: this.answers[ i ],
					} );
				}

				inputData.answers = answers;

				const entry = await axiosClient.post(
					import.meta.env.VITE_SERVER +
					import.meta.env.VITE_API_PRETEST_RESULTS_CREATE_V2,
					inputData
				);

				const res = entry.data;
				if ( res.status == false ) throw res.error;
				console.log( res.data );

				this.pretestResult = res.data;
				this.completedPretest = true;

				alert( "Test Submited" );

			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
		},
	}
}

</script>

<style scoped></style>
