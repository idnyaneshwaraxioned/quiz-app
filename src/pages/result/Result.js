import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { QDATA } from '../../constant/questions';

class Result extends Component {
  state = {
    correctAnswer: 0,
    wrongAnsweer: 0,
    attemptQuestion: 0
  }

  componentDidMount() {
    this.showResult()
  }
  showResult = () => {
    const counts = {};
    const arr = this.props.correctAnsCount.map(val => val.opsn === val.ans)
    arr.forEach((val) => { counts[val] = (counts[val] || 0) + 1; });
    this.setState({ correctAnswer: counts.true, wrongAnsweer: counts.false })
    this.setState({ attemptQuestion: QDATA.length - this.props.correctAnsCount.length })
  }
  render() {

    return (
      <div className="resultShow">
        <h3 className="result-score">Score</h3>
        <p>Correct Answer: <span className="rightcount">{this.state.correctAnswer}</span></p>
        <p>Wrong Answer: <span className="wrongcount">{this.state.wrongAnsweer}</span></p>
        <p>Attemp Questions: <span className="wrongcount">{QDATA.length-this.state.attemptQuestion}</span></p>
        <Link to="/" className="link-btn">Restart</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    correctAnsCount: state.quizReducer.correctAnsCount
  }
}

export default connect(mapStateToProps, null)(Result)