<script setup lang="ts">
import {storeToRefs } from 'pinia'
import { useCryptoStore } from '@/stores/crypto';
import { ref } from 'vue';

const ticketPrice = ref(null as any)
const cryptoStore = useCryptoStore()
const { connectWallet, enterDraw, pickWinner, withdraw} = useCryptoStore();
const {account, lotteryPool, ticketCount, isOwner, isWinner,} = storeToRefs(cryptoStore)
</script>

<template>
  <div class="d-flex justify-content-center py-5">
  
    <p v-if="!account">Please Connect your Wallet to play Polly-Lottery</p>
    <div v-if="account" class="card text-center">
  <div class="card-header bg-dark">
    Prize Pool: {{lotteryPool}} MATIC
  </div>
  <div class="card-body bg-dark">
    <h5 class="card-title">Entry Fee: 0.05 MATIC</h5>
    <h5 class="card-title">Tickets: {{ticketCount}} Ticket(s)</h5>

    <p class="card-text"> You can buy as many tickets as you want. </p>
    <p class="card-text"> Once the draw ends kindly come to check if you won the lottery. </p>
    <a href="#" class="btn btn-primary" @click="enterDraw">Buy Tickets</a>
    <div class="py-5">
      <p v-if="isWinner">
      <a href="#" class="btn btn-primary" @click="withdraw">Withdraw</a>
    </p> 

    </div>
    <div><p v-if="isOwner">
      <a href="#" class="btn btn-primary" @click="pickWinner">Pick Winner</a>
    </p> 
  </div>
    
  </div>
  <div class="card-footer text-muted">
    Draw to end in: 5 Hours
  </div>
</div>
  
</div>
</template>
