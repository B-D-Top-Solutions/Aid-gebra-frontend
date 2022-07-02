<template>
  <div class="row">

		<div v-if="(isMaxAttempts && noPassed)" class="card-body">
			<div class="text-center">
				<h5 class="card-title">
					You have reached maximum attempt for Post-test. Kindly seek for a professional's help. Thank you.
				</h5>
				<RouterLink 
					class="btn btn-primary" 
					:to="{
						name: 'student-lesson-view',
						params: { lessonId: lessonId },
					}"
					>
						Back To Lesson
				</RouterLink>
			</div>
		</div>

		<div v-if="notYetComplete" class="card-body">
			<div class="text-center">
				<h5 class="card-title">This posttest does not have enough questions.</h5>
				<RouterLink 
					class="btn btn-primary" 
					:to="{
						name: 'student-lesson-view',
						params: { lessonId: lessonId },
					}"
					>
						Back To Lesson
				</RouterLink>
			</div>
		</div>

		<div v-if="!noPassed && !isLoading" class="card-body">
			<div class="text-center">
				<h5 class="card-title">You already passed this test.</h5>
				<RouterLink 
					class="btn btn-primary" 
					:to="{
						name: 'student-lesson-view',
						params: { lessonId: lessonId },
					}"
					>
						Back To Lesson
				</RouterLink>
			</div>
		</div>

		<div v-if="lastestResult" class="card-body">
			<div class="text-center">
				<h5 class="card-title">Post Test Done.</h5>
				<RouterLink 
					class="btn btn-primary" 
					:to="{
						name: 'student-lesson-view',
						params: { lessonId: lessonId },
					}"
					>
						Back To Lesson
				</RouterLink>
			</div>
		</div>

		<div class="card" v-if="lastestResult">

      <div class="card-header p-4">
        <h2 class="m-auto">Post Test Results</h2>
				<small>{{ lastestResult.totalScore }} Points</small>
				<small>Attempt: {{ lastestResult.attemptNumber }}</small>
      </div>
      <div class="card-body">
        <h5 class="card-title"><small>Verdict: {{ lastestResult.isPassed ? 'PASSED' : 'FAILED' }}</small></h5>
						<small>You may change the lecture to SET B for more detailed explainations</small>
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
									<td>
										<span class="card-title">Lecture</span>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="concept in lastestResult.result">
									<td>
										<span class="card-title">{{ concept.conceptName }}</span>
									</td>
									<td>
										<span class="card-title">{{ concept.correctAnswers }}</span>
									</td>
									<td>
										<span class="card-title">{{ concept.mastery == 'MASTERED' ? 'MASTERED' : 'NOT MASTERED' }}</span>
									</td>
									<td>
									<select class="form-control" v-model="conceptLecture[concept.conceptId]">
										<option value="A" selected>Set A</option>
										<option value="B">Set B</option>
									</select>
									<button
										class="btn btn-outline-secondary"
										type="button"
										@click="setLecture(concept.conceptId)"
									>
										Set
									</button>
									</td>
								</tr>
							</tbody>
						</table>
			
	
        <div class="card my-3" v-for="(question, index) in lastestResult.questions"  v-bind:key="question._id">
          <div class="card-header d-flex justify-content-between">
            <div class="">Question: {{ question.order  }}</div>
						<span
              :class="`badge bg-${
                question.correctAnswer.toUpperCase() == question.answer.toUpperCase() ? 'success' : 'danger'
              }`"
              >{{ question.correctAnswer.toUpperCase() == question.answer.toUpperCase() ? '✔' : '❌' }}</span
            >
          </div>
          <div class="card-body" v-if="lastestResult.isPassed">
            <h5 class="card-title" v-html="question.question"></h5>
            <p class="card-text">
							<div>Correct: <span v-html="question.correctText"></span></div>
							<div>Your Answer: <span v-html="question.answerText"></span></div>
            </p>
          </div>
        </div>
      </div>
    </div> 

    <div class="card" v-if="(noPassed == true && isMaxAttempts == false && lastestResult == null)">

      <div class="card-header p-4">
        <h2 class="m-auto">Post-test</h2>
				<small>Attempt: {{ attemptCount }}/5</small>
      </div>
      <div class="card-body">
        <h5 class="card-title"><small>Type the letter of the answer</small></h5>
        <div class="card my-3" v-for="(question, index) in posttestQuestions"  v-bind:key="question._id">
          <div class="card-header d-flex justify-content-between">
            <div class="">Question: {{ question.order  }}</div>
						<span>Tag: {{ question.tags }}</span>
          </div>
          <div class="card-body">
            <h5 class="card-title" v-html="question.text"></h5>
            <p class="card-text">
							<p class="d-flex"><span>{{ question.choiceA.value }}</span>.&nbsp; <span v-html=" question.choiceA.text  "></span></p>
							<p class="d-flex"><span>{{ question.choiceB.value }}</span>.&nbsp; <span v-html=" question.choiceB.text  "></span></p>
							<p class="d-flex"><span>{{ question.choiceC.value }}</span>.&nbsp; <span v-html=" question.choiceC.text  "></span></p>
							<p class="d-flex"><span>{{ question.choiceD.value }}</span>.&nbsp; <span v-html=" question.choiceD.text  "></span></p>
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
			isLoading: true,
			attemptCount: 0,
			isMaxAttempts: false,
			notYetComplete: false,
			noPassed: false,
			studentId: store.state.user.data._id,
			student: {},
			posttest: {},
			posttestQuestions: [],
			lastestResult: null,
			answers: [],
			conceptLecture: {},
		};
	},
	mounted () {
		this.getStudent();
	},
	methods: {
		async setLecture (id) {
			try {
				const entry = await axiosClient.post(
					import.meta.env.VITE_SERVER + import.meta.env.VITE_API_STUDENT_LECTURE_CHANGE_V2,
					{
						concept: id,
						lecture: this.conceptLecture[id],
					}
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				console.log( res );

				alert('Lecture changed');
				
			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
		},
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

				await this.getPosttest();
				
			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
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

				if ( res.data.length <= 0 ) throw "This lesson has no post test yet";

				this.posttest = res.data[ 0 ];

				await this.getStudentAttempts();

			} catch ( error )
			{
				console.log( error );
				alert( error );
			}
		},
		async getStudentAttempts () {
			try
			{
				const entry = await axiosClient.get(
					import.meta.env.VITE_SERVER + import.meta.env.VITE_API_POSTTEST_RESULTS_ALL_V2 +
					`/?student=${ this.student._id }&lesson=${ this.lessonId }`
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				const attempts = res.data;
				// counter number of attempts
				this.attemptCount = res.data.length + 1;

				// check if passed
				const successFullAttempts = attempts.filter( ( attempt ) => attempt.isPassed );
				if ( successFullAttempts.length > 0 ) {
					this.noPassed = false;
				} else {
					this.noPassed = true;
				}

				this.isLoading = false;

				if(this.noPassed == false ) {
					return
				}

				// check if max attempts reached
				if ( this.attemptCount >= 6 ) {
					this.isMaxAttempts = true;
					return
				}

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
					`?posttest=${ this.posttest._id }`
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

				this.posttestQuestions = sortedData;
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
					import.meta.env.VITE_API_POSTTEST_RESULTS_CREATE_V2,
					inputData
				);

				const res = entry.data;
				if ( res.status == false ) throw res.error;
				console.log( res.data );

				this.lastestResult = res.data;

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
