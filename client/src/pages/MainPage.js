import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  btn:{
    margin: 3,
    height: 50,
    width: 300,
  },
  container : {
    minHeight: '100vh',
    padding: '0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  
}));


 const MainPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
        
      <Link to="/login">
        <Button className={classes.btn} color='primary' variant='contained'>Login</Button>
      </Link>
      <Link to="/registration">
        <Button className={classes.btn} color='primary' variant='contained'>Sign up</Button>
      </Link>

    </div>
  )
}
export default MainPage;