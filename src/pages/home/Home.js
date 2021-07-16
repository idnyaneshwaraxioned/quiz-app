import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="welcome">
        <h2>Welcome to Quiz</h2>
        <Link to="/quiz" className="link-btn">Start Quiz</Link>
      </div>
    )
  }
}


export default Home