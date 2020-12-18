import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'status', headerName: 'Status', width: 230 },
    {
        field: 'isBlocked',
        headerName: 'Is blocked',
        width: 230, 
        renderCell: (param) => param.value ? <LockIcon /> : <LockOpenIcon />
    },
    { field: 'regDate', headerName: 'Registration date', width: 230 },
    { field: 'lastLogin', headerName: 'Last login date', width: 230 },

];


function DataTable({ users, deleteUser, blockUser, token }) {
    // const us = users.map((el, i) => ({ ...el, idx: i + 1 }))
    console.log(users.map((el, i) => ({ ...el, id: i + 1 })))
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={users.map((el, i) => ({ ...el, id: i + 1 }))}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onSelectionChange={(el) => { console.log(el) }} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.usersList,
        token: state.curentUser.token
    }
}

const mapDispatchToProps = (dispatch) => {
    const { deleteUser, blockUser } = bindActionCreators(actions, dispatch)
    return {
        deleteUser,
        blockUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);