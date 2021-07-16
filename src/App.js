import './App.css';
import Home from './pages/home/Home';
import Quiz from './pages/quiz/Quiz';
import Result from './pages/result/Result';
import { BrowserRouter as Router, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/quiz" component={Quiz}/>
        <Route path="/result" component={Result}/>
      </Router>
    </div>
  );
}

export default App;
