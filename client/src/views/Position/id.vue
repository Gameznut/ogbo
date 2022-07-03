<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const id = ref(`${route.params.status}`);
const uri = `http://localhost:4000/login/${id.value}`;
const data = ref();
const getData = async () => {
  try {
    const response = await axios.get(uri);
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};
Promise.all([getData()]).then(function (results) {
  data.value = results[0];
});
</script>
<template>
  <main>
    <div class="flex justify-center ">
      <table class="table">
        <thead>
          <tr>
            <!-- <td>id</td> -->
            <td>First Name</td>
            <td>Last Name</td>
            <td>email</td>
            <td>Password</td>
            <td>Position</td>
          </tr>
        </thead>
        <tbody class="text-[.8rem] text-[#8f8e8e]">
          <tr v-for="dat in data" :key="dat._id">
            <!-- <td>{{ dat._id }}</td> -->
            <td>{{ dat.fname }}</td>
            <td>{{ dat.lname }}</td>
            <td>{{ dat.email }}</td>
            <td>{{ dat.password }}</td>
            <td>{{ dat.position }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>



<style>
</style>