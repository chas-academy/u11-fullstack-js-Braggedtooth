import { Button, Center, Dialog, Group, Modal, Pagination, Paper, Stack, Text } from '@mantine/core'
import { Rating } from '@mui/material'
import { chunk } from 'lodash/array'
import _ from 'lodash/fp'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
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
  const [alert, openAlert] = useState(false)
  useEffect(() => {
    if (_.isArray(data)) {
      setMap(true)
    }

  }, [data])
  const router = useRouter()
  const closePopUp = (selected) => {
    setOpen(false)
    openAlert(true)
    router.push(
      { pathname: '/maklare', query: { id:selected } }
    )
  }
  const res = chunk(data, 10)
  if (data?.message) {
    return (
      <p>Vi hittade ingen mäklare med namnet du angav..</p>
    )
  }
  const ShowModal = (item) => {
    setOpen(true)
    console.log(item);
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
          <Button onClick={() => closePopUp(selected.id)}>Skriv Recension</Button>
        </Stack>
      </Modal>
      <Dialog color="red" withCloseButton opened={alert} onClose={() => openAlert(false)} size="lg"
              radius="md"
              transition="slide-up" transitionDuration={300} transitionTimingFunction="ease"
              position={{ bottom: 20, right: 20 }}
      >
        <FiAlertCircle size={16}/>
        <Text>
          Denna funtionen är inte tillgänglig ännu. Vi håller ständigt på att
          förbätrra denna tjänsten, registera dig så
          får en notis när vi lanserar </Text>
      </Dialog>
    </>
  ) : <div/>

}
export default Results