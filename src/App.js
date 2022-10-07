import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Link to="/sql">sql</Link>
        <Link to="/json">json</Link>
        <Link to="/replace">replace</Link>
        <Link to="/tip_management">tip-management</Link>
        <Link to="/media">media</Link><br/>
        <Link to="/notify">notify</Link>
        <Link to="/listen">listenWordPrac</Link>
        <Link to="/youtube-sub">youtube-sub</Link>
        <Link to="/listenTens">listenPassagePrac</Link>
        <Link to="/voiceToText">VoiceToText</Link>
      </div>
    </div>
  );
}

export default App;
