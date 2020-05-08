import React , {Component } from "react" ;
import ReactDom from 'react-dom';
import "./assets/style.css";
import quizservice from "./quizService"


class QuizBee extends Component{
    state = {
        questionBank : []
    };

    getQuestions = () => {
        quizservice().then(question => {
            this.setState({
                questionBank : question
            });
        });
    };

    componentDidMount(){
        this.getQuestions();
    };
    render() {
        return(
            <div className="container">
                <div className="title">QuizBee</div>
                {this.state.questionBank.length > 0 && this.state.questionBank.map(({question , answers , correct ,questionId}) => (<h4>{question}</h4>))}
            </div>
        )
    }
}

ReactDom.render(<QuizBee /> , document.getElementById("root"));