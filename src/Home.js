import { useState } from "react";

const Home = () => {
    const title = "Volatily Prediction App"
    const [inputData, setInputData] = useState('')
    const [prediction, setPrediction] = useState("")
    const [buttonDisable, setButtonDisable] = useState(false);
    const [buttonText, setButtonText] = useState("Evaluate")
    const [predictionText, setPredictionText] = useState("Enter values to see the prediction")
    
    const HandleSubmit = (event) =>{
        event.preventDefault();
        setButtonDisable(true);
        setButtonText("Evaluating...");
        setPredictionText("Calculating prediction...")
        setPrediction("")
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
              setPrediction(outputBytesData);
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
            <form onSubmit={HandleSubmit}>
                <label>Input Field</label>
                <input type="text" required = {true} value={inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
                <button type="submit" disabled={buttonDisable}>{buttonText}</button>
            </form>
            <h4>{predictionText} {prediction}</h4>
        </div>

     );
}
 
export default Home;