import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { QDATA } from '../../constant/questions'
import { getCorrectAnsCount, resetCorrectAnsCount } from '../../duck/actions/actions';

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allQsn: QDATA,
      qNumber: 0,
      timer: { min: 2, sec: 60 },
      countDownTimer: null,
      correctAns: [],
    }
  }

  componentDidMount() {
    this.props.resetCorrectAnsCount()
    this.setState({ countDownTimer: setInterval(this.quizTimer, 1000) })
  }

  componentWillUnmount() {
    clearInterval(this.state.countDownTimer)
  }

  nextQuestion = () => {
    this.setState({ qNumber: this.state.qNumber + 1 })
    const curQues = this.state.allQsn.filter((val, index) => index === this.state.qNumber)
  }

  prevQuestion = () => {
    this.setState({ qNumber: this.state.qNumber - 1 })
  }

  seletOption = (opsnindex, qsnID, opsn, ans) => {
    let { correctAns } = this.state;
    let myVar = correctAns.filter(val => val.qsnid !== qsnID)

    this.setState({ correctAns: [...myVar, { qsnid: qsnID, opsn, ans }] }, () => { this.props.getCorrectAnsCount(this.state.correctAns) })

  }

  quizTimer = () => {
    let { min, sec } = this.state.timer;
    sec--
    if (sec < 0) {
      min--;
      sec = 60;
    }
    if (min === 0 && sec === 0) {
      this.props.history.push('/result');
      clearInterval(this.state.countDownTimer)
    }
    this.setState({ timer: { min: min, sec: sec } })
  }

  render() {
    const { allQsn, qNumber } = this.state
    return (
      <div className="quiz-container">
        <div className="timer">
          <div className="question-count">
            <p>Out of: <span className="count">{qNumber + 1}</span>/<span>5</span></p>
          </div>
          <div className="countdown">
            <p>Time Left: <span className="quizCounter">0{this.state.timer.min}:{this.state.timer.sec}</span></p>
          </div>
        </div>
        <div className="q-ans">
          <p className="Quizquestion">{allQsn[qNumber].question}</p>
          <div className="ans-options">
            {
              allQsn[qNumber].options.map((val, index) => (
                <a href="#FIXME" title={val}
                  className={
                    this.state.correctAns.map(elem =>
                      elem.opsn === val ? " options correctOptions" : " options"
                    )
                  }
                  key={index} onClick={() => this.seletOption(index, allQsn[qNumber].qid, val, allQsn[qNumber].answer)}>{val}</a>
              ))
            }
          </div>
        </div>
        <div className="btn-group">
          {this.state.qNumber > 0 && <button className="next" onClick={() => this.prevQuestion()}>Prev</button>}
          {this.state.qNumber < this.state.allQsn.length - 1 && <button className="next" onClick={() => this.nextQuestion()}>Next</button>}
          {this.state.qNumber > this.state.allQsn.length - 2 && <Link className="link-btn" to="/result" onClick={() => { }}>Submit Quiz</Link>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    correctAnsCount: state.quizReducer.correctAnsCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCorrectAnsCount: (data) => dispatch(getCorrectAnsCount(data)),
    resetCorrectAnsCount: () => dispatch(resetCorrectAnsCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)