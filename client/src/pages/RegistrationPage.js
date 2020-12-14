import React, { useState } from 'react';
import {
    TextField,
    Button,
    CssBaseline,
    Typography,
    Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useHttp } from '../hooks/http.hook';
import {useEffect} from 'react';
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
const Registration = () => {
    const { loading, error, request, clearError } = useHttp();
    const [formData, setFormData] = useState();
    const message = useMessage();

    
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    const registrationHandle = async () => {
        try {
            const data = await request('/api/auth/registrations', 'POST', {...formData})
            message(data.message)
        } catch (e) { }
    }
    const onChangeHandle = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign Up
            </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        // onChange={onChangeHandle}
                    />
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
                        onChange={onChangeHandle}
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
                        onChange={onChangeHandle}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={ registrationHandle }
                    >
                        Sign Up
                </Button>
                </form>
            </div>
        </Container>
    );
}
export default Registration;