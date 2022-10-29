import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Container, Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react'
import Card from 'components/_card'
import Table from 'components/_table'
import { FiMoreHorizontal } from 'react-icons/fi'

const Patients = () => {
	const { data: patients, isFetched: isPatientFetched } = useQuery(['patients'], () => api.all('/users'))

	return (
		<Container>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Patients
					</Text>
				</Flex>

				<Card>
					<Table
						data={isPatientFetched && patients}
						th={['Full Name', 'Email', 'Contact', 'Address', '']}
						td={(patient) => (
							<Tr key={patient._id}>
								<Td>
									<Flex align="center" gap={3}>
										<Avatar name={patient.name} src={patient.image} />
										<Text color="accent-1">{patient.name}</Text>
									</Flex>
								</Td>

								<Td>
									<Text>{patient.email}</Text>
								</Td>

								<Td>
									<Text>{patient.contact}</Text>
								</Td>

								<Td>
									<Text>{patient.address}</Text>
								</Td>

								<Td textAlign="right">
									<IconButton size="xs" icon={<FiMoreHorizontal size={16} />} />
								</Td>
							</Tr>
						)}
						filters={(data, watch) => {
							return data
								.filter((data) =>
									['name', 'email'].some((key) =>
										data[key]
											.toString()
											.toLowerCase()
											.includes(watch('search') && watch('search').toLowerCase())
									)
								)
								.filter((data) => data.role === 'User')
						}}
					/>
				</Card>
			</Flex>
		</Container>
	)
}

Patients.authentication = {
	authorized: 'Admin'
}

export default Patients
