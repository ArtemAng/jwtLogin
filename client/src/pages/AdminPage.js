// import Table from '../components/Table';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { useHttp } from '../hooks/http.hook';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
        field: 'status',
        headerName: 'Status',
        width: 230,
        renderCell: (param)=> param.value? 'Online' : 'Offline'
    },
    {
        field: 'isBlocked',
        headerName: 'Is blocked',
        width: 230,
        renderCell: (param) => param.value ? <LockIcon /> : <LockOpenIcon />
    },
    { field: 'regDate', headerName: 'Registration date', width: 230 },
    { field: 'lastLoginDate', headerName: 'Last login date', width: 230 },

];

const useStyles = makeStyles((theme) => ({
    logoutbtn: {
        width: 200,
        margin: 5,
        // marginLeft: '72%'
    },
    toolbtn: {
        width: 200,
        margin: 5,
        // marginLeft: '72%'
    }
}));

const AdminPage = ({ makeLogout, email, token, setUsersList, users, usersMails, setUsersMails }) => {
    const classes = useStyles();
    const { request } = useHttp();

    const mailsChangeHandler = useCallback(async (el) => {
        await setUsersMails(el.rowIds);
    }, [setUsersMails]);

    const switchOnline = useCallback(async () => {
        try {
            await makeLogout();
            await request('api/auth/logout', 'POST', { token }, { Authorization: `Bearer ${token}` });
        }
        catch (e) {
        }
    }, [request, makeLogout, email, makeLogout]);

    const getUsers = useCallback(async () => {
        try {
            const users = await request('/api/usersList', 'GET', null, { Authorization: `Bearer ${token}` });
            await setUsersList(users);
            return users;
        } catch (e) {
            await switchOnline();
        }
    }, [token, request, setUsersList, makeLogout]);


    const blockUserHandle = useCallback(async () => {
        try {
            await request('api/usersList/blockUser', 'POST', { usersMails }, { Authorization: `Bearer ${token}` });
            await setUsersList(await request('/api/usersList', 'GET', null, { Authorization: `Bearer ${token}` }));
        }
        catch (e) {
            await switchOnline();
        }
    }, [request, setUsersList, usersMails, token, makeLogout])

    const unlockUserHandle = useCallback(async () => {
        try {
            await request('api/usersList/unlockUser', 'POST', { usersMails }, { Authorization: `Bearer ${token}` });
            await setUsersList(await request('/api/usersList', 'GET', null, { Authorization: `Bearer ${token}` }));
        }
        catch (e) {
            await switchOnline();
        }
    }, [request, setUsersList, usersMails, token, switchOnline])

    const deleteUserHandle = useCallback(async () => {
        try {
            // console.log(res, 'result')
            await request('/api/usersList/deleteUser', 'POST', { usersMails }, { Authorization: `Bearer ${token}` })
            await setUsersList(await request('/api/usersList', 'GET', null, { Authorization: `Bearer ${token}` }));
        } catch (e) {
            await switchOnline();
        }
    }, [request, setUsersList, usersMails, token])

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('userData')));
        getUsers();
    }, [getUsers]);

    return (
        <>
            {/* <Table /> */}
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid rows={users.map((el, i) => ({ ...el, id: i + 1 }))}
                    columns={columns}
                    checkboxSelection
                    onSelectionChange={mailsChangeHandler}
                />
            </div>
            <Button
                className={classes.toolbtn}
                variant='contained'
                color='primary'
                onClick={blockUserHandle}
            >
                <LockIcon />
            </Button>
            <Button
                className={classes.toolbtn}
                variant='outlined'
                color='primary'
                onClick={unlockUserHandle}
            >
                <LockOpenIcon />
            </Button>
            <Button
                className={classes.toolbtn}
                variant='contained'
                color='secondary'
                onClick={deleteUserHandle}
            >
                <DeleteSweepIcon />
            </Button>
            <Button
                className={classes.logoutbtn}
                variant='contained'
                color='secondary'
                onClick={switchOnline}>
                Log out
            </Button>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.curentUser.token,
        curentUser: state.curentUser,
        email: state.curentUser.id,
        users: state.usersList,
        usersMails: state.tools
    }
}

const mapDispatchToProps = (dispatch) => {
    const { makeLogout, setUsersList, setUsersMails } = bindActionCreators(actions, dispatch)
    return {
        makeLogout,
        setUsersList,
        setUsersMails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);