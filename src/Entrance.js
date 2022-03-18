import logo from './images/logo200.png'
import { Link } from "react-router-dom";

const Entrance = () => {
    const title = "Welcome to the new generation of machine learning models used in Finance"
    return ( 
    <div className="entrance" style={{alignItems:"center"}}>
        <div style={{width:"50%", marginLeft:"37%"}}>
            <img src={logo} alt="Logo" />
        </div>
        <h2>{title}</h2>
        <div className="entrance-text" style={{paddingTop: 10}}>
            <p>Usage of machine learning methods is among hot topics in Financial Engineering. Its applications ranges from 
                clustering of different stocks according to their idiosyncratic differences, to modeling time-series financial
                data using neural networks.
            </p>
            <p>Volo-Wizard is the ML software for predicting the volatility 
                of {<a href="https://www.investopedia.com/terms/s/sp500.asp">{"S&P500"}</a>} index. More detailed information
                about the literature background (motivation) of the project and machine learning algorithm used is provided
                in the {<Link to="/motivation">Motivation</Link>} page. Instructions about how to use the software is provided
                 in the {<Link to="/about">Documentation</Link>} page</p>
            <p>
                The software is developed 
                by {<a href="https://www.linkedin.com/in/anar-huseynov-78b585151/">{"Anar Huseynov"}</a>}, a graduate 
                student at the University of Michigan and also, an incoming
                Machine Learning Operations engineer at the Ford Motor Company. 
            </p>
        </div>

    </div> );
}
 
export default Entrance;