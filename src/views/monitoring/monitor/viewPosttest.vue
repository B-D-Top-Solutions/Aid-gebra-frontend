<template>
  <div v-if="isLoading" class="card-body">
    <div class="text-center">
      <h5 class="card-title">Loading...</h5>
    </div>
  </div>
	<div v-if="!isLoading" class="row">
		<div class="card" v-if="testResult">
      <div class="card-header p-4">
        <h2 class="m-auto">Post Test Results</h2>
				<small>{{ testResult.totalScore }} Points</small>&nbsp;
				<small>Attempt: {{ testResult.attemptNumber }}</small>
      </div>
      <div class="card-body">
        <h5 class="card-title"><small>Remark: {{ testResult.isPassed ? 'PASSED' : 'FAILED' }}</small></h5>
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
								<tr v-for="concept in testResult.result">
									<td>
										<span class="card-title">{{ concept.conceptName }}</span>
									</td>
									<td>
										<span class="card-title">{{ concept.correctAnswers }}</span>
									</td>
									<td>
										<span class="card-title">{{ concept.mastery == 'MASTERED' ? 'MASTERED' : 'UNMASTERED'  }}</span>
									</td>
								</tr>
							</tbody>
						</table>
			
	
        <div class="card my-3" v-for="(question, index) in testResult.questions"  v-bind:key="question._id">
          <div class="card-header d-flex justify-content-between">
            <div class="">Question: {{ question.order  }}</div>
						<span
              :class="`badge bg-${
                question.correctAnswer.toUpperCase() == question.answer.toUpperCase() ? 'success' : 'danger'
              }`"
              >{{ question.correctAnswer.toUpperCase() == question.answer.toUpperCase() ? '✔' : '❌' }}</span
            >
          </div>
          <div class="card-body" v-if="!isStudent || !isFailed">
            <h5 class="card-title" v-html="question.question"></h5>
            <p class="card-text">
							<div>Correct: <span v-html="question.correctText"></span></div>
							<div>Your Answer: <span v-html="question.answerText"></span></div>
            </p>
          </div>
        </div>
      </div>
    </div> 
	</div>
</template>

<script>
import axiosClient from '../../../axios';
import store from '../../../store';

export default {
	props: [ "posttestId" ],
	data () {
		return {
			isLoading: true,
			testResult: null,
			isStudent: false,
			isFailed: true,
		}
	},
	mounted () {
		this.loadData();
	},
	methods: {
		async loadData () {
			try {
				const entry = await axiosClient.get(
				import.meta.env.VITE_SERVER +
				import.meta.env.VITE_API_POSTTEST_RESULTS_SHOW_V2 + '/' +
				this.posttestId
			);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				if ( store.state.user.role == 'STUDENT' )
				{
					this.isStudent = true;
					this.isFailed = !res.data.isPassed;
				}

				this.testResult = res.data;
				this.isLoading = false;
			} catch (error) {
				console.log( error );
				alert( error );
			}
		},

	},
}

</script>

<style lang="scss" scoped>

</style>