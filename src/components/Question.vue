<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="poster">
      <h1>{{ question.slogan }}</h1>
      <div
        class="logo"
        :style="{
          backgroundImage: `url(${getImg()})`,
        }"
      ></div>
    </div>
    <div class="grid grid-cols-2 mt-4 md:flex md:justify-between">
      <button
        class="option"
        v-for="(option, index) in question.options"
        :option="option"
        :key="index"
        @click="setAnswer(index)"
      >
        <span class="icon"><i></i></span>
        <span class="text">{{ option }}</span>
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
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        return arr;
      }
    },
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

        // Show correct option
        this.$el
          .querySelector('.option[option=' + this.question.correct + ']')
          .classList.toggle('chosen');
      }

      this.btnText = 'Verder';
      this.checked = true;
    },
    setAnswer(index) {
      this.answer = index;

      const poster = this.$el.querySelectorAll('.poster')[0];
      poster.className = '';
      poster.classList.add('poster', this.question.options[index]);

      if (this.$el.querySelector('.option.chosen')) {
        this.$el.querySelector('.option.chosen').classList.remove('chosen');
      }

      this.$el.querySelectorAll('.option')[index].classList.add('chosen');
    },
    getImg() {
      const images = require.context('../assets/', false, /\.png$/);
      if (this.answer === null) {
        return '';
      }
      return images('./' + this.question.options[this.answer] + '.png');
    },
  },
};
</script>

<style>
.poster,
.poster h1 {
  transition: all 0.3s;
}

.poster {
  @apply shadow-lg relative flex justify-center items-center w-full;
  padding-bottom: 100%;
}

.poster h1 {
  @apply mx-4 absolute uppercase;
  top: 30%;
}

.poster .logo {
  background-size: contain;
  background-position: bottom right;
  background-repeat: no-repeat;
  width: 100px;
  height: 50px;
  position: absolute;
  bottom: 25px;
  right: 25px;
}

.poster.vvd {
  background: white;
  color: #0a2cca;
}
.poster.vvd h1 {
}

.poster.pvda {
  background: #ff181e;
  color: white;
}
.poster.pvda h1 {
}

.poster.groenlinks {
}

.poster.cda {
  background: white;
}
.poster.cda h1 {
  background: #2cc84d;
  color: white;
}

.poster.d66 {
  background: white;
  color: black;
}

.poster.d66 h1 {
  text-transform: none;
}

.poster.fvd {
  background: #911c12;
}
.poster.fvd h1 {
  color: white;
}

.poster.denk {
  background: #00b8b4;
}
.poster.denk h1 {
  color: white;
}

.poster.pvv {
  background: white;
}
.poster.pvv h1 {
  color: white;
  background: #03275b;
}

.option {
  @apply m-2 bg-gray-300 flex items-center gap-2 uppercase;
}

.option .text {
  @apply py-2 px-4;
}

.option .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: black;
}

.option i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 100%;
  background: white;
}

.option i:before {
  display: block;
  content: ' ';
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 36px;
  height: 36px;
}

.option.chosen i:before {
  background-image: url(../assets/chosen.png);
}
.option.wrong i:before {
  background-image: url(../assets/wrong.png);
}
.option.correct i:before {
  background-image: url(../assets/correct.png);
}

.option.correct .text {
  @apply text-green-600;
}
.option.wrong .text {
  @apply text-red-500 line-through;
}
</style>
