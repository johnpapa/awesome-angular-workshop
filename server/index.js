module.exports.start = start;

function start() {
  const dotenv = require('dotenv');
  if (!process.env.NODE_ENV) {
    // if (dotenv.error) {
    console.error(
      'ENV variables are missing.',
      'Verify that you have set them directly or in a .env file.'
    );
    process.exit(1);
  }

  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3001;
  const www = process.env.WWW || './';
  const bodyParser = require('body-parser');
  const routes = require('./routes');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(express.static(www));
  console.log(`serving ${www}`);
  app.use('/api', routes);
  app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: www });
  });
  app.listen(port, () => console.log(`listening on http://localhost:${port}`));
}
