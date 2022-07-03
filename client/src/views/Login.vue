<script setup>
import { ref, onMounted } from "vue";
import joi from "joi";
import axios from "axios";
import router from "../router";

const uri = "http://localhost:4000/login";

const schema = joi.object().keys({
  name: joi.string().required(),
  password: joi.string().trim().min(8).required(),
});

const error = ref("");
const success = ref("");
const user = ref({
  email: "",
  password: "",
  position: "",
});
const position = ["manager", "ceo", "accountant"];

const login = () => {
  error.value = "";
  validUser();
};

// onMounted(()=>{})
/*
  // const result = schema.validate(user.value, {
  //   allowUnknown: true,
  // });
  // if (result.error === null) {
  //   return true;
  // }
  // if (result.error.message.includes(name)) {
  //   error.value = "Name is empty";
  // }
  //  else {
  //   error.value = "Password is short";
  // }

  // console.log(result);
  // return false; 
  */
const validUser = () => {
  if (user.value.email.length <= 0) {
    error.value = "Email is empty";
  } else if (user.value.password.length < 8) {
    error.value = "Password is less than 8";
  } else if (user.value.position === "") {
    error.value = "Position is empty";
  } else {
    postUser();
  }
};
const postUser = async () => {
  try {
    const response = await axios.post(uri, user.value);
    success.value = response.data.message;
    setTimeout(() => {
      router.push(`/position/${user.value.position}`);
    }, 3000);
  } catch (err) {
    error.value = err.message;
  }
};
</script>
<template>
  <main>
    <div class="container">
      <div>
        <h1 class="text-center">Login</h1>
      </div>
      <transition name="error">
        <div>
          <div
            v-if="error"
            class="bg-[red] text-[white] p-[1rem] rounded-[1rem] mb-[1rem]"
          >
            {{ error }}
          </div>
          <div
            v-if="success"
            class="bg-[#09ff00] text-[white] p-[1rem] rounded-[1rem] mb-[1rem]"
          >
            {{ success }}
          </div>
        </div>
      </transition>

      <form @submit.prevent="login">
        <div class="flex flex-col gap-[1rem]">
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
