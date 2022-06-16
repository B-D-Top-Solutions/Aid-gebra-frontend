<template>
  <div class="row">
    <div v-if="!isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Assesment</h5>
        <p>Get 5 correct answers to complete this assesment</p>
        <button v-if="!hideStartBtn" class="btn btn-primary" @click="getConcept()">
          Start Assesment
        </button>
      </div>
    </div>

    <div v-if="!takenPretest && isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Stop</h5>
        <p>You must take the pretest before assesment</p>
      </div>
    </div>

		<div v-if="noQuestionsFound && isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Uh oh</h5>
        <p>There are no questions found. ask the admin to add more</p>
      </div>
    </div>

		<div v-if="isFinished && isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Success</h5>
        <p>You completed the assesment, move on to the next concept or take the post test</p>
      </div>
    </div>

		<div class="card" v-if="(isStarted && currentQuestion != null && !noQuestionsFound && !isFinished)">

      <div class="card-header p-4">
        <h2 class="m-auto">Assesment: ({{ mastery }})</h2>
				<small>Score: {{ score }}/5</small>
      </div>
      <div class="card-body">
        <h5 class="card-title"><small>Type the letter of the answer</small></h5>
        <div class="card my-3">
					<input type="hidden" v-model="answer.question">
          <div class="card-header d-flex justify-content-between">
            <div class="">Question: {{ questionCount  }}</div>
						<span>Difficulty: {{ currentQuestion.difficulty }}</span>
          </div>
          <div class="card-body">
          <h5 class="card-title" v-html="currentQuestion.text"></h5>
            <p class="card-text">
							<p>{{ currentQuestion.choiceA.value }} . <span v-html=" currentQuestion.choiceA.text  "></span></p>
							<p>{{ currentQuestion.choiceB.value }} . <span v-html=" currentQuestion.choiceB.text  "></span></p>
							<p>{{ currentQuestion.choiceC.value }} . <span v-html=" currentQuestion.choiceC.text  "></span></p>
							<p>{{ currentQuestion.choiceD.value }} . <span v-html=" currentQuestion.choiceD.text  "></span></p>
            </p>
						<input required v-model="answer.answer" class="form-control" type="text" v-if="!isAfterQuestion">
						<p v-if="isAfterQuestion">
							<span v-if="isCorrect">CORRECT</span>
							<span v-if="!isCorrect">INCORRECT</span>
						</p>
          </div>
					<div class="card-footer" v-if="isAfterQuestion">
							Explaination:
							<p v-html="currentQuestion.explaination"> </p>
					</div>
        </div>
				<button 
					v-if="isAfterQuestion"
					class="btn btn-primary" 
					@click="nextQuestion()">
					Next
				</button>
        <button
					v-if="!isAfterQuestion"
          class="btn btn-primary my-4"
          @click="submitAnswer()"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";
import store from "../../store";

export default {
  name: "student-assesment",
  props: ["conceptId"],
  data() {
		return {
			hideStartBtn: false,
			isCorrect: false,
			isFinished: false,
			isAfterQuestion: false,
			questionCount: 1,
			noQuestionsFound: false,
      takenPretest: true,
			isStarted: false,
			student: null,
			pretestResult: null,
			concept: null,
			mastery: '',
			assesmentSession: null,
			currentQuestion: null,
			prevQuestions: [],
			difficultyStack: null,
			score: 0,
			answer: {
				question: '',
				answer: ''
			},
    };
  },
	methods: {
		async getConcept () {
			try {
				this.hideStartBtn = true;
        const req = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CONCEPT_SHOW_V2 + '/' + this.conceptId
				);


        const res = req.data;
        if (!res.status) throw res.error;

        this.concept = res.data;

        await this.getStudent();

        this.isStarted = true;
      } catch (error) {
        console.log(error);
        alert(error);
      }
		},
    async getStudent() {
      try {
        const req = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            `/${store.state.user.data._id}`
        );

        const res = req.data;
        if (!res.status) throw res.error;

				this.student = res.data;
				await this.getPretest();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async getPretest() {
      try {
        const req = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_PRETEST_RESULTS_ALL_V2 +
						`?student=${this.student._id}`
				);

				const res = req.data;
				if ( !res.status ) throw res.error;

				// if there is no pretest
				if ( res.data.length === 0 ) {
					this.takenPretest = false;
					return;
				}

				this.pretestResult = res.data[ 0 ];

				// get the mastery of the concept
				const mastery = this.pretestResult.result.filter(
					(r) => r.conceptName == this.concept.name
				)
				this.mastery = mastery[ 0 ].mastery ?? '';

				if(this.mastery == 'MASTERED') {
					this.difficultyStack = [
						'EASY',
						'AVERAGE',
						'DIFFICULT',
						'DIFFICULT',
						'DIFFICULT',
					];
				}

				if(this.mastery == 'UNMASTERED') {
					this.difficultyStack = [
						'EASY',
						'EASY',
						'AVERAGE',
						'AVERAGE',
						'DIFFICULT',
					];
				}

				await this.startAssesment();
				
      } catch (error) {
        console.log(error);
        alert(error);
      }
		},
		async startAssesment() {
      try {
        const req = await axiosClient.post(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_ASSESSMENT_CREATE_V2,
          { concept: this.conceptId }
        );

        const res = req.data;
        if (!res.status) throw res.error;

				this.assesmentSession = res.data;
				this.isStarted = true;
				console.log(this.assesmentSession)
				

				await this.getQuestion();
      } catch (error) {
        console.log(error);
        alert(error);
      }
		},
			async getQuestion () {
				try
				{
				// convert prevQuestions to comma separated string
				const prevQuestions = this.prevQuestions.map( q => q._id ).join( ',' );

				// get the difficulty of the question
				const difficulty = this.difficultyStack[0]
				
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_QUESTIONS_ALL_V2 +
          `?concept=${ this.conceptId }&difficulty=${ difficulty }`
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

				console.log( res.data )
				// check if there are results
				if ( res.data.length === 0 ) {
					this.noQuestionsFound = true;
					return;
				}

				// get random question from the results
				const randomIndex = Math.floor( Math.random() * res.data.length );
				
				this.currentQuestion = res.data[ randomIndex ];
				this.answer.question = this.currentQuestion._id;
				this.answer.answer = '';

      } catch ( error )
      {
        console.log( error );
        alert( error );
      }
		},
		async submitAnswer () {
			try
			{
				const req = await axiosClient.put(
					import.meta.env.VITE_SERVER +
					import.meta.env.VITE_API_ASSESSMENT_UPDATE_V2 + '/' + this.assesmentSession.uuid,
					{
						question: this.answer.question,
						answer: this.answer.answer,
					}
				);

				const res = req.data;
				if ( !res.status ) throw res.error;
				console.log( res );
				if ( res.correct == 'CORRECT' )
				{
					this.difficultyStack.shift();
					this.score++;
					this.isCorrect = true;
				}

				if ( res.correct == 'INCORRECT' )
				{
					this.isCorrect = false;
				}

				this.questionCount++;
				this.isAfterQuestion = true;
			}
			catch ( error )
			{
				console.log( error );
				alert( error );
			}
		},
		async nextQuestion () {
			this.isAfterQuestion = false;
			this.prevQuestions.push( this.currentQuestion._id );
			await this.getQuestion();

			if ( this.difficultyStack.length == 0 )
			{
				this.isFinished = true;
			}
		}
  },
};
</script>

<style scoped></style>
