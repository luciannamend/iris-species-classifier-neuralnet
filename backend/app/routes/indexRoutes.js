// Load the 'index' controller
const index = require('../controllers/indexController')

// Define the routes module method
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {
            info: "see the results in console window"
        })
    });

    app.get('/run', index.trainAndPredict);

    app.post('/run', index.trainAndPredict);
};
