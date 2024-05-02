<template>
    <div>
      <button @click="handleYesClick">Yes</button>
      <button @click="handleNoClick">No</button>
    </div>
</template>
  
  <script>
  export default {
    methods: {
      handleYesClick() {
        this.$emit('answer', 'yes'); // Emit 'yes' when Yes button is clicked
      },
      handleNoClick() {
        this.$emit('answer', 'no'); // Emit 'no' when No button is clicked
      },
    },
  };
  </script>
  
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