import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { nanoid } from 'nanoid';
import { useLoadingCallback } from 'react-loading-hook';
import Button from './Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { shuffle } from 'lodash';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
});

const Question = () => {
  const history = useHistory();
  const classes = useStyles();
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionToShow, setQuestionToShow] = useState({});
  const [allAnswers, setAllAnswers] = useState([]);
  const [points, setPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const startGame = () => {
    history.push('/');
  };

  const [fetchQuestions, isLoading, error] = useLoadingCallback(async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const questions = await response.json();

    setAllQuestions(questions.results);
    setQuestionToShow(questions.results[questionIndex]);

    let allTheAnswers = [];

    allTheAnswers.push({
      text: unescape(questions.results[questionIndex].correct_answer),
      correct: true,
    });

    questions.results[questionIndex].incorrect_answers.map((incAnswer) =>
      allTheAnswers.push({ text: incAnswer, correct: false }),
    );

    setQuestionIndex(questionIndex + 1);

    setAllAnswers(allTheAnswers);
  });

  const checkAnswer = (answer) => {
    if (questionIndex === allQuestions.length) {
      setShowPoints(true);
      return;
    }

    if (answer.correct) {
      setPoints(points + 1);
    } else {
      setPoints(points - 1);
    }

    setQuestionToShow(allQuestions[questionIndex]);
    let allTheAnswers = [];
    allTheAnswers.push({
      text: allQuestions[questionIndex].correct_answer,
      correct: true,
    });

    allQuestions[questionIndex].incorrect_answers.map((incAnswer) =>
      allTheAnswers.push({ text: incAnswer, correct: false }),
    );
    setQuestionIndex(questionIndex + 1);
    setAllAnswers(shuffle(allTheAnswers));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (isLoading) {
    return <span>Is loading...</span>;
  }
  if (error) {
    return <span>{error}</span>;
  }

  const removeSpecialChar = (str) => {
    if (str !== undefined) {
      return str.replace(
        /([!@#$^&%*()+=[\]/{}|:<>,;\\-]+)|(quot;+)|(\d+;)/g,
        '',
      );
    }
  };

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={6}>
        <Box m={2} pt={10}>
          <Card className={classes.root} m={3}>
            <CardContent>
              {showPoints ? (
                <Typography>
                  You scored {points} out of {allQuestions.length}
                </Typography>
              ) : (
                <Typography gutterBottom variant="h5" component="h2">
                  {removeSpecialChar(questionToShow.question)}
                </Typography>
              )}
              {!showPoints ? (
                allAnswers.map((option) => (
                  <Button
                    m={1}
                    variant="contained"
                    color="primary"
                    key={nanoid()}
                    onClick={() => checkAnswer(option)}
                  >
                    {option.text}
                  </Button>
                ))
              ) : (
                <Button
                  m={1}
                  variant="contained"
                  color="secondary"
                  onClick={startGame}
                >
                  Play again
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Question;
