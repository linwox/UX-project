<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex flex-col justify-end items-center pb-60">
    <div class="">
      <div class="p-4">
        <h2 class="text-xl font-semibold">INSTRUKTIONER:</h2>
        <p class="text-sm">I PartySwipe™ får du se vilka<br>ledamöter som du vibear med mest.<br>Swipe:a fram din riksdag,<br>
            antingen genom val mellan citat<br>eller bilder.</p>
    </div>
 <div class="bg-stone-300 p-4 rounded-xl">
    <div class="m-3">
        <h3 class="text-lg font-semibold">Bild-spelet:</h3>
        <p class="text-sm">* Du får se 12 bilder, en bild i<br>taget.<br>* Välj genom att swipea/välja Ja<br>eller Nej, alltså om du vill<br>matcha med ledamoten.</p>
    </div>

    <div class="m-3">
        <h3 class="text-lg font-semibold">Citat-spelet:</h3>
        <p class="text-sm">* Två citat visas från två<br>slumpmässiga ledamöter.<br>* Välj det citat som du vibear<br>med mest. Alla citat är<br>slumpmässigt utvalda, välj det<br>som känns bäst. </p>
    </div>
</div>
      <div class="text-center">
        <RouterLink to="/choice">Start</RouterLink>
      </div>
    </div>
  </div>
</template>
