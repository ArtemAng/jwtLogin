import Table from '../components/Table';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    logoutbtn:{
        width: 200,
        margin: 5,
        marginLeft: '72%'
    }
    
  }));
  
const CreatePage = (props) => {
    const classes = useStyles();
    return (
        <>
            <Table />
            <Button className={classes.logoutbtn} variant='contained' color='primary'>Log out</Button>
        </>
    );
}
export default CreatePage;