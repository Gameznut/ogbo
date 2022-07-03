<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "../router";
import { RouterLink, RouterView } from "vue-router";

const uri = "http://localhost:4000/signup";

const error = ref("");
const success = ref("");
const user = ref({
  fname: "",
  lname: "",
  password: "",
  conpassword: "",
  email: "",
  position: "",
});
const position = ["manager", "ceo", "accountant"];

const login = () => {
  error.value = "";
  validUser();
};

const validUser = () => {
  if (user.value.password === user.value.conpassword) {
    if (user.value.fname.length <= 0) {
      error.value = "First Name is empty";
    } else if (user.value.lname.length <= 0) {
      error.value = "Last Name is empty";
    } else if (user.value.password.length < 8) {
      error.value = "Password is less than 8";
    } else if (user.value.position === "") {
      error.value = "Position is empty";
    } else if (user.value.email === "") {
      error.value = "Email is empty";
    } else {
      postUser();
    }
  } else {
    error.value = "Password doesn't match";
  }
};
const postUser = async () => {
  try {
    await axios.post(uri, user.value);
    success.value = "Account created"
    setTimeout(() => {
      router.push("/login");
    },3000);
  } catch (err) {
    error.value = "Email already exist";
  }
};
</script>
<template>
  <main>
    <div class="container">
      <div>
        <h1 class="text-center">Signup</h1>
      </div>
      <div v-if="error" class="bg-[red] rounded-[1rem] text-[white] p-[1rem] mb-[1rem]">
        {{ error }}
      </div>
      <div v-if="success" class="bg-[#2add33] rounded-[1rem] text-[white] p-[1rem] mb-[1rem]">
        {{ success }}
      </div>
      <form @submit.prevent="login">
        <div class="flex flex-col gap-[1rem]">
          <div class="flex gap-[1rem]">
            <div class="grid w-full gap-[.5rem]">
              <label for="fname">first name</label>
              <input v-model="user.fname" type="text" name="fname" id="fname" />
            </div>
            <div class="grid w-full gap-[.5rem]">
              <label for="sname">last name</label>
              <input v-model="user.lname" type="text" name="sname" id="sname" />
            </div>
          </div>

          <div class="grid gap-[.5rem]">
            <label for="email">email</label>
            <input v-model="user.email" type="email" name="email" id="email" />
          </div>
          <div class="grid gap-[.5rem]">
            <label for="password">password</label>

            <input
              v-model="user.password"
              type="password"
              autocomplete=""
              name="password"
              id="password"
            />
          </div>
          <div class="grid gap-[.5rem]">
            <label for="conpassword">confirm password</label>

            <input
              v-model="user.conpassword"
              type="password"
              autocomplete=""
              name="conpassword"
              id="conpassword"
            />
          </div>
          <div class="grid gap-[.5rem]">
            <label for="position">position</label>
            <select
              class="capitalize"
              v-model="user.position"
              name="position"
              id="position"
            >
              <option disabled value="">select your position</option>
              <option
                class=""
                v-for="(pos, i) in position"
                :key="i"
                :value="pos"
              >
                {{ pos }}
              </option>
            </select>
          </div>
          <button class="bg-[white] mx-[auto]" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </main>
</template>


<style>
label,
option {
  text-transform: capitalize;
}
option,
input,
select,
button {
  color: rgb(255, 255, 255);
}

input,
option,
select,
button {
  background-color: black;
  outline: 0;
}

input,
select {
  padding: 1rem 1.5rem;
  border-radius: 0.7rem;
}

button {
  width: max-content;
  outline: 0;
  padding: 1rem 3rem;
  border-radius: 0.5rem;
  color: black;
  transition: all 0.4s;
}

button:hover {
  background-color: black;
  color: white;
}
</style>
