const Entrance = () => {
    const title = "Welcome to the new generation of machine learning models used in Finance"
    return ( 
    <div>
        <h2>{title}</h2>
        <div className="entrance-text" style={{paddingTop: 10}}>
            <p>Usage of machine learning methods is among hot topics in Financial Engineering. Its applications ranges from 
                clustering of different stocks according to their idiosyncratic differences, to modeling time-series financial
                data using neural networks.

                Volo-Wizard is the machine learning software, trained for predicting the volatility of {<a href="https://www.investopedia.com/terms/s/sp500.asp">{"S&P500"}</a>} index.
            </p>
        </div>

    </div> );
}
 
export default Entrance;