import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  }
};

// AuthenticationService.register({
//   email: "hesam.sameni@gmail.com",
//   password: "password21"
// });
