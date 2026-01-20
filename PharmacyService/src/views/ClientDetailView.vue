<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Szczegóły klienta
        </div>

        <div v-if="loading" class="text-center py-4">Ładowanie...</div>
        <div v-if="error" class="text-center py-4 text-red-500">{{ error }}</div>

        <div v-if="client" class="flex items-center justify-between px-6 py-4 border-t border-gray-400 space-y-2">
          <div>
            <p class="font-semibold text-lg">{{ client.imie }} {{ client.nazwisko }}</p>
            <p class="text-sm text-gray-700">ID: {{ client.id }}</p>
            <p class="text-sm text-gray-700" v-if="client.peSEL">PESEL: {{ client.peSEL }}</p>
            <p class="text-sm text-gray-700" v-if="client.data_urodzenia">Data urodzenia: {{ formatDate(client.data_urodzenia) }}</p>
            <p class="text-sm text-gray-700" v-if="client.adres">Adres: {{ client.adres }}</p>
            <p class="text-sm text-gray-700" v-if="client.nr_telefonu">Telefon: {{ client.nr_telefonu }}</p>
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
  name: "ClientDetailsView",
  data() {
    return {
      client: null,
      loading: false,
      error: "",
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.fetchClient(id);
  },
  methods: {
    async fetchClient(id) {
      this.loading = true;
      this.error = "";
      try {
        const response = await api.get(`/api/klienci/${id}`);
        this.client = response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = "Brak autoryzacji – zaloguj się ponownie";
          this.$router.push("/login");
        } else if (err.response?.status === 404) {
          this.error = "Klient nie istnieje";
        } else {
          this.error = "Błąd podczas pobierania danych klienta";
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