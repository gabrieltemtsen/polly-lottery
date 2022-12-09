<script setup lang="ts">
import {storeToRefs } from 'pinia'
import { useCryptoStore } from '@/stores/crypto';
import { ref } from 'vue';
import moment from 'moment'
import { ethers } from 'ethers';


const ticketPrice = ref(null as any)
const cryptoStore = useCryptoStore()
const {setDraw, connectWallet, enterDraw} = useCryptoStore();
const {account, lotteryPool, ticketCount,nativeBalance, transactions} = storeToRefs(cryptoStore)

const dateTime = (value: any) =>{
  return moment(value).format('YYYY-MM-DD');
}
const formatEther = (value: any) =>{
  return ethers.utils.formatEther(value);
}
</script>

<template>
 <div style="overflow-x:auto;">
  <table>
    <h1 class="">Your Transactions</h1>
    <tr>
      <th>Token</th>
      <th>From</th>
      <th>To</th>
      <th>Date</th>
      <th>Amount</th>
    </tr>
     <tr v-for="transaction in transactions"
      :data="transaction"
      :key="transaction.hash">
      <td class="text-truncate" style="max-width: 150px;">{{transaction.hash}}</td>
      <td class="text-truncate" style="max-width: 150px;">{{transaction.from_address}}</td>
      <td class="text-truncate" style="max-width: 150px;">{{transaction.to_address}}</td>
      <td>{{dateTime(transaction.block_timestamp)}} </td>
      <td>{{formatEther(transaction.value)}}</td>
     
    </tr>
   
  </table>
</div>


</template>
<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #090909}
</style>
