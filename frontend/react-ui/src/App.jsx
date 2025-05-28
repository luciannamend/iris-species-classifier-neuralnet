import {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import './styles/App.css'
import InputFormComponent from "./components/InputFormComponent.jsx";

function App() {
    // collect results after input testing
    const [prediction, setPrediction] = useState([]);

    return (
        <div className="app-container">
            {/*User Input Form*/}
            <InputFormComponent onResults={setPrediction}/>

            {/*Results*/}
            <div>
                <h2>Prediction Results</h2>
                {/* Table for Test Results */}
                <table className="App-table">
                    <thead>
                    <tr>
                        <th className="App-th">Predicted Iris Species</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="App-td">
                            {prediction.length > 0 ? prediction : "Waiting for the input features..."}
                        </td>
                    </tr>
                    </tbody>
                </table>

                {/*/!* Table for Species Values *!/*/}
                {/*<h2>Definition of Values for Species</h2>*/}
                {/*<table className="App-table">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th className="App-th">Species</th>*/}
                {/*        <th className="App-th">Values</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    <tr>*/}
                {/*        <td className="App-td">Setosa </td>*/}
                {/*        <td className="App-td">1, 0, 0</td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td className="App-td">Virginica</td>*/}
                {/*        <td className="App-td">0, 1, 0</td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td className="App-td">Versicolor</td>*/}
                {/*        <td className="App-td">0, 0, 1</td>*/}
                {/*    </tr>*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        </div>
    );
}

export default App;

