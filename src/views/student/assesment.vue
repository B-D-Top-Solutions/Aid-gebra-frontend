<template>
  <div class="row">
    <div v-if="!startClicked" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Assessment</h5>
        <p>Get 5 correct answers to complete this assessment.</p>
				<RouterLink 
					class="btn btn-primary mx-1" 
					:to="{
							name: 'student-lesson-view',
							params: { lessonId: lessonId },
						}"
					>
						Back To Lesson
				</RouterLink>
        <button v-if="!hideStartBtn" class="btn btn-success mx-1" @click="getConcept()">
          Start Assessment
        </button>
      </div>
    </div>

		<div v-if="startClicked && !isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Starting Assessment</h5>
        <p>Preparing questions....</p>
      </div>
    </div>

    <div v-if="!takenPretest && isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Stop</h5>
        <p>You must take the pretest before doing the assessment.</p>
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

		<div v-if="noQuestionsFound && isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Uh oh</h5>
        <p>There are no questions found. ask the admin to add more.</p>
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

		<div v-if="isFinished && isStarted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">Success</h5>
        <p v-if="concept.order <= 4">You have completed the assessment, you may now continue on the next concept</p>
				<p v-if="concept.order == 5">You have completed the assessment, you may now take the post test.</p>
      </div>
				<div class="text-center">
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

		<div class="card" v-if="(isStarted && currentQuestion != null && !noQuestionsFound && !isFinished)">

      <div class="card-header p-4">
        <h3 class="m-auto">{{ concept.name }}</h3>
        <h5 class="m-auto">Knowledge Level: {{ knowledgeLevel }}</h5>
				<small>Score: {{ score }}/5</small>
      </div>
      <div class="card-body" v-if="currentQuestion != null">
        <h5 class="card-title"><small>Type the letter of the answer</small></h5>
        <div class="card my-3">
					<input type="hidden" v-model="answer.question">
          <div class="card-header d-flex justify-content-between">
            <div>Question: {{ questionCount  }}</div>
						<span>Difficulty: {{ currentQuestion.difficulty }}</span>
          </div>
          <div class="card-body">
          <h5 class="card-title">
						<div class="card-title" style="margin-left: -1rem;">
              <QuillEditor
								v-if="currentQuestion.text"
								theme="bubble"
								v-model:content="currentQuestion.text"
								contentType="html"
								:toolbar="[]"
								:readOnly="true"
								:enable="false"
              />
            </div>
					</h5>
            <p class="card-text">
              <p class="d-flex">
                <p style="">{{ currentQuestion.choiceA.value }}</p>.&nbsp; 
                <div style="margin-top: -0.5rem;">
                  <QuillEditor
                    theme="bubble"
                    v-model:content="currentQuestion.choiceA.text"
                    contentType="html"
                    :toolbar="[]"
                    :readOnly="true"
                    :enable="false"
                  />
                </div>
              </p>
							<p class="d-flex">
                <span>{{ currentQuestion.choiceB.value }}</span>.&nbsp; 
                <div style="margin-top: -0.5rem;">
                  <QuillEditor
                    theme="bubble"
                    v-model:content="currentQuestion.choiceB.text"
                    contentType="html"
                    :toolbar="[]"
                    :readOnly="true"
                    :enable="false"
                  />
                </div>
              </p>
							<p class="d-flex">
                <span>{{ currentQuestion.choiceC.value }}</span>.&nbsp; 
                <div style="margin-top: -0.5rem;">
                  <QuillEditor
                    theme="bubble"
                    v-model:content="currentQuestion.choiceC.text"
                    contentType="html"
                    :toolbar="[]"
                    :readOnly="true"
                    :enable="false"
                  />
                </div>
              </p>
							<p class="d-flex">
                <span>{{ currentQuestion.choiceD.value }}</span>.&nbsp;
                <div style="margin-top: -0.5rem;">
                  <QuillEditor
                    theme="bubble"
                    v-model:content="currentQuestion.choiceD.text"
                    contentType="html"
                    :toolbar="[]"
                    :readOnly="true"
                    :enable="false"
                  />
                </div>
              </p>
            </p>
						<input required v-model="answer.answer" class="form-control" type="text" v-if="!isAfterQuestion">
						<p v-if="isAfterQuestion">
							<p class="bg-success text-light" v-if="isCorrect">CORRECT</p>
							<p class="bg-danger text-light" v-if="!isCorrect">INCORRECT</p>
						</p>
          </div>
					<div class="card-footer" v-if="isAfterQuestion">
							Explanation:
							<div style="margin-left: -1rem;">
								<QuillEditor
									v-if="currentQuestion.explaination"
									theme="bubble"
									v-model:content="currentQuestion.explaination"
									contentType="html"
									:toolbar="[]"
									:readOnly="true"
									:enable="false"
								/>
              </div>
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

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

export default {
  components: {
    QuillEditor,
  },
  name: "student-assesment",
  props: ["conceptId", "lessonId"],
  data() {
		return {
			startClicked: false,
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
			knowledgeLevel: '',
			score: 0,
			answer: {
				question: '',
				answer: ''
			},
    };
  },
	methods: {
		async getConcept () {
			this.startClicked = true;
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

				console.log(res.data)

				// check if any of the pretest is for this lesson
				const pretestLesson = res.data.find( ( prettest ) => 
					prettest.lessonId._id.toString() == this.lessonId.toString()
				);

				console.log(pretestLesson)


				// check if there is a pretest for this lesson if not, return
				if ( pretestLesson == null ) {
					this.takenPretest = false;
					return;
				}

				this.pretestResult = pretestLesson

				// get the mastery of the concept
				const mastery = this.pretestResult.result.filter(
					(r) => r.conceptName == this.concept.name
				)
				this.mastery = mastery[ 0 ].mastery ?? '';
				this.knowledgeLevel = this.pretestResult.knowledgeLevel;

				// DEFAULT STACK
				this.derivedMastery = 'UNMASTERED';

				const easyStack = [
					'EASY',
					'EASY',
					'AVERAGE',
					'AVERAGE',
					'DIFFICULT',
				];

				const hardStack = [
						'EASY',
						'AVERAGE',
						'DIFFICULT',
						'DIFFICULT',
						'DIFFICULT',
				]

				///////////// NEW QUESTIONS LOGIC
				this.difficultyStack = hardStack;
				this.derivedMastery = 'MASTERED';
				switch (this.knowledgeLevel) {
					case 'POOR':
						this.difficultyStack = easyStack
						this.derivedMastery = 'UNMASTERED';
						break;
					case 'FAIR':
						if(this.concept.order > 1) {
							this.difficultyStack = easyStack
							this.derivedMastery = 'UNMASTERED';
						}
						break;
					case 'AVERAGE':
						if(this.concept.order > 2) {
							this.difficultyStack = easyStack
							this.derivedMastery = 'UNMASTERED';
						}
						break;
					case 'GOOD':
						if(this.concept.order > 3) {
							this.difficultyStack = easyStack
							this.derivedMastery = 'UNMASTERED';
						}
						break;
					case 'VERY GOOD':
						if ( this.concept.order > 4 )
						{
							this.difficultyStack = easyStack
							this.derivedMastery = 'UNMASTERED';
						}
						break;
					case 'EXCELLENT':
						this.difficultyStack = hardStack
						this.derivedMastery = 'MASTERED';
						break;
					default:
						break;
				}

				///////////// NEW QUESTIONS LOGIC

				/////////////////// OLD MASTERY LOGIC
				// if(this.mastery == 'MASTERED') {
				// 	this.difficultyStack = [
				// 		'EASY',
				// 		'AVERAGE',
				// 		'DIFFICULT',
				// 		'DIFFICULT',
				// 		'DIFFICULT',
				// 	];
				// }

				// if(this.mastery == 'NOT MASTERED') {
				// 	this.difficultyStack = [
				// 		'EASY',
				// 		'EASY',
				// 		'AVERAGE',
				// 		'AVERAGE',
				// 		'DIFFICULT',
				// 	];
				// }
				/////////////////// OLD MASTERY LOGIC

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
				const prevQuestions = this.prevQuestions.map( q => q ).join( ',' );
			
			// get the difficulty of the question
			const difficulty = this.difficultyStack[0]
			
			const entry = await axiosClient.get(
				import.meta.env.VITE_SERVER +
				import.meta.env.VITE_API_CONCEPT_QUESTIONS_ALL_V2 +
				`?concept=${ this.conceptId }&difficulty=${ difficulty }&exclude=${prevQuestions}`
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
			this.prevQuestions = [...this.prevQuestions, this.currentQuestion._id]
			this.currentQuestion = null;
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
