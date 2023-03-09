import { Container } from '@mantine/core'
import { DashboardLayout } from '../DashboardLayout'

export default function DeleteForeverPage() {
  return (
    <DashboardLayout pageName="Do Not Delete">
      <Container>
        Please do not delete any images yet. We are just starting.
      </Container>
    </DashboardLayout>
  )
}
