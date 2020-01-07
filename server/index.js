const app = require("./app");

const PORT = process.env.PORT || 3000;

(() => {
  try {
    console.log("Starting express");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();