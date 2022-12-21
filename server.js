import fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

var data;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} : http://localhost:${PORT}`);
});

app.use("/", express.static(process.cwd()));

app.post("/datasend", (req, res) => {
  data = req.body;
  console.log(data);
  var fileRead = fs.readFileSync("test.json");
  var localObject = JSON.parse(fileRead);
  localObject[data.email] = data;
  var newData2 = JSON.stringify(localObject);
  fs.writeFile("test.json", newData2, (err) => {
    if (err) throw err;
    console.log("New data added");
  });
});
