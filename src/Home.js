import { useState } from "react";
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';


const Home = () => {
    const title = "Volatility Prediction App"
    const [inputData, setInputData] = useState('')
    const [prediction, setPrediction] = useState(null)
    const [buttonDisable, setButtonDisable] = useState(false);
    const [demoButtonDisable, setDemoButtonDisable] = useState(false);
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
        setDemoButtonDisable(true);
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
            if (data.statusCode === 400) {
              const outputErrorMessage = JSON.parse(data.errorMessage)['outputResultsData'];
              setPrediction(outputErrorMessage);
            }
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
                name: "Previous volatility values",
                color: "steelblue", 
                points: vol_numbers
              }]
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
            setButtonDisable(false);
            setDemoButtonDisable(false);
            setButtonText('Evaluate');
            setPredictionText("Volatility prediction in percentage(%) is: ")
          }).then(() => {
            console.log('POST request success');
          })
    }

    const HandleSubmitDemo = (event) =>{
      event.preventDefault();
      setButtonDisable(true);
      setDemoButtonDisable(true);
      setButtonText("Evaluating...");
      setPredictionText("Calculating prediction...")
      setPrediction(null)
      setPredColor("black")
      setPredMessage("")
      console.log("making post request");
      fetch('https://4w801pm2t0.execute-api.us-east-1.amazonaws.com/prod/', {
          method: 'POST',
          headers: { "Content-Type": "application/json", "Accept": "text/plain" },
          body: JSON.stringify({ "data": "demo" })
      }).then(response => response.json()).then(data => {
          console.log('getting response...')
          console.log(data);
          if (data.statusCode === 400) {
            const outputErrorMessage = JSON.parse(data.errorMessage)['outputResultsData'];
            setPrediction(outputErrorMessage);
          }
          else {
            const outputBytesData = JSON.parse(data.body)['outputResultsData'];
            let num_return = Number(outputBytesData)
            setPrediction(num_return);
            let strNums = ["0.64", "-0.16", "-0.13", "-0.2" , "-0.24",  "0.19", "-0.11", "-0.08", "-0.1" ,
              "0.73",  "0.11",  "0.29", "-0.23", "-0.16"]
            let vol_numbers = strNums.map(convertToNum)
            let cdata = [{
              id:1,
              name: "Predicted trajectory", 
              color:"red", 
              points:[{x:vol_numbers.length-1, y:vol_numbers[vol_numbers.length-1].y},
            {x:vol_numbers.length, y:num_return}]},{
              id:2,
              name: "Previous volatility values",
              color: "steelblue", 
              points: vol_numbers
            }]
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
          setButtonDisable(false);
          setDemoButtonDisable(false);
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
            <p>Click the Demo button to make a demonstration of how pedictor works. Check Documentation page for the details of how it works</p>
            <Button onClick={HandleSubmitDemo} disabled={demoButtonDisable} variant="contained" 
            style={{marginTop:20, marginBottom:20}}>
              demo
              </Button>
              <Divider>Volo-Wizard</Divider>
            <form onSubmit={HandleSubmit} style={{paddingTop:20, paddingBottom:40}}>
                <label>Enter your return values:</label>
                <input placeholder={"Enter return values"} type="text" required = {true} value={inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
        
                <Button type="submit" disabled={buttonDisable} variant="contained">{buttonText}</Button>
            </form>
            <h4 style={{paddingBottom:10}}>{predictionText} {<h4 style={{color:predColor}}>{prediction}</h4>}</h4>
            <h4 style={{paddingBottom:10, color:predColor}}>{predMessage}</h4>
            <LineChart 
                    xLabel = {'Time'}
                    yLabel = {'Volatility(%)'}
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