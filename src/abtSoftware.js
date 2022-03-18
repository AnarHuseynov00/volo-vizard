const About = () => {
    return ( <div>
        <h2>How to use the software?</h2>
        <p>In order to use the software, user should give the return data of previous days as an input. The format of the input
            is the comma seperated return values (in percentage) of consequentive days in ascending order (t-i, t-i+1, t-i+2 ...).
        </p>
        <p>Here is the example input: 1.16, 1.12, -2.11, 0.1234, 3.44 (length is 5)</p>
        <p>The software is designed to accept the data from last 14 days when the market was open. So, it is recommended to 
            input the data of the last 14 days. If the length of the data is higher than 14, then last 14 days (last 14 values) 
            will be used. If the length of input data is lower than 14, then initial missing values will be filled with the mean
            daily return of {"S&P500"} index which is 0.02978%. The visualization will be shown as a line plot of previous volatility 
            and predicted volatility (the last data point in the line plot) 
        </p>
    </div> );
}
 
export default About;