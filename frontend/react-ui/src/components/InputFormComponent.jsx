import React, { useState } from 'react';
import axios from "axios";
import '../styles/InputForm.css'

const InputFormComponent = ({ onResults: onPostResults }) => {
    const [loading, setLoading] = useState(false);
    // State to store form data
    const [formData, setFormData] = useState({
        sepalLength: '',
        sepalWidth: '',
        petalLength: '',
        petalWidth: '',
        epochs: '',
        learningRate: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Ensure all fields are filled
            if (Object.values(formData).some(value => value === '')) {
                alert("Please fill in all fields.");
                setLoading(false);
                return;
            }

            // Parse input values safely
            const inputParsed = {
                sepalLength: parseFloat(formData.sepalLength) || 1,
                sepalWidth: parseFloat(formData.sepalWidth) || 1,
                petalLength: parseFloat(formData.petalLength) || 1,
                petalWidth: parseFloat(formData.petalWidth) || 1,
                epochs: parseInt(formData.epochs, 10) || 1,
                learningRate: parseFloat(formData.learningRate) || 0.01
            };

            // Ensure parsed values are valid
            if (inputParsed.epochs < 1 || isNaN(inputParsed.epochs)) {
                alert("Epochs must be a valid number greater than 0.");
                setLoading(false);
                return;
            }

            if (inputParsed.learningRate <= 0 || isNaN(inputParsed.learningRate)) {
                alert("Learning rate must be a positive number.");
                setLoading(false);
                return;
            }


            // call api post method passing parsed inputs
            const response = await axios.post("/api/run", inputParsed);

            onPostResults(response.data);
            //console.log('onPostResults - test response: ', response.data);
            setLoading(false);

            // Reset the form fields
            setFormData({
                sepalLength: '',
                sepalWidth: '',
                petalLength: '',
                petalWidth: '',
                epochs: '',
                learningRate: ''
            });

        } catch (error) {
            console.error("Error parsing input:", error);
        }
    };

    return (
        <div>
            <h2>Enter Iris Features to Predict the Specie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="sepalLength">Sepal Length:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="sepalLength"
                        name="sepalLength"
                        value={formData.sepalLength}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="sepalWidth">Sepal Width:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="sepalWidth"
                        name="sepalWidth"
                        value={formData.sepalWidth}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="petalLength">Petal Length:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="petalLength"
                        name="petalLength"
                        value={formData.petalLength}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="petalWidth">Petal Width:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="petalWidth"
                        name="petalWidth"
                        value={formData.petalWidth}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="epochs">Number of Epochs:</label>
                    <input
                        type="number"
                        id="epochs"
                        name="epochs"
                        min="1"
                        value={formData.epochs}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="learningRate">Learning Rate:</label>
                    <input
                        type="number"
                        step="0.0001"
                        id="learningRate"
                        name="learningRate"
                        value={formData.learningRate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>Predict</button>
            </form>
        </div>
    );
};

export default InputFormComponent;
