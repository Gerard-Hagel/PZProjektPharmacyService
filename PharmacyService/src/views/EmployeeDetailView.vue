<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Szczegóły pracownika
        </div>

        <div v-if="loading" class="text-center py-4">Ładowanie...</div>
        <div v-if="error" class="text-center py-4 text-red-500">{{ error }}</div>

        <div v-if="employee" class="flex items-center justify-between px-6 py-4 border-t border-gray-400 space-y-2">
          <div>
            <p class="font-semibold text-lg">{{ employee.imie }} {{ employee.nazwisko }}</p>
            <p class="text-sm text-gray-700">ID: {{ employee.id }}</p>
            <p class="text-sm text-gray-700">Email: {{ employee.email }}</p>
            <p class="text-sm text-gray-700">Data zatrudnienia: {{ formatDate(employee.data_zatrudnienia) }}</p>
            <p class="text-sm font-semibold" :class="employee.zmiana === 'Nocna' ? 'text-red-600' : 'text-green-600'">
                Zmiana: {{ employee.zmiana }}
            </p>
            <p class="text-sm text-gray-700">Rola: {{ employee.admin ? 'Administrator' : 'Pracownik' }}</p>
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
  name: "EmployeeDetailsView",
  data() {
    return {
      employee: null,
      loading: false,
      error: "",
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.fetchEmployee(id);
  },
  methods: {
    async fetchEmployee(id) {
      this.loading = true;
      this.error = "";
      try {
        const response = await api.get(`/api/users/${id}`);
        this.employee = response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = "Brak autoryzacji – zaloguj się ponownie";
          this.$router.push("/login");
        } else if (err.response?.status === 404) {
          this.error = "Pracownik nie istnieje";
        } else {
          this.error = "Błąd podczas pobierania danych pracownika";
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