<template>
  <div>
    <h1>{{ correct }} / {{ questionCount }} goed!</h1>
    <p>Maar eigenlijk had je ze allemaal goed, want het maakt geen verschil.</p>
    <p>Deel je score:</p>
  </div>
</template>

<script>
export default {
  name: 'End',
  props: ['correct', 'questionCount'],
};
</script>
