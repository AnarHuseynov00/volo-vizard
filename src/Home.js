import { useState } from "react";
import Button from '@mui/material/Button';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';


const Home = () => {
    const title = "Volatily Prediction App"
    const [inputData, setInputData] = useState('')
    const [prediction, setPrediction] = useState(null)
    const [buttonDisable, setButtonDisable] = useState(false);
    const [buttonText, setButtonText] = useState("Evaluate")
    const [predictionText, setPredictionText] = useState("Enter values to see the prediction")
    const [chartData, setChartData] = useState([])
    const [predColor, setPredColor] = useState("black")
    const [predMessage, setPredMessage] = useState("")

    const convertToNum = (val, index) =>{
        let num_val = Number(val);
        num_val = Math.abs(num_val)
        return {x:index, y:num_val}
    }
    const HandleSubmit = (event) =>{
        event.preventDefault();
        setButtonDisable(true);
        setButtonText("Evaluating...");
        setPredictionText("Calculating prediction...")
        setPrediction(null)
        setPredColor("black")
        setPredMessage("")
        console.log("making post request");
        fetch('https://4w801pm2t0.execute-api.us-east-1.amazonaws.com/prod/', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "text/plain" },
            body: JSON.stringify({ "data": inputData })
        }).then(response => response.json()).then(data => {
            console.log('getting response...')
            console.log(data);
      
            // POST request error
            if (data.statusCode === 400) {
              const outputErrorMessage = JSON.parse(data.errorMessage)['outputResultsData'];
              setPrediction(outputErrorMessage);
            }
      
            // POST request success
            else {
              const outputBytesData = JSON.parse(data.body)['outputResultsData'];
              let num_return = Number(outputBytesData)
              setPrediction(num_return);
              let strNums = inputData.split(",");
              let vol_numbers = strNums.map(convertToNum)
              let cdata = [{
                id:1,
                name: "Predicted trajectory", 
                color:"red", 
                points:[{x:vol_numbers.length-1, y:vol_numbers[vol_numbers.length-1].y},
              {x:vol_numbers.length, y:num_return}]},{
                id:2,
                name: "Previous return values",
                color: "steelblue", 
                points: vol_numbers
              }]
              //cdata[0].points.push({x: cdata[0].points.length, y: num_return})
              setChartData(cdata)
              if(num_return > 2){
                setPredColor("red")
                setPredMessage("High Volatility Expected")
              }
              else{
                setPredColor("green")
                setPredMessage("Low Volatility Expected")
              }
            }
      
            // re-enable submit button
            setButtonDisable(false);
            setButtonText('Evaluate');
            setPredictionText("Volatility prediction in percentage(%) is: ")
          }).then(() => {
            console.log('POST request success');
          })
    }
    return ( 
        <div className="create">
            <h1>
                {title}
            </h1>
            <form onSubmit={HandleSubmit} style={{paddingTop:20, paddingBottom:40}}>
                <label>Enter your return values:</label>
                <input placeholder={"Enter return values"} type="text" required = {true} value={inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
                <Button type="submit" disabled={buttonDisable}>{buttonText}</Button>
            </form>
            <h4 style={{paddingBottom:10}}>{predictionText} {<h4 style={{color:predColor}}>{prediction}</h4>}</h4>
            <h4 style={{paddingBottom:10, color:predColor}}>{predMessage}</h4>
            <LineChart 
                    xLabel = {'time frame'}
                    yLabel = {'volatility in %'}
                    showLegends = {true}
                    interpolate="false"
                        width={500}
                        height={400}
                        data={chartData}
                    />
        </div>

     );
}
 
export default Home;