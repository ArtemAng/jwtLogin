import Table from '../components/Table';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const useStyles = makeStyles((theme) => ({
    logoutbtn: {
        width: 200,
        margin: 5,
        marginLeft: '72%'
    }

}));

const AdminPage = ({ makeLogout, setAutentificated }) => {
    const classes = useStyles();
    return (
        <>
            <Table />
            <Button
                className={classes.logoutbtn}
                variant='contained'
                color='primary'
                onClick={makeLogout}>Log out</Button>
        </>
    );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    const { makeLogout } = bindActionCreators(actions, dispatch)
    return {
        makeLogout:  makeLogout
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);