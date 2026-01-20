<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Szczegóły leku
        </div>

        <div v-if="loading" class="text-center py-4">Ładowanie...</div>
        <div v-if="error" class="text-center py-4 text-red-500">{{ error }}</div>

        <div v-if="medicine" class="flex items-center justify-between px-6 py-4 border-t border-gray-400 space-y-2">
          <div>
            <p class="font-semibold text-lg">{{ medicine.nazwa }}</p>
            <p class="text-sm text-gray-700">ID: {{ medicine.id }}</p>
            <p class="text-sm text-gray-700">Substancja czynna: {{ medicine.substancja_czynna }}</p>
            <p class="text-sm text-gray-700">Preparat: {{ medicine.preparat }}</p>
            <p class="text-sm font-semibold" :class="medicine.refundacja ? 'text-green-600' : 'text-red-600'">
                {{ medicine.refundacja ? 'Refundowany' : 'Nierefundowany' }}
            </p>
            <p class="text-sm text-gray-700">Recepta: {{ medicine.recepta ? 'Wymagana' : 'Nie wymagana' }}</p>
            <p class="text-sm text-gray-700">Cena: {{ medicine.cena }} zł</p>
            <p class="text-sm text-gray-700">Stan w magazynie: {{ medicine.stan_w_magazynie }}</p>
          </div>

            <button
              @click="$router.back()"
              class="w-9 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg flex items-center justify-center font-bold text-lg"
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
  name: "MedicineDetailView",
  data() {
    return {
      medicine: null,
      loading: false,
      error: "",
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.fetchMedicine(id);
  },
  methods: {
    async fetchMedicine(id) {
      this.loading = true;
      this.error = "";
      try {
        const response = await api.get(`/api/leki/${id}`);
        this.medicine = response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = "Brak autoryzacji – zaloguj się ponownie";
          this.$router.push("/login");
        } else if (err.response?.status === 404) {
          this.error = "Lek nie istnieje";
        } else {
          this.error = "Błąd podczas pobierania danych leku";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>