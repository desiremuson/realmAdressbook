<template>
  <div class="home">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="telephone"
              label="Telephone"
              required
            ></v-text-field>
          </v-col>
          <v-btn color="warning" class="mr-4" @click="submit">save</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import database from "../components/firbaseInit";
export default {
  name: "newContact",
  data() {
    return {
      valid: false,
      firstname: "",
      lastname: "",
      contact_id: null,
      telephone: "",
      email: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    submit() {
      database
        .collection("addressbook")
        .add({
          firstname: this.firstname,
          lastname: this.lastname,
          telephone: this.telephone,
          email: this.email,
          contact_id: this.firstname + this.lastname+this.email
        })
        .then(() => this.$router.push("/"))
        .catch(() => console.log("ERROR"));
    },
  },
};
</script>

<style></style>
