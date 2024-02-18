const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const port = process.env.PORT || 3555;

const app = express();

app.use(cors());

function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "k";
  } else {
    return num;
  }
}

//routes
app.get("/api/country/:query", async (req, res) => {
  try {
    const code = req.params.query;
    const response = await axios(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const native = response.data[0].name.nativeName;
    const nArray = Object.values(native);
    let n = [];
    nArray.map((name) => {
      n.push(name.official);
    });
    let capital = response.data[0].capital;
    let cArray = Object.values(capital);
    let c = [];
    cArray.map((capital) => {
      c.push(capital);
    });
    const data = {
      nameOff: response.data[0].name.official,
      nameCom: response.data[0].name.common,
      nameNative: n,
      capital: c,
      flag: response.data[0].flags.svg,
      coa: response.data[0].coatOfArms.svg,
      pop: formatNumber(response.data[0].population),
      countryCode: response.data[0].cca2.toLowerCase(),
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(port, () => console.log(`App running on port: ${port}`));
