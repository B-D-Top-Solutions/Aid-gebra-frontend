<template>
  <div class="row">
    <div class="card" v-if="hasPretest">

			<div class="card-body">
				<div class="text-center">
					<h5 class="card-title">You already took this pretest.</h5>
				</div>
			</div>
			

      <div v-if="!hasPretest" class="card-header p-4">
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
            <h5 class="card-title">{{ question.text }}</h5>
            <p class="card-text d-flex justify-content-around">
							<p>{{ question.choiceA.value }} . {{ question.choiceA.text  }}</p>
							<p>{{ question.choiceB.value }} . {{ question.choiceB.text  }}</p>
							<p>{{ question.choiceC.value }} . {{ question.choiceC.text  }}</p>
							<p>{{ question.choiceD.value }} . {{ question.choiceD.text  }}</p>
            </p>
						<input v-model="answers[question.order - 1]" class="form-control" type="text" >
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
	name: "admin-pretest-view",
	props: [ "lessonId" ],
	data () {
		return {
			hasPretest: false,
			studentId: store.state.user.data.id,
			pretestIdnum: null,
			pretest: {},
			pretestQuestions: [],
			answers: [],
		};
	},
	mounted () {
		this.getPretest();
	},
	methods: {
		async getStudentPretest () {
			try
			{
				const entry = await axiosClient.get(
					import.meta.env.VITE_SERVER + import.meta.env.VITE_API_PRETEST_RESULTS_ALL_V2 +
					`/?student=${ this.studentId }&lesson=${ this.lessonId }`
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				this.hasPretest = res.data.length > 0 ? true : false;
				if ( !this.hasPretest )
				{
					await this.getPretest();
				}
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
					import.meta.env.VITE_API_PRETEST_QUESTIONS_ALL_V2 +
					`?pretest=${ this.pretestIdnum }`
				);

				const res = entry.data;
				if ( !res.status ) throw res.error;

				console.log( res.data )

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
