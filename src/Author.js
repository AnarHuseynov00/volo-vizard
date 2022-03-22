import pic from "./images/authirPic.jpg"
const Author = () => {
    return ( <div>
        <div style={{display:"flex", justifyContent:"space-evenly", width:'90%', paddingBottom:40}}>
            <img src={pic} style={{
                 width: 200,
                 height: 200,
                 borderRadius: 200 / 2,
            }} alt="" />
            <div>
            <h2 style={{paddingBottom:10}}>Name: Anar Huseynov</h2>
            <h3>email: ahuseyno@umich.edu</h3>
            <h3>phone: +17345100783</h3>
            <h3>LinkedIn: {<a style={{color:"blue"}} href="https://www.linkedin.com/in/anar-huseynov-78b585151/">here</a>}</h3>
            </div>            
        </div>
        <h3 style={{paddingBottom:15}}>Graduate student in MS in Data Science at the University of Michigan</h3>

        <p>I am the first year graduate student (MS in Data Science) in the University of Michigan. 
            I have a deep knowledge of Statistics, Probability, Linear Algebra, Machine Learning and Data Science. 
            I am pursuing a master's degree to improve my theoretical and practical skills. I am an incoming Machine 
            Learning Operations engineer at Ford Motor Company</p>
    </div> );
}
 
export default Author;