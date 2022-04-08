import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'
import { BiChevronRight } from 'react-icons/all'

const UserButton = ({ name, email, icon, ...others }) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar radius="xl"/>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <BiChevronRight size={16}/>}
      </Group>
    </UnstyledButton>
  )
}
export default UserButton

