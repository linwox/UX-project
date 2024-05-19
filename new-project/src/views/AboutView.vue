<script setup>
</script>

<template>
  <div
    class="bg-[url('../assets/about.svg')] bg-cover bg-center h-screen flex flex-col justify-end items-center pb-32"
  >
    <div class="text-center">
      <div>
        <h2 class="text-xl">OM OSS</h2>
        <p>
          Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit. Lorem<br />ipsum dolor sit
          amet, consectetur<br />adipiscing elit.
        </p>
      </div>

      <div>
        <h2 class="text-xl">API</h2>
        <p>Riksdagens öppna data</p>
      </div>
      <p>______________________________________</p>

      <div class="">
        <div class="p-4">
          <div class="flex justify-center space-x-1">
            <h2 class="text-xl">Java</h2>
            <img src="../assets/Loggor/logos_java.svg" alt="javalogo" class="" />
          </div>
          <p>Linnéa Woxinger Sköld</p>
          <p>Adam Johansson</p>
          <p>Amanda Vasilis</p>
        </div>

        <div class="p-4">
          <div class="flex justify-center space-x-1">
            <h2 class="text-xl">UX</h2>
            <img src="../assets/Loggor/tabler_ux-circle.svg" alt="javalogo" class="" />
          </div>
          <p>Vilmer Franzino</p>
          <p>Daniel Malmborg</p>
          <p>Sarah Magnusson</p>
          <p>Madde Ek</p>
          <p>Yvon Lascano</p>
          <p>______________________________________</p>
        </div>
      </div>

      <div class="text-center">
        <button class="btn btn-lg bg-teal text-white w-30" @click="this.$router.push('closing')">Tillbaka</button>
      </div>
    </div>
  </div>
</template>
