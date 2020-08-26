<template>
  <div class="home">
    <div class="my-2">
      <v-btn small color="#F5A623" @click="$router.push('/new')"
        >New Contact</v-btn
      >
      <v-text-field label="Seach Contact" v-model="search"></v-text-field>

      <v-row>
        <v-col
          v-for="contact in filterdContacts"
          :key="contact.id"
          cols="12"
          md="3"
        >
          <v-card outlined class="mx-auto">
            <v-card-subtitle class="pb-0"
              >Name: {{ contact.firstname }}
              {{ contact.lastname }}</v-card-subtitle
            >
            <v-card-text class="text--primary">
              <div>Tel: {{ contact.telephone }}</div>
              <div>Email: {{ contact.email }}</div>
            </v-card-text>
            <v-card-actions>             

              <router-link
                v-bind:to="{
                  name: 'viewContact',
                  params: { contact_id: contact.contact_id },
                }"
                ><v-btn color="primary" fab small dark>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn></router-link
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import database from "../components/firbaseInit";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      contacts: [],
      search: "",
    };
  },
  created() {
    database
      .collection("addressbook")
      .orderBy("firstname")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            contact_id: doc.data().contact_id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            telephone: doc.data().telephone,
            email: doc.data().email,
          };
          this.contacts.push(data);
        });
      });
  },
  computed: {
    filterdContacts() {
      return this.contacts.filter((contact) => {
        return contact.firstname.match(this.search);
      });
    },
  },
};
</script>
