import { Container, Flex, Input, Select, Text } from '@chakra-ui/react'
import Card from 'components/_card'
import Table from 'components/_table'

const Dashboard = () => {
	return (
		<Container>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Appointment
					</Text>
				</Flex>

				<Card>
					<Table
						data={[]}
						th={['Patient Name', 'Schedule', 'Status', '']}
						select={(register) => (
							<Flex flex={1} justify="end">
								<Select placeholder="Status" size="lg" w="auto">
									<option value="male">Male</option>
									<option value="female">Female</option>
								</Select>
							</Flex>
						)}
					/>
				</Card>
			</Flex>
		</Container>
	)
}

Dashboard.authentication = {
	authorized: 'Admin'
}

export default Dashboard
