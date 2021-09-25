<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else>{{ count }}</p>

    <p v-if="loading">Loading...</p>
    <p v-else>{{ balance }}</p>

    <p>Load count from store: {{ countFromStore }}</p>

    <button @click="getCount">Get Count</button>
    <button @click="increment">Increment</button>
    <button @click="getBalance">Get Balance</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { counter } from '@/contracts';
import { refContract, Snip20Contract } from '@stakeordie/griptape.js';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
  setup() {
    const sefi = refContract<Snip20Contract>('sefi');

    const count = ref<number>();
    const loading = ref(false);
    const balance = ref<string>();

    async function getCount() {
      loading.value = true;
      const res = await counter.getCount();
      loading.value = false;
      count.value = res.count;
    }

    async function increment() {
      loading.value = true;
      await counter.increment();
      loading.value = false;
      await getCount();
    }

    async function getBalance() {
      loading.value = true;
      const res = await sefi.getBalance();
      loading.value = false;
      balance.value = res.balance.amount;
    }

    return {
      count,
      balance,
      loading,
      getCount,
      increment,
      getBalance
    }
  },

  mounted() {
    this.loadCount();
  },

  methods: {
    ...mapActions(['loadCount']),
  },

  computed: {
    ...mapState({
      countFromStore: (state: any) => state.count
    })
  }
})
</script>

