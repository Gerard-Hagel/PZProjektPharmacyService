<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Szczegóły faktury
        </div>

        <div v-if="loading" class="text-center py-4">Ładowanie...</div>
        <div v-if="error" class="text-center py-4 text-red-500">{{ error }}</div>

        <div v-if="invoice" class="flex items-center justify-between px-6 py-4 border-t border-gray-400">
          <div>
            <p class="font-semibold">{{ invoice.nr_faktury }}</p>
            <p class="text-sm text-gray-700">Data: {{ formatDate(invoice.data_wystawienia) }}</p>
            <p class="text-sm text-gray-600">Lek: {{ invoice.lek.nazwa }}</p>
            <p class="text-sm text-gray-600">Ilość: {{ invoice.ilosc }}</p>
            <p class="text-sm text-gray-600">Cena: {{ invoice.cena_sprzedazy }} zł</p>
            <p class="text-sm text-gray-600">
              Klient: {{ invoice.klient ? invoice.klient.imie + ' ' + invoice.klient.nazwisko : invoice.dane_klienta }}
            </p>
            <p class="text-sm text-gray-600">Pracownik: {{ invoice.dane_pracownika }}</p>
          </div>

          <button
            @click="$router.back()"
            class="w-9 h-9 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg flex items-center justify-center font-bold text-lg"
          >
            ←
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "InvoiceDetailsView",
  data() {
    return {
      invoice: null,
      loading: false,
      error: "",
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.fetchInvoice(id);
  },
  methods: {
    async fetchInvoice(id) {
      this.loading = true;
      this.error = "";
      try {
        const response = await api.get(`/api/faktury/${id}`);
        this.invoice = response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = "Brak autoryzacji – zaloguj się ponownie";
          this.$router.push("/login");
        } else if (err.response?.status === 404) {
          this.error = "Faktura nie istnieje";
        } else {
          this.error = "Błąd podczas pobierania faktury";
        }
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("pl-PL");
    },
  },
};
</script>