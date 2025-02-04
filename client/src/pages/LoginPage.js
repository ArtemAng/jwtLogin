import {
    TextField,
    Button,
    CssBaseline,
    Typography,
    Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHttp } from '../hooks/http.hook';
import { useState, useEffect, useCallback } from 'react';
import { useMessage } from '../hooks/message.hook';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: 1,
    },
    submit: {
        marginTop: 5,
        height: 50
    },
}));

const Login = ({curentUser, makeLogin}) => {
    const classes = useStyles();
    const { error, request, clearError } = useHttp();
    const [formData, setFormData] = useState({});
    const message = useMessage();
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    const onChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    
    const LoginHandle = useCallback(async () => {
        try {
            await console.log({...formData})
            const data = await request('api/auth/login', 'POST', { ...formData })
            await makeLogin({...data});
            curentUser.login(data.token, data.id)
        } catch (e) {

        }
    }, [makeLogin, request, formData])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={LoginHandle}
                    >
                        Log in
                    </Button>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state)=>{
    return {
        curentUser: state.curentUser
    }
}
const mapDispatchToProps = (dispatch)=>{
    const {makeLogin} = bindActionCreators(actions, dispatch)
    return {
        makeLogin: makeLogin
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);