<script setup>
// import swipeRiksImage from '../assets/swipe_riks.png';
</script>

<template>
  <div class="main">
    <!-- <img id="background_image" src="../assets/swipe_riks.png" alt="startpage" /> -->
    <p id="tagline">Ett parti kärlek. För demokratins skull.</p>
    <RouterLink to="/choice">Start</RouterLink>
  </div>
</template>

<script></script>

<style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
  /* background-image: url(../assets/swipe_riks.png); */
  background-size: cover;
  background-color: aqua;
}

#tagline {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 24px;
}
</style>
