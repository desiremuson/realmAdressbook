<template>
  <div class="home">
    <v-row>
      <v-col>
        <v-card outlined class="mx-auto">
          <v-card-subtitle class="pb-0"
            >Name: {{ firstname }} {{ lastname }}</v-card-subtitle
          >
          <v-card-text class="text--primary">
            <div>Tel: {{ telephone }}</div>
            <div>Email: {{ email }}</div>
          </v-card-text>
          <v-card-actions>
            <router-link to="/">
              <div class="my-2">
                <v-btn small>Back</v-btn>
              </div></router-link
            >
            <v-spacer></v-spacer>
            <router-link :to="{ name: 'editContact', params:{ contact_id: contact_id}}">
              <div class="my-2">
                <v-btn small>Edit</v-btn>
              </div></router-link
            >

            <v-btn text small color="error" @click="deleteContact"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import database from "../components/firbaseInit";
export default {
  name: "viewContact",
  data() {
    return {
      contact_id: null,
      firstname: null,
      lastname: null,
      telephone: null,
      email: null,
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
    deleteContact() {
      if (confirm("Are you sure to delete ?")) {
        database
          .collection("addressbook")
          .where("contact_id", "==", this.$route.params.contact_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    },
  },
};
</script>

<style></style>
