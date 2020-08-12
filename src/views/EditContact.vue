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
          <v-btn color="success" class="mr-4" @click="updateContact"
            >Update</v-btn
          >
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import database from "../components/firbaseInit";
export default {
  name: "editContact",
  data() {
    return {
      firstname: "",
      lastname: "",
      contact_id: null,
      telephone: "",
      email: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    database
      .collection("addressbook")
      .where("contact_id", "==", to.params.contact_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.contact_id = doc.data().contact_id;
            vm.firstname = doc.data().firstname;
            vm.lastname = doc.data().lastname;
            vm.telephone = doc.data().telephone;
            vm.email = doc.data().email;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      database
        .collection("addressbook")
        .where("contact_id", "==", this.$route.params.contact_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.contact_id = doc.data().contact_id;
            this.firstname = doc.data().firstname;
            this.lastname = doc.data().lastname;
            this.telephone = doc.data().telephone;
            this.email = doc.data().email;
          });
        });
    },
    updateContact() {
      database
        .collection("addressbook")
        .where("contact_id", "==", this.$route.params.contact_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                firstname: this.firstname,
                lastname: this.lastname,
                telephone: this.telephone,
                email: this.email,
                contact_id: this.firstname + this.lastname + this.email,
              })
              .then(() => {
                this.$router.push("/");
              });
          });
        });
    },
  },
};
</script>

<style></style>
