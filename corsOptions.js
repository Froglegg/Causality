const whitelist = [
  "http://localhost:3001/",
  "http://localhost:3000/",
  "http://localhost:5000/",
  "https://causality-app.herokuapp.com"
];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origin: ${origin} Not allowed by CORS`));
    }
  }
};

module.exports = corsOptions;
