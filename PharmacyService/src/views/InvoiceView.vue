<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Faktury
        </div>

        <div
          v-for="invoice in invoices"
          :key="invoice.id"
          class="flex items-center justify-between px-6 py-4 border-t border-gray-400"
        >
          <div>
            <p class="font-semibold">
              {{ invoice.nr_faktury }}
            </p>
            <p class="text-sm text-gray-700">
              Data: {{ formatDate(invoice.data_wystawienia) }}
            </p>
            <p class="text-sm text-gray-600">
              Lek: {{ invoice.lek.nazwa }}
            </p>
          </div>

          <button
            class="w-9 h-9 bg-sky-400 text-white hover:bg-sky-600 transition rounded-lg flex items-center justify-center font-bold text-lg"
            @click="openDetails(invoice.id)"
          >
            i
          </button>
        </div>

        <p v-if="loading" class="text-center py-4">Ładowanie...</p>
        <p v-if="error" class="text-center py-4 text-red-500">{{ error }}</p>

      </div>
    </main>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "InvoiceView",
  data() {
    return {
      invoices: [],
      loading: false,
      error: "",
    };
  },
  async mounted() {
    await this.fetchInvoices();
  },
  methods: {
    async fetchInvoices() {
      this.loading = true;
      this.error = "";

      try {
        const response = await api.get("/api/faktury");
        this.invoices = response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = "Brak autoryzacji – zaloguj się ponownie";
          this.$router.push("/login");
        } else {
          this.error = "Nie udało się pobrać faktur";
        }
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("pl-PL");
    },
    openDetails(id) {
      this.$router.push(`/invoice/${id}`);
    },
  },
};
</script>