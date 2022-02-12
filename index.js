const express = require("express");
const app = express();
const cookiesParser = require("cookie-parser");
const axios = require("axios");
app.use(express.json());
app.use(cookiesParser());

var PORT = 5000;
var tokenStr =
  "20f442b3d3b12995b09564b7d1879c3a8ec54ebed7c34cb05b5d9d1394d78dfb";

app.get("/getData", async (req, res) => {
  try {
    var data = await axios.get("https://gorest.co.in/public/v2/users");
    res.status(200).json(data.data);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

app.post("/saveData", async (req, res) => {
  try {
    var data = req.body;
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenStr}`;
    const resp = await axios.post("https://gorest.co.in/public/v2/users", data);
    console.log(resp);
    res.status(201).json(resp.data);
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: "email already exist" });
  }
});

app.post("/updateData", async (req, res) => {
  try {
    const { arr } = req.body;

    let n = arr.length;

    for (let i = 0; i < n; i++) {
      let obj = arr[i];
      let id = obj.id;
      delete obj.id;
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenStr}`;
      const resp = await axios.patch(
        "https://gorest.co.in/public/v2/users/" + id,
        obj
      );
    }
    res.status(201).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not updated" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
