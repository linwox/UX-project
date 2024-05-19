<script setup>
</script>

<template>
  <div
    class="bg-[url('../assets/partySwipeStart.svg')] bg-cover h-screen flex flex-col justify-end items-center pb-44 sm:bg-none"
  >
    <section class="w-full h-screen max-sm:hidden">
      <img src="../assets/Header.svg" class="object-cover w-screen max-sm:hidden" alt=" alt text" />
      <div class="space-y-3 flex flex-col justify-end items-center">
        <img src="../assets/deskPartySwipe.svg" alt="logga" />
        <img src="../assets/deskStreck.svg" alt="" />
        <p class="text-lg">Ett parti kärlek. För demokratins skull.</p>
      </div>
    </section>

    <div class="text-center">
      <button class="btn btn-lg bg-teal text-white w-24" @click="this.$router.push('instruction')">Start</button>
    </div>
  </div>
</template>
