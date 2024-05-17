<script setup>
import { RouterLink } from 'vue-router'
// import swipeRiksImage from '../assets/swipe_riks.png';
</script>

<template>
  <div
    class="bg-[url('../assets/partySwipeStart.svg')] bg-cover h-screen flex flex-col justify-end items-center pb-60"
  >
    <!-- <img id="background_image" src="../assets/swipe_riks.png" alt="startpage" class="h-screen bg-cover bg-no-repeat" /> -->
    <div class="text-center">

      <button class="btn btn-lg bg-teal text-white w-24">
          <RouterLink to="/instruction">Start </RouterLink>
        </button>
    </div>
  </div>
</template>
