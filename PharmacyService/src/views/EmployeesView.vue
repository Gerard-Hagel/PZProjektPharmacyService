<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Pracownik
        </div>

        <div
          v-for="employee in employees"
          :key="employee.id"
          class="flex justify-between items-center px-6 py-4 border-t border-gray-400">
          <div class="leading-tight">
            <p class="font-semibold">
              {{ employee.firstName }} {{ employee.lastName }}
            </p>
            <p class="text-sm text-gray-700">
              Numer ID: {{ employee.id }}
            </p>
            <p
              class="text-sm font-semibold"
              :class="employee.shift === 'Nocna'
                ? 'text-red-600'
                : 'text-green-600'">
              Zmiana: {{ employee.shift }}
            </p>
          </div>

          <button
            class="w-9 h-9 bg-sky-400 text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">
            i
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "EmployeesView",
  data() {
    return {
      employees: [
        { id: 201, firstName: "Adam", lastName: "Mazur", shift: "Dzienna" },
        { id: 202, firstName: "Karolina", lastName: "Lewandowska", shift: "Nocna" },
        { id: 203, firstName: "Tomasz", lastName: "Zieliński", shift: "Dzienna" },
        { id: 204, firstName: "Natalia", lastName: "Kamińska", shift: "Nocna" },
      ],
    };
  },
};
</script>