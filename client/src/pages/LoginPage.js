import {
    TextField,
    Button,
    CssBaseline,
    Typography,
    Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHttp } from '../hooks/http.hook';
import { useState, useEffect } from 'react';
import { useMessage } from '../hooks/message.hook';

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

const Login = () => {
    const classes = useStyles();
    const { loading, error, request, clearError } = useHttp();
    const [formData, setFormData] = useState({});
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const onChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const LoginHandle = async () => {
        try {
            const data = await request('api/auth/login', 'POST', { ...formData })
            console.log(data)
        } catch (e) {

        }
    }

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
export default Login;