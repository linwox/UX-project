<script setup>

import CardView from '@/views/CardView.vue';
import RiksdagensData from '@/services/RiksdagensData';
</script>

<script>
export default{
  data() {
    return{
      randomid: undefined


    }
  },
  methods: {
    async loadPerson(){
      console.log("hej")

    }
  
  }

}


</script>

<template>
    <nav>
      <ul>
        <li><button id="ja">Ja</button></li>
        <li><button id="nej">Nej</button></li>
      </ul>
    </nav>
</template>


<style scoped>

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

</style>