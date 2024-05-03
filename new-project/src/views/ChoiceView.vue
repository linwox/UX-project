<script setup></script>

<template>
  <main class="main">
    <p>Välj din regering utifrån bilder eller citat:</p>
    <button class="choice" @click="$router.push('card')">Bilder</button>
    <button class="choice" @click="$router.push('quote')">Citat</button>
  </main>
</template>

<script></script>

<style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 600;
  font-size: larger;
}

.choice {
  width: 10rem;
  height: 5rem;
  font-family: Helvetica, sans-serif;
  font-weight: 600;
  font-size: x-large;
  margin-top: 3rem;
  
}

</style>
