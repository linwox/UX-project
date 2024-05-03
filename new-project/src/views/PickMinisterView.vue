<script setup>
</script>

<template>
    <main class="main">
        <h2>Ministerpost</h2>
        <div>Välj vem som ska ha posten</div>
        <img alt="politician" id="image" :src="imageUrl" />
      <p>{{ firstName }}</p>
      <p>{{ age }}</p>
        <RouterLink to="/government">Se din regering</RouterLink>
    </main>
</template>

<script>
    export default {
        data(){
            return {
                party: undefined
            }
        }
    }
</script>

<style>
.main {
    width: 30rem;
    height: 40rem;
    border: 1px solid black;
    padding: 1rem;
}
</style>
