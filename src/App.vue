<template>
  <v-app>
    <v-app-bar app color="#F5A623" dark>
      <h2>Address Book</h2>
      <v-spacer></v-spacer>

      <h5 v-if="isloggedIn">{{ currentUser }}</h5>

      <v-btn v-if="!isloggedIn" text @click="login">
        Login
      </v-btn>
      <v-btn v-if="!isloggedIn" text @click="register">
        Register
      </v-btn>
      <v-btn v-if="isloggedIn" color="black" @click="logout" text>
        Logout
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",

  components: {},

  data() {
    return {
      isloggedIn: false,
      currentUser: false,
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isloggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
         this.$router.go({path:this.$router.path});
        });
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>
