<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="poster">
      <h1>
        <span v-html="question.slogan"></span>
      </h1>
      <div
        class="logo"
        :style="{
          backgroundImage: `url(${getImg()})`,
        }"
      ></div>
    </div>
    <div
      class="w-full grid grid-cols-2 gap-2 mt-4 justify-items-stretch md:flex"
    >
      <button
        class="option bg-gray-300 flex items-center uppercase transition md:flex-1 hover:bg-gray-400"
        v-for="(option, index) in question.options"
        :option="option"
        :key="index"
        @click="setAnswer(index)"
      >
        <span class="icon"><i></i></span>
        <span class="text text-sm px-2 md:flex-1 md:text-center">{{
          option
        }}</span>
      </button>
    </div>
    <button class="btn disabled" @click="check()">
      {{ btnText }}
      <svg
        :class="{
          hidden: !checked,
          'inline-block h-4 w-4 animate-bounce-h': true,
        }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
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
      if (this.answer === null) {
        this.$el.querySelectorAll('.option').forEach((el) => {
          el.classList.add('highlight');
          setTimeout(() => {
            el.classList.remove('highlight');
          }, 200);
        });
        return;
      }

      if (this.checked) {
        this.$emit('next');
        return;
      }

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
      if (this.answer === null) {
        this.$el.querySelector('.btn.disabled').classList.remove('disabled');
      }
      if (this.checked) {
        return;
      }

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
  @apply shadow-lg relative flex justify-center items-center w-full text-white;
  padding-bottom: 100%;
  background: repeating-linear-gradient(
    45deg,
    #777,
    #777 8px,
    #888 8px,
    #888 16px
  );
}

.poster h1 {
  @apply mx-4 absolute uppercase md:text-6xl;
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

.poster.pvda {
  background: #ff181e;
}

.poster.cda {
  background: white;
}
.poster.cda h1 {
  background: #2cc84d;
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

.poster.denk {
  background: #00b8b4;
}

.poster.pvv {
  background: white;
}
.poster.pvv h1 {
  background: #03275b;
}

.poster.sp {
  background: rgb(230, 27, 35);
}

.poster.groenlinks {
  background: #f9d4e6;
}
.poster.groenlinks h1 {
  color: #019a40;
}

.poster.volt {
  background: #5f288e;
}

.poster.christenunie {
  background: linear-gradient(to right, #00a8ee 0%, #002a67 100%);
}

.poster.piratenpartij {
  background: rgb(76, 37, 130);
}

.poster.ja21 {
  background: white;
  color: black;
}

.poster.sgp {
  background: #e95d0f;
}

.poster.nida {
  background: linear-gradient(to bottom, #696da7 0%, #1a1b4d 100%);
}

.option.highlight {
  @apply bg-red-300;
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
