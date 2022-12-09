<script setup lang="ts">
import {storeToRefs } from 'pinia'
import { useCryptoStore } from '@/stores/crypto';
import { ref } from 'vue';

const ticketPrice = ref(null as any)
const cryptoStore = useCryptoStore()
const {setDraw, connectWallet, enterDraw} = useCryptoStore();
const {account, lotteryPool, ticketCount,nativeBalance} = storeToRefs(cryptoStore)

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="move">
    <button v-if="!account" class="connect"  @click="connectWallet">Connect Wallet</button> 
  <button v-if="account" class="connect">Address: {{account}}</button> 
  <button v-if="account" class="connect">Balance: {{nativeBalance}} MATIC</button> 


  </div>
  <div class="greetings">
    <h1 class="fom fst-italic">{{ msg }}</h1>
    <h3>
      Play and win lotteries on the Polygon Network
    </h3>
  </div>
</template>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.2rem;
  top: -10px;
}
.fom{
  color:  #d8c8c8; /* Green */
;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.connect {
  background-color: #111211; /* Green */
  border-radius: 5px;
  cursor: pointer;
  border: #111211;
  color: white;
  padding: 10px 10px;
  margin-bottom: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
