<script setup></script>

<template>
  <div>
    <div
      class="bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex flex-col justify-end items-center pb-32 md:hidden"
    >
      <section class="w-full h-screen">
        <img
          src="../assets/Header.svg"
          class="object-cover w-screen max-sm:hidden"
          alt=" alt text"
        />
      </section>
      <div class="flex flex-col items-center justify-center">
        <div class="p-4">
          <h2 class="text-xl font-semibold">INSTRUKTIONER:</h2>
          <p class="text-sm">
            I PartySwipe™ får du se vilka<br />ledamöter som du vibear med mest.<br />Swipe:a fram
            din riksdag,<br />
            antingen genom val mellan citat<br />eller bilder.
          </p>
        </div>
        <div class="bg-stone-300 p-4 rounded-xl">
          <div class="m-3">
            <h3 class="text-lg font-semibold">Bild-spelet:</h3>
            <p class="text-sm">
              * Du får se 12 bilder, en bild i<br />taget.<br />* Välj genom att swipea/välja Ja<br />eller
              Nej, alltså om du vill<br />matcha med ledamoten.
            </p>
          </div>

          <div class="m-3">
            <h3 class="text-lg font-semibold">Citat-spelet:</h3>
            <p class="text-sm">
              * Två citat visas från två<br />slumpmässiga ledamöter.<br />* Välj det citat som du
              vibear<br />med mest. Alla citat är<br />slumpmässigt utvalda, välj det<br />som känns
              bäst.
            </p>
          </div>
        </div>

        <div class="text-center mt-6">
          <button class="btn btn-lg bg-teal text-white w-24" @click="this.$router.push('choice')">
            Start
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop -->

    <div
      class="bg-[url('../assets/Header.svg')] bg-cover h-screen md:flex flex-col justify-end items-center pb-28 sm:bg-none hidden"
    >
      <section class="w-full h-screen">
        <img
          src="../assets/Header.svg"
          class="object-cover w-screen max-sm:hidden"
          alt=" alt text"
        />
      </section>
      <div class="flex flex-col md:flex-row items-center justify-center">
        <div class="p-4">
          <h2 class="text-xl font-semibold">INSTRUKTIONER:</h2>
          <p class="text-sm">
            I PartySwipe™ får du se vilka<br />ledamöter som du vibear med mest.<br />Swipe:a fram
            din riksdag,<br />
            antingen genom val mellan citat<br />eller bilder.
          </p>
        </div>
        <div class="p-6">
          <div class="bg-stone-300 p-4 rounded-xl w-72 h-52">
            <div class="m-3">
              <h3 class="text-lg font-semibold">Bild-spelet:</h3>
              <p class="text-sm">
                * Du får se 12 bilder, en bild i<br />taget.<br />* Välj genom att swipea/välja
                Ja<br />eller Nej, alltså om du vill<br />matcha med ledamoten.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-stone-300 p-4 rounded-xl w-72 h-52">
          <div class="m-3">
            <h3 class="text-lg font-semibold">Citat-spelet:</h3>
            <p class="text-sm">
              * Två citat visas från två<br />slumpmässiga ledamöter.<br />* Välj det citat som du
              vibear<br />med mest. Alla citat är<br />slumpmässigt utvalda, välj det<br />som känns
              bäst.
            </p>
          </div>
        </div>

        <div class="text-center mt-6"></div>
      </div>
      <button class="btn btn-lg bg-teal text-white w-24" @click="this.$router.push('choice')">
        Start
      </button>
    </div>
  </div>
</template>
