import { Button, Center, Group, Modal, Pagination, Paper, Stack, Text } from '@mantine/core'
import { Rating } from '@mui/material'
import { chunk } from 'lodash/array'
import _ from 'lodash/fp'
import React, { useEffect, useState } from 'react'
import { MdBusiness, MdDateRange, MdPerson } from 'react-icons/md'
import range from '../../services/lib/range'

const Results = ({ data }) => {
  const [selected, setSelected] = useState({
    averageRating: 0,
    companyName: '',
    faction: '',
    registrationdate: ''

  })
  const [isOpen, setOpen] = useState(false)
  const [activePage, setPage] = useState(1)
  const [toMap, setMap] = useState(false)
  useEffect(() => {
    if (_.isArray(data)) {
      setMap(true)
    }

  }, [data])

  const res = chunk(data, 10)
  if (data?.message) {
    return (
      <p>Vi hittade ingen mäklare med namnet du angav..</p>
    )
  }
  const ShowModal = (item) => {
    setOpen(true)
    setSelected(item)
  }

  return toMap ? (
    <>
      {res[activePage - 1].map((item) =>
        <Paper shadow="sm" radius="xs" p="sm" key={item.id} my={5}
               sx={(theme) => ({
                 backgroundColor: theme.colors.dark[1],
                 color: theme.colors.gray[9],
                 '&:hover': {
                   cursor: 'pointer',
                   backgroundColor: theme.colors.blue[9],
                 },
               })} onClick={() => ShowModal(item)}>
          <Group position="apart">
            <Text
              weight={600}
            >{item.firstname} {item.lastname}</Text>
            {/*<Text transform="capitalize" color="dimmed">{item.companyName || item.faction}</Text>*/}
            {/*<Badge>{item.agenttype}</Badge>*/}
            <Rating value={range(item.averageRating)} readOnly precision={0.5}/>
          </Group>
        </Paper>
      )}

      <Center my={2}>
        <Pagination total={res.length} color="blue" size="sm" page={activePage} onChange={setPage}/>
      </Center>

      <Modal opened={isOpen} centered onClose={() => setOpen(false)} size={'lg'} p={'lg'}>
        <Stack style={{ marginTop: 10 }}>
          <Group>
            <MdPerson size={32} color={'#11203a'} title={'Mäklarens Namn'}/>
            <Text
              weight={600}
            >
              {selected?.firstname} {selected?.lastname}</Text>

          </Group>
          <Group>
            <MdBusiness size={32} color={'#61203a'} title={'Företags Namn'}/>
            <Text transform="capitalize"
                  color="dimmed">{selected?.companyName || selected?.faction}</Text>
          </Group>
          <Group>
            <MdDateRange size={32} color={'#59203a'} title={'Registerings Datum'}/>
            <Text align={'right'}> {selected?.registrationdate}</Text>
          </Group>
          <Button onClick={() => console.log('he')}>Whack a mole</Button>
        </Stack>
      </Modal>
    </>
  ) : <div/>

}
export default Results