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
          slogan: 'Samen<br> sterker<br> verder.',
          options: ['vvd', 'pvda', 'cda', 'd66'],
          correct: 'vvd',
        },
        {
          slogan: 'Voor een <br> eerlijke toekomst',
          options: ['vvd', 'pvda', 'cda', 'd66'],
          correct: 'pvda',
        },
        {
          slogan: 'Stem voor<br> nieuw leiderschap',
          options: ['vvd', 'pvda', 'cda', 'd66'],
          correct: 'd66',
        },
        {
          slogan: 'Stem<br> Nederland<br> terug',
          options: ['cda', 'fvd', 'sp', 'denk'],
          correct: 'fvd',
        },
        {
          slogan: 'Nu<br> doorpakken',
          options: ['vvd', 'sp', 'cda', 'd66'],
          correct: 'cda',
        },
        {
          slogan: 'Idealisme is het nieuwe<br>realisme',
          options: ['pvdd', 'christenunie', 'groenlinks', 'd66'],
          correct: 'pvdd',
        },
        {
          slogan: 'Samen zijn wij<br>Nederland',
          options: ['pvv', 'fvd', 'vvd', 'denk'],
          correct: 'denk',
        },
        {
          slogan: 'Meer toekomst',
          options: ['volt', 'groenlinks', 'd66', 'denk'],
          correct: 'groenlinks',
        },
        {
          slogan: 'Kiezen voor<br> wat echt telt',
          options: ['christenunie', 'cda', 'groenlinks', 'volt'],
          correct: 'christenunie',
        },
        {
          slogan: 'Wij fixen<br> die shit',
          options: ['volt', 'pvv', 'fvd', 'piratenpartij'],
          correct: 'piratenpartij',
        },
        {
          slogan: 'Het juiste<br>antwoord',
          options: ['piratenpartij', 'ja21', 'denk', 'd66'],
          correct: 'ja21',
        },
        {
          slogan: 'Geloof in<br>jouw stem',
          options: ['nida', 'sgp', 'cda', 'christenunie'],
          correct: 'nida',
        },
        {
          slogan: 'Voor het<br>leven',
          options: ['cda', 'sgp', 'pvdd', 'groenlinks'],
          correct: 'sgp',
        },
        {
          slogan: 'Laat iedereen vrij<br>maar niemand vallen',
          options: ['groenlinks', 'sp', 'cda', 'd66'],
          correct: 'd66',
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
      arr.sort(() => Math.random() - 0.5);
      console.log(arr.slice(0, 10));
      return arr.slice(0, 10);
    },
    start() {
      // console.log('test start');
      this.view = 'question';
    },
    addCorrect() {
      // console.log('Added correct');
      this.correct++;
    },
    next() {
      // console.log('next!');

      if (this.questionIndex + 1 < this.questions.length) {
        this.questionIndex++;
      } else {
        this.view = 'end';
      }
    },
  },
};
</script>
