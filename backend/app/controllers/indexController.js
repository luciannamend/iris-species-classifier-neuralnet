//require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');

// Load iris training and testing data
const iris = require('../../iris.json');
//const irisTesting = require('../../iris-testing.json');
var lossValue;

exports.trainAndPredict = function (req, res) {
    // User inputs
    const { sepalLength, sepalWidth, petalLength, petalWidth, epochs, learningRate } = req.body;
    //check if values exist
    if (!sepalLength || !sepalWidth || !petalLength || !petalWidth || !epochs || !learningRate) {
        return res.status(400).json({ error: "Input fields not found" });
    }
    console.log("Iris testing Input Data:", { sepalLength, sepalWidth, petalLength,
        petalWidth, epochs, learningRate });

    // Convert data for tensorflow.js
    // Tensor of features for training data, include only features(flower)
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length,
        item.petal_width
    ]))
    //console.log(trainingData.dataSync())

    // Tensor of output for training data, the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1
    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]))

    // Tensor of features for testing data - evaluates the model after training
    // Testing based on the User input - 1 test only
    const testingDataInput = tf.tensor2d( [[
        sepalLength, sepalWidth,petalLength, petalWidth,
    ]])

    // Build neural network using a sequential model - layers added one after another
    const model = tf.sequential();

    // Add the first layer with relu activation
    model.add(tf.layers.dense({
        inputShape: [4], // Four input features: sepal length, sepal width, petal length, petal width
        units: 8,
        activation: 'relu',
    }));

    // Add the second dense layer
    model.add(tf.layers.dense({
        units: 10,
        activation: 'relu',
    }));

    // Add the output layer with softmax activation for multi-class classification
    model.add(tf.layers.dense({
        units: 3, // Three output units for three classes: setosa, virginica, versicolor
        activation: 'softmax', // converts raw scores into probabilities
    }));

    // Compile the model
    model.compile({
        optimizer: tf.train.adam(learningRate), // learning rates from user input
        loss: 'categoricalCrossentropy', // Used for multi-class classification
        metrics: ['accuracy'], // Include accuracy as a metric for evaluation
    });

    console.log(model.summary())

    // Train the model and predict the results for testing data
    // Train/fit the model for the fixed number of epochs
    async function run() {

        const startTime = Date.now()

        // Train the model
        await model.fit(trainingData, outputData,
            {
                epochs: epochs, // Number of epochs based on the user input
                callbacks: { // List of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }
        )

        const results = model.predict(testingDataInput);
        console.log('prediction result: ', results.dataSync())

        // Assuming results contains the softmax output
        results.array().then(array => {
            const prediction = array.map(row => {
                const highestProbIndex = row.findIndex(val => val === Math.max(...row));
                switch(highestProbIndex) {
                    case 0: return 'Setosa';
                    case 1: return 'Virginica';
                    case 2: return 'Versicolor';
                    default: return 'Unknown';
                }
            });
            res.status(200).send(prediction);
        });
    }
    // call the run function
    run();
};
