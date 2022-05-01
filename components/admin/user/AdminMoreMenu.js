import { useRef, useState } from 'react'

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { FaBan, FaExchangeAlt } from 'react-icons/fa'
import { useNotifications } from '@mantine/notifications'
import { MdMoreHoriz, MdDelete, MdCheck } from 'react-icons/md'
import useUSers from '../../../services/hooks/useUsers'

export default function AdminMoreMenu({ selected }) {
  const notification = useNotifications()
  const { deleteUserbyId, banUserbyId, changeUserRole, activateUserById } =
    useUSers()
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const banUser = () => {
    banUserbyId
      .mutateAsync(selected)
      .then(
        notification.showNotification({
          title: 'User has been banned'
        })
      )
      .finally(setIsOpen(false))
  }
  const deleteUser = () => {
    deleteUserbyId
      .mutateAsync(selected)
      .then(
        notification.showNotification({
          title: 'User has been deleted'
        })
      )
      .finally(setIsOpen(false))
  }
  const changeRole = () => {
    changeUserRole
      .mutateAsync(selected)
      .then(
        notification.showNotification({
          title: 'User role has been changed'
        })
      )
      .finally(setIsOpen(false))
  }
  const activateUser = () => {
    activateUserById
      .mutateAsync(selected)
      .then(
        notification.showNotification({
          title: 'User account has been activated'
        })
      )
      .finally(setIsOpen(false))
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MdMoreHoriz />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component="a"
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={activateUser}
        >
          <ListItemIcon>
            <MdCheck />
          </ListItemIcon>
          <ListItemText
            primary="Activate"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem
          component="a"
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={changeRole}
        >
          <ListItemIcon>
            <FaExchangeAlt />
          </ListItemIcon>
          <ListItemText
            primary="Change Role"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem
          component="a"
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={banUser}
        >
          <ListItemIcon>
            <FaBan />
          </ListItemIcon>
          <ListItemText
            primary="Ban"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={deleteUser}>
          <ListItemIcon>
            <MdDelete />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  )
}
