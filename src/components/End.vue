<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="flex items-center flex-col">
      <img src="../assets/box.png" alt="Box" class="" />
      <h1>{{ correct }} / {{ questionCount }} goed!</h1>
    </div>
    <p v-if="correct < questionCount">
      Maar eigenlijk had je ze allemaal goed, want het maakt geen verschil.
    </p>
    <p v-if="correct == questionCount">Je bent de slogankampioen!</p>
    <p>Deel je score:</p>
    <div class="share">
      <a
        :href="`https://twitter.com/intent/tweet?text=Ik%20had%20${correct}%20van%20de%20${questionCount}%20partijen%20bij%20de%20slogans%20goed.&url=https%3A%2F%2Fwww.hollefrasen.nl&via=hollefrase`"
        class="twitter"
        @click="share()"
      ></a>
      <a
        href="https://www.facebook.com/dialog/share?app_id=1641639456124709&amp;display=popup&amp;href=https%3A%2F%2Fwww.hollefrasen.nl&amp;redirect_uri=https%3A%2F%2Fwww.hollefrasen.nl"
        class="facebook"
        @click="share()"
      ></a>
      <a
        :href="`whatsapp://send?text=Ik%20had%20${correct}%20van%20de%20${questionCount}%20partijen%20bij%20de%20slogans%20goed.%20https%3A%2F%2Fwww.hollefrasen.nl`"
        class="whatsapp"
        target="_blank"
      ></a>
      <a
        :href="`https://t.me/share/url?url=https%3A%2F%2Fwww.hollefrasen.nl&text=Ik%20had%20${correct}%20van%20de%20${questionCount}%20partijen%20bij%20de%20slogans%20goed.`"
        class="telegram"
        target="_blank"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'End',
  props: ['correct', 'questionCount'],
  methods: {
    share(e) {
      e.preventDefault();
      const url = e.target.closest('a').getAttribute('href');
      window.open(
        url,
        '',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
      );
      return false;
    },
  },
};
</script>

<style>
.share {
  @apply flex gap-4 justify-center;
}
.share a {
  display: block;
  width: 35px;
  height: 35px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.share .twitter {
  background-image: url(../assets/twitter.png);
}
.share .facebook {
  background-image: url(../assets/facebook.png);
}
.share .whatsapp {
  background-image: url(../assets/whatsapp.png);
}
.share .telegram {
  background-image: url(../assets/telegram.png);
}
</style>
