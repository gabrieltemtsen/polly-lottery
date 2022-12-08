<script setup lang="ts">
import {storeToRefs } from 'pinia'
import { useCryptoStore } from '@/stores/crypto';
import { ref } from 'vue';

const ticketPrice = ref(null as any)
const cryptoStore = useCryptoStore()
const {setDraw, connectWallet, enterDraw} = useCryptoStore();
const {account, lotteryPool} = storeToRefs(cryptoStore)

</script>
<template>
  <div class="about">
    <h1>This is an about page Lottery pool Price:  {{lotteryPool}} </h1>

    <button v-if="!account" class="button" @click="connectWallet">Connect Wallet</button>
    <div v-if="account">
      <input v-model="ticketPrice" type="number">
      <button  class="button" @click="setDraw(ticketPrice)">Send</button>

      <button class="button" @click="enterDraw"> Enter Draw</button>


    </div>





  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.button{
  font-size: large;
  background-color: green;
  border-radius: 5px;
  padding: 20px;
}
</style>
