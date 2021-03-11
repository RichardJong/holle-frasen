<template>
  <div>
    <h1>{{ question.slogan }}</h1>
    <div>
      <button
        class="option"
        v-for="(option, index) in question.options"
        :key="index"
        @click="setAnswer(index)"
      >
        {{ option }}
      </button>
    </div>
    <button class="btn" @click="check()">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['question'],
  data() {
    return {
      answer: null,
      btnText: 'Controleren',
      checked: false,
    };
  },
  methods: {
    check() {
      if (this.checked) {
        this.$emit('next');
        return;
      }

      console.log('check!');
      const options = this.$el.querySelectorAll('.option');
      if (this.question.correct == this.question.options[this.answer]) {
        options[this.answer].classList.toggle('correct');
        this.$emit('correct');
      } else {
        options[this.answer].classList.toggle('wrong');
      }

      this.btnText = 'Verder';
      this.checked = true;
    },
    setAnswer(index) {
      this.answer = index;
    },
  },
};
</script>

<style>
.option {
  @apply m-2 py-2 px-4 bg-gray-300;
}

.correct {
  @apply border-2 border-green-600;
}

.wrong {
  @apply border-2 border-red-600;
}
</style>
