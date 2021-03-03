import '../App.css';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from './Button';
import { useHistory } from 'react-router-dom';

function StartGame() {
  const history = useHistory();

  const startGame = () => {
    history.push('/game');
  };

  return (
    <div className="App">
      <Grid
        container
        spacing={4}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Box m={2} pt={10}>
            <Card m={3}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="h3">
                  Are you ready to play?
                </Typography>
                <Button
                  m={1}
                  variant="contained"
                  color="primary"
                  onClick={startGame}
                >
                  Start game!
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default StartGame;
