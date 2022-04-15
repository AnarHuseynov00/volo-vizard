const Motivation = () => {

    return ( 
    <div>
        <h2> Motivation for the project</h2>
        <p>After long years of financial research, it has been found that there is a considerable auto-correlation between daily 
            stock price volatility of consequent days. More explicitly, it has been found that although the direction that stock 
            price will go is almost random, the amount it will change (volatility) is quite related to the volatility of previous 
            days. {<a href="https://www.investopedia.com/terms/s/sp500.asp">{"S&P500"}</a>} index being the weighted sum of top 
            500 stocks also follows this phenomenon of autocorrelation between consequetive days.  
        </p>

        <p>
        This finding has been the main motivation of this project. The aim is to learn the underlying pattern of market 
        autocorrelation and use it to make forecasts. The underlying machine learning model is an LSTM model, a special
        kind of RNN to learn complex time-series patterns. The network is composed on 1 LSTM layer and 2 dense layers. The 
        model is trained and tested using the return data of the {"S&P500"} index from 1967 to 2022. The input is the return data 
        of previous 14 work days and output is the prediction for the volatility in the next day. 
        </p>
        <p>Report is {<a href="https://drive.google.com/file/d/13PL-XL9wXjuFy8uuJ99DJm5xRSjrHY9k/view?usp=sharing">here</a>}</p>
        
    </div>);
}
 
export default Motivation;