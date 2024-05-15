<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen flex flex-col justify-end items-center pb-60">
    
    <div class="text-center">
      <div>
        <h2 class="text-xl">OM OSS</h2>
        <p>Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit. Lorem<br>ipsum dolor sit amet, consectetur<br>adipiscing elit.</p>
     </div>

     <div>
        <h2 class="text-xl">API</h2>
        <p>Riksdagens öppna data</p>
     </div>

     <div class="border">
      <div class="p-4">
        <h2 class="text-xl">Java</h2>
        <p>Linnéa Woxinger Sköld</p>
        <p>Adam Johansson</p>
        <p>Amanda Vasilis</p>
      </div>

      <div class="p-4">
        <h2 class="text-xl">UX</h2>
        <p>Vilmer Franzino</p>
        <p>Daniel Malmborg</p>
        <p>Sarah Magnusson</p>
        <p>Madde EK</p>
        <p>Yvon Lascano</p>
      </div>
     </div>


      <div class="text-center">
        <RouterLink to="/closing">Tillbaka </RouterLink>
      </div>
    </div>
  </div>
</template>
