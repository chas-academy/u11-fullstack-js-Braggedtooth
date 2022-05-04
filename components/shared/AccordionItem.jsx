import { Accordion, Text, Anchor } from '@mantine/core'
import dynamic from 'next/dynamic'

const AccordionLabel = dynamic(() => import('./AccordionLabel'))

const AccordionItem = ({ array }) => {
  return (
    <div>
      {array.map((item) => {
        return (
          <Accordion.Item label={<AccordionLabel {...item} />} key={item.id}>
            <Text size="sm" lineClamp={2}>
              {item.content}
            </Text>
            <Anchor href={`/recensioner/${item.id}`}>Läs mer..</Anchor>
          </Accordion.Item>
        )
      })}
    </div>
  )
}

export default AccordionItem
