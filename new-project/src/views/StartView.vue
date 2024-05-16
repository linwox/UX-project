<script setup>
import { RouterLink } from 'vue-router'
// import swipeRiksImage from '../assets/swipe_riks.png';
</script>

<template>
  <div
    class="bg-[url('../assets/partySwipeStart.svg')] bg-cover bg-center h-screen flex flex-col justify-end items-center pb-60"
  >
    <!-- <img id="background_image" src="../assets/swipe_riks.png" alt="startpage" class="h-screen bg-cover bg-no-repeat" /> -->
    <div class="text-center">


      <div class="text-center">
        <RouterLink to="/instruction">Start</RouterLink>
      </div>
    </div>
  </div>
</template>
