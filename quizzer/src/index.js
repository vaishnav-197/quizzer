import React , {Component } from "react" ;
import ReactDom from 'react-dom';
import "./assets/style.css";
import quizservice from "./quizService";
import QuestionBox from './components/QuestionBox';


class QuizBee extends Component{
    state = {
        questionBank : [],
        score: 0,
        responses: 0

    };

    getQuestions = () => {
        quizservice().then(question => {
            this.setState({
                questionBank : question
            });
        });
    };

    computeAnswer = (answer , correctAnswer) => {
        if(answer === correctAnswer){
            this.setState({
                score: this.state.score+1
            });

        }

        this.setState({
            responses: this.state.responses< 5 ? this.state.responses +1 : 5
        })
    }

    componentDidMount(){
        this.getQuestions();
    };
    render() {
        return(
            <div className="container">
                <div className="title"> <h1> QuizBee </h1></div>
                {this.state.questionBank.length > 0 &&
                 this.state.responses <5 &&
                 this.state.questionBank.map(({question , answers , correct ,questionId}) => (
                    <QuestionBox 
                      question={question} 
                      options = {answers} 
                      key={questionId} 
                      selected= {answer => this.computeAnswer(answer , correct)}
                    />
                    )
                  )}

                  {this.state.responses === 5 ? ( <h2> {this.state.score}</h2> ) : null }
            </div>
        )
    }
}

ReactDom.render(<QuizBee /> , document.getElementById("root"));