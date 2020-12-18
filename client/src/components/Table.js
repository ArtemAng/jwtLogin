// import React, { useCallback } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import { Button } from '@material-ui/core';
// import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
// import LockIcon from '@material-ui/icons/Lock';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actions from '../actions'
// import { useHttp } from '../hooks/http.hook';

// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170 },
//     { id: 'email', label: 'Email', minWidth: 100 },
//     {
//         id: 'status',
//         label: 'Status',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'regDate',
//         label: 'Regestration date',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'tools',
//         label: 'Tools',
//         minWidth: 170,
//         align: 'center',
//         format: (value) => value.toLocaleString('en-US'),
//     },
// ];

// const useStyles = makeStyles({
//     root: {
//         width: '100%',
//         margin: 'auto',
//         marginTop: 10
//     },
//     container: {
//         // maxHeight: 500,
//         maxHeight: 623
//     },
//     tCell: {
//         border: '1px solid black'
//     },
//     btns: {
//         marginRight: 3
//     }
// });

// function StickyHeadTable({ users, deleteUser, blockUser, token }) {
//     const classes = useStyles();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const { request } = useHttp();
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     const deleteUserHandle = useCallback(async (email) => {
//         const res = await request('/api/usersList/deleteUser', 'POST', { email }, { Authorization: `Bearer ${token}` });
//         await deleteUser(res);
//     }, [request])

//     const blockUserHandle = useCallback(async (email) => {
//         // const res = 
//         const users = await request('/api/usersList/blockUser', 'POST', { email }, { Authorization: `Bearer ${token}` })
//         users.map(i=>console.log(i.isBlocked));
//         console.log('-----------------------------');
//         blockUser(users);
//     }, [request])
//     return (
//         <Paper className={classes.root}>
//             <TableContainer className={classes.container}>
//                 <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align={column.align}
//                                     style={{ minWidth: column.minWidth }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                             return (
//                                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                                     {columns.map((column) => {
//                                         const value = row[column.id];
//                                         return (
//                                             column.id === 'tools' ?
//                                                 <TableCell key={column.id} align={column.align}>
//                                                     <Button
//                                                         variant='contained'
//                                                         color='primary'
//                                                         className={classes.btns}
//                                                         onClick={() => blockUserHandle(row.email)}
//                                                     >
//                                                         {row.isBlocked ? <LockOpenIcon /> : <LockIcon />}
//                                                     </Button>
//                                                     <Button
//                                                         variant='contained'
//                                                         color='secondary' onClick={() => deleteUserHandle(row.email)}
//                                                     >
//                                                         <DeleteSweepIcon />
//                                                     </Button>
//                                                 </TableCell> :
//                                                 <TableCell key={column.id} align={column.align}>
//                                                     {column.format && typeof value === 'number' ? column.format(value) :
//                                                         typeof value == 'boolean' ? value ? 'Online' : 'Offline' :
//                                                             value + ''}
//                                                 </TableCell>
//                                         );
//                                     })}
//                                 </TableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 // className={classes.pagination}
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={users.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onChangePage={handleChangePage}
//                 onChangeRowsPerPage={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// }
// const mapStateToProps = (state) => {
//     return {
//         users: state.usersList,
//         token: state.curentUser.token
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     const { deleteUser, blockUser } = bindActionCreators(actions, dispatch)
//     return {
//         deleteUser,
//         blockUser
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StickyHeadTable);