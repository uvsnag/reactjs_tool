import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <div>
       
     <Link to="/sql">sql</Link>
     <Link to="/json">json</Link>
     <Link to="/replace">replace</Link>
     <Link to="/media">media</Link>
    </div>
    </div>
  );
}

export default App;