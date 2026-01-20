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
          class="flex justify-between items-center px-6 py-4 border-t border-gray-400"
        >
          <div class="leading-tight">
            <p class="font-semibold">
              {{ medicine.nazwa }} / ID {{ medicine.id }}
            </p>
            <p
              class="text-sm font-semibold"
              :class="medicine.refundacja ? 'text-green-600' : 'text-red-600'">
              {{ medicine.refundacja ? 'Refundowany' : 'Nierefundowany' }}
            </p>
            <p class="text-sm text-gray-700">
              Ilość: {{ medicine.stan_w_magazynie }}
            </p>
          </div>

          <div class="flex space-x-3">
            <button
              @click="increase(medicine)"
              class="w-9 h-9 bg-green-400 text-white hover:bg-green-600 transition rounded-lg flex items-center justify-center font-bold text-lg"
            >
              +
            </button>

            <button
              @click="decrease(medicine)"
              class="w-9 h-9 bg-red-400 text-white hover:bg-red-600 transition rounded-lg flex items-center justify-center font-bold text-lg"
            >
              -
            </button>

            <button
              class="w-9 h-9 bg-sky-400 text-white hover:bg-sky-600 transition rounded-lg flex items-center justify-center font-bold text-lg"
              @click="viewDetails(medicine.id)"
            >
              i
            </button>
          </div>
        </div>

        <p v-if="loading" class="text-center py-4">Ładowanie leków...</p>
        <p v-if="error" class="text-center py-4 text-red-500">{{ error }}</p>

      </div>
    </main>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "MedicinesView",
  data() {
    return {
      medicines: [],
      loading: false,
      error: "",
    };
  },
  async mounted() {
    await this.fetchMedicines();
  },
  methods: {
    async fetchMedicines() {
      this.loading = true;
      this.error = "";

      try {
        const response = await api.get("/api/leki");
        this.medicines = response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = "Brak autoryzacji – zaloguj się ponownie";
          this.$router.push("/login");
        } else {
          this.error = "Nie udało się pobrać listy leków";
        }
      } finally {
        this.loading = false;
      }
    },
    increase(medicine) {
      medicine.stan_w_magazynie++;
    },
    decrease(medicine) {
      if (medicine.stan_w_magazynie > 0) {
        medicine.stan_w_magazynie--;
      }
    },
    viewDetails(id) {
      this.$router.push(`/medicines/${id}`);
    },
  },
};
</script>