<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div class="flex items-center flex-col">
      <div class="img">
        <img src="../assets/box.png" alt="Box" :class="{ hidden: box2 }" />
        <img src="../assets/box2.png" alt="Box" :class="{ hidden: !box2 }" />
      </div>
      <h1>Holle Frasen</h1>
    </div>
    <p>
      Nederland, polderland. Alles lijkt op elkaar. <br />
      Als vinexwijken zijn politieke partijen niet meer uit elkaar te houden.
      <br />
      Weet jij wie welke slogan gebruikt?<br />
      Raad de holle frasen!
    </p>
    <button @click="$emit('start')" class="btn">Start de test</button>
  </div>
</template>

<style type="text/css">
img {
  width: 100px;
}
</style>

<script>
export default {
  name: 'Start',
  data() {
    return {
      box2: false,
    };
  },
  mounted() {
    this.animate();
  },
  methods: {
    animate() {
      setTimeout(() => {
        this.box2 = true;
        setTimeout(() => {
          this.box2 = false;
          this.animate();
        }, 100);
      }, Math.random() * 1000);
    },
  },
};
</script>
