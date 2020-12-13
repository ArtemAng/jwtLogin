import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import LockIcon from '@material-ui/icons/Lock';
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'regDate',
        label: 'Regestration date',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'tools',
        label: 'Tools',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(name, email, status, regDate) {
    return { name, email, status, regDate };
}

const rows = [
    createData('India', 'test@mail.ru', 'online', 3287263),
    createData('China', 'test@mail.ru', 'online', 9596961),
    createData('Italy', 'test@mail.ru', 'online', 301340),
    createData('United States', 'test@mail.ru', 'online', 9833520),
    createData('Canada', 'test@mail.ru', 'online', 9984670),
    createData('Australia', 'test@mail.ru', 'online', 7692024),
    createData('Germany', 'test@mail.ru', 'online', 357578),
    createData('Ireland', 'test@mail.ru', 'online', 70273),
    createData('Mexico', 'test@mail.ru', 'online', 1972550),
    createData('Japan', 'test@mail.ru', 'online', 377973),
    createData('France', 'test@mail.ru', 'online', 640679),
    createData('United Kingdom', 'test@mail.ru', 'online', 242495),
    createData('Russia', 'test@mail.ru', 'online', 17098246),
    createData('Nigeria', 'test@mail.ru', 'online', 923768),
    createData('Brazil', 'test@mail.ru', 'online', 8515767),
];

const useStyles = makeStyles({
    root: {
        width: '70%',
        margin: 'auto',
        marginTop: 10
    },
    container: {
        // maxHeight: 500,
        maxHeight: 623
    },
    tCell: {
        border: '1px solid black'
    },
    btns:{
      marginRight:3  
    }
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            column.id==='tools'?
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant='contained' color='primary' className={classes.btns}><LockIcon/></Button>
                                                <Button variant='contained' color='secondary'><DeleteSweepIcon/></Button>
                                            </TableCell>:
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                // className={classes.pagination}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}