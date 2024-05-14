<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import swipeRiksImage from '../assets/swipe_riks.png';
</script>

<template>
  <div class="bg-[url('../assets/swipe_riks.png')] bg-cover bg-center h-screen flex flex-col justify-end items-center pb-60">
    <!-- <img id="background_image" src="../assets/swipe_riks.png" alt="startpage" class="h-screen bg-cover bg-no-repeat" /> -->
    
    <p class="text-center">Ett parti kärlek. För </p>
    <p class="text-center mb-4"> demokratins skull.</p>
    <div class="text-center">

      <RouterLink to="/choice">Start</RouterLink>
    </div>
  </div>
</template>
