import { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material'
import { Badge, Modal } from '@mantine/core'
import { BiUserPlus } from 'react-icons/bi'
import SearchNotFound from './SearchNotFound'
import { UserListHead, AdminToolbar, AdminMoreMenu } from '../admin/user'
import useUSers from '../../services/hooks/useUsers'
import RegisterForm from '../forms/Register'
import applyFilter from '../../services/lib/filter'

const TABLE_HEAD = [
  { id: 'lastname', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false }
]

export default function User() {
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('lastname')

  const [filterName, setFilterName] = useState('')
  const [USERLIST, setusers] = useState([])
  const { users, isLoading } = useUSers()
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    if (users) {
      setusers(users)
    }
  }, [users])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0

  const filteredUsers = applyFilter(USERLIST, order, orderBy, filterName)

  const isUserNotFound = filteredUsers?.length === 0
  const [userModal, setUserModal] = useState(false)

  return (
    !isLoading && (
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Button
            variant="contained"
            component="a"
            to="#"
            startIcon={<BiUserPlus />}
            onClick={() => setUserModal(true)}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <AdminToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      firstname,
                      lastname,
                      role,
                      status,
                      email,
                      isVerified
                    } = row
                    const isItemSelected = selected.indexOf(id) !== -1

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, id)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt="Avatar" />
                            <Typography variant="subtitle2" noWrap>
                              {`${firstname} ${lastname}`}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">
                          {isVerified ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align="left">
                          {status === 'ACTIVE' && (
                            <Badge variant="filled" color="green">
                              {status}
                            </Badge>
                          )}{' '}
                          {status === 'PENDING' && (
                            <Badge variant="filled" color="yellow">
                              {status}
                            </Badge>
                          )}
                          {status === 'DELETED' && (
                            <Badge variant="filled" color="red">
                              {status}
                            </Badge>
                          )}{' '}
                          {status === 'BANNED' && (
                            <Badge variant="filled" color="red">
                              {status}
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <AdminMoreMenu selected={id} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Modal opened={userModal} onClose={() => setUserModal(false)}>
          <RegisterForm type="admin" toggle={() => setUserModal(false)} />
        </Modal>
      </Container>
    )
  )
}
