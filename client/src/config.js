let config = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  username: localStorage.getItem("username"),
  name: localStorage.getItem("name"),
  url: "https://mpn-server2.onrender.com/api/",
  v: 1.0,
};
module.exports = config;
