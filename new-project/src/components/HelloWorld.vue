<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div id="card">
    <div id="image" class="image"></div>
    <p id="name"></p>
    <nav>
      <ul>
        <li><button id="ja">Ja</button></li>
        <li><button id="nej">Nej</button></li>
      </ul>
    </nav>
  </div>

  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <!-- <h3> -->
    <!-- You’ve successfully created a project with -->
    <!-- <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> + -->
    <!-- <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. -->
    <!-- </h3> -->
  </div>
</template>

<style scoped>
#card {
  display: flexbox;
  align-items: center;
  justify-content: center;
  width: 14rem;
  margin: auto;
  margin-top: 10rem;
  border: 3px solid black;
  border-radius: 10px;
}

#image {
  align-items: center;
  justify-content: center;
  text-align: center;
}

#name {
  text-align: center;
  font-size: 200%;
  font-family: Courier, monospace;
  margin: auto;
}

#ja {
  padding: 0.5rem;
  width: 3rem;
}

#nej {
  padding: 0.5rem;
  margin-right: 1rem;
  margin-left: 3rem;
  width: 3rem;
}

p :last-child {
  margin-left: auto;
}

p :first-child {
  margin-right: auto;
}

ul {
  list-style: none;
}

li {
  display: inline-block;
}

/* end of style */

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
