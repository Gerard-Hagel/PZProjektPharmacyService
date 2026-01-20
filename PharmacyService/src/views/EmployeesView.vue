<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Pracownicy
        </div>

        <div
          v-for="employee in employees"
          :key="employee.id"
          class="flex justify-between items-center px-6 py-4 border-t border-gray-400"
        >
          <div class="leading-tight">
            <p class="font-semibold">
              {{ employee.imie }} {{ employee.nazwisko }}
            </p>
            <p class="text-sm text-gray-700">
              ID: {{ employee.id }}
            </p>
            <p
              class="text-sm font-semibold"
              :class="employee.zmiana === 'Nocna' ? 'text-red-600' : 'text-green-600'">
              Zmiana: {{ employee.zmiana }}
            </p>
          </div>

          <button
            class="w-9 h-9 bg-sky-400 text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg"
            @click="viewDetails(employee.id)"
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
  name: "EmployeesView",
  data() {
    return {
      employees: [],
      loading: false,
      error: "",
    };
  },
  async mounted() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      this.loading = true;
      this.error = "";

      try {
        const response = await api.get("/api/users");
        this.employees = response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          this.error = "Brak autoryzacji – zaloguj się ponownie";
          this.$router.push("/login");
        } else {
          this.error = "Nie udało się pobrać pracowników";
        }
      } finally {
        this.loading = false;
      }
    },
    viewDetails(id) {
      this.$router.push(`/employees/${id}`);
    },
  },
};
</script>