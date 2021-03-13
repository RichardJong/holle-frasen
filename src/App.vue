<template>
  <div id="app">
    <Start v-if="view == 'start'" @start="start" />
    <template v-if="view == 'question'">
      <Question
        v-for="(question, index) in questions"
        :key="index"
        @next="next"
        @correct="addCorrect"
        v-bind:question="question"
        :class="questionIndex == index ? 'visible' : 'hidden'"
      />
    </template>
    <End
      v-if="view == 'end'"
      v-bind:correct="correct"
      v-bind:questionCount="questions.length"
    />
  </div>
</template>

<script>
import Start from './components/Start.vue';
import Question from './components/Question.vue';
import End from './components/End.vue';

export default {
  name: 'App',
  components: {
    Start,
    Question,
    End,
  },
  data() {
    return {
      view: 'start',
      questionIndex: 0,
      correct: 0,
      questions: this.shuffleArray([
        {
          slogan: 'Samen sterker verder.',
          options: ['vvd', 'pvda', 'cda', 'd66'],
          correct: 'vvd',
        },
        {
          slogan: 'Samen sterker',
          options: ['vvd', 'pvda', 'cda', 'd66'],
          correct: 'pvda',
        },
        {
          slogan: 'Stem voor nieuw leiderschap',
          options: ['vvd', 'pvda', 'cda', 'd66'],
          correct: 'd66',
        },
        {
          slogan: 'Wij gaan het doen',
          options: ['cda', 'fvd', 'sp', 'denk'],
          correct: 'fvd',
        },
        {
          slogan: 'Nederland weer van ons allemaal',
          options: ['pvv', 'fvd', 'vvd', 'denk'],
          correct: 'denk',
        },
      ]),
    };
  },
  computed: {
    getQuestion() {
      return this.questions[this.questionIndex];
    },
  },
  methods: {
    shuffleArray(arr) {
      return arr.sort(() => Math.random() - 0.5);
    },
    start() {
      console.log('test start');
      this.view = 'question';
    },
    addCorrect() {
      console.log('Added correct');
      this.correct++;
    },
    next() {
      console.log('next!');

      if (this.questionIndex + 1 < this.questions.length) {
        this.questionIndex++;
      } else {
        this.view = 'end';
      }
    },
  },
};
</script>
