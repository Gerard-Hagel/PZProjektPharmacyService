<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-lg border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Leki
        </div>

        <div
          v-for="medicine in medicines"
          :key="medicine.id"
          class="flex justify-between items-center px-6 py-4 border-t border-gray-400">
          <div class="leading-tight">
            <p class="font-semibold">
              {{ medicine.name }} / ID {{ medicine.id }}
            </p>
            <p
              class="text-sm font-semibold"
              :class="medicine.refunded ? 'text-green-600' : 'text-red-600'">
              {{ medicine.refunded ? 'Refundowany' : 'Nierefundowany' }}
            </p>
            <p class="text-sm text-gray-700">
              Ilość: {{ medicine.quantity }}
            </p>
          </div>

          <div class="flex space-x-3">
            <button
              @click="increase(medicine)"
              class="w-9 h-9 bg-green-400 text-green-400 rounded-lg flex items-center justify-center text-xl font-bold">
              +
            </button>

            <button
              @click="decrease(medicine)"
              class="w-9 h-9 bg-red-400 text-red-400 rounded-lg flex items-center justify-center text-xl font-bold">
              -
            </button>

            <button
              class="w-9 h-9 bg-sky-400 text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">
              i
            </button>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "MedicinesView",
  data() {
    return {
      medicines: [
        { id: 1, name: "Paracetamol", refunded: true, quantity: 12 },
        { id: 2, name: "Ibuprofen", refunded: false, quantity: 7 },
        { id: 3, name: "Aspiryna", refunded: true, quantity: 20 },
        { id: 4, name: "Amoxicylina", refunded: false, quantity: 5 },
      ],
    };
  },
  methods: {
    increase(medicine) {
      medicine.quantity++;
    },
    decrease(medicine) {
      if (medicine.quantity > 0) {
        medicine.quantity--;
      }
    },
  },
};
</script>