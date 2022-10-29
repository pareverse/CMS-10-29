import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, AvatarGroup, Badge, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Td, Text, Tr, useDisclosure } from '@chakra-ui/react'
import Card from 'components/_card'
import Table from 'components/_table'
import { useForm } from 'react-hook-form'
import { FiMoreHorizontal } from 'react-icons/fi'

const Schedule = () => {
	const queryClient = useQueryClient()
	const { data: schedule, isFetched: isScheduleFetched } = useQuery(['schedule'], () => api.all('/schedule'))
	const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
	const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure()
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const [selected, setSelected] = useState()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm()

	const addScheduleMutation = useMutation((data) => api.create('/schedule', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('schedule')
			onAddClose()
		}
	})

	const onSubmit = (data) => {
		addScheduleMutation.mutate(data)
	}

	return (
		<>
			<Container>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="xl" fontWeight="semibold" color="accent-1">
							Schedule
						</Text>

						<Button colorScheme="brand" onClick={onAddOpen}>
							Add New
						</Button>
					</Flex>

					<Card>
						<Table
							data={isScheduleFetched && schedule}
							th={['Date', 'Patients', 'Maximum', 'Status', '']}
							td={(schedule) => (
								<Tr key={schedule._id}>
									<Td>
										<Text>{months[Number(schedule.date.split('-')[1])] + ' ' + schedule.date.split('-')[2] + ', ' + schedule.date.split('-')[0]}</Text>
									</Td>

									<Td>
										<AvatarGroup>
											<Avatar name="Patient 1" />
											<Avatar name="Patient 2" />
											<Avatar name="Patient 3" />
										</AvatarGroup>
									</Td>

									<Td>{schedule.maximum}</Td>

									<Td>
										<Badge variant="tinted" colorScheme={schedule.status ? 'blue' : 'red'}>
											{schedule.status ? 'Open' : 'Closed'}
										</Badge>
									</Td>

									<Td textAlign="right">
										<IconButton size="xs" icon={<FiMoreHorizontal size={16} />} onClick={() => setSelected(schedule) || onViewOpen()} />
									</Td>
								</Tr>
							)}
							select={() => (
								<Flex flex={1} justify="end">
									<Select placeholder="Status" size="lg" w="auto">
										<option>Open</option>
										<option>Closed</option>
									</Select>
								</Flex>
							)}
						/>
					</Card>
				</Flex>
			</Container>

			<Modal preserveScrollBarGap isOpen={isAddOpen} onClose={onAddClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader textAlign="center">Create Schedule</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.date}>
									<FormLabel>Date</FormLabel>
									<Input type="date" size="lg" {...register('date', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl>
									<FormLabel>Maximum Patients</FormLabel>

									<Select size="lg" {...register('maximum')}>
										<option>10</option>
										<option>20</option>
										<option>30</option>
										<option>40</option>
										<option>50</option>
									</Select>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button type="submit" size="lg" colorScheme="brand">
								Submit
							</Button>

							<Button size="lg" onClick={onAddClose}>
								Cancel
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>

			{selected && (
				<Modal size="xl" preserveScrollBarGap isOpen={isViewOpen} onClose={onViewClose}>
					<ModalOverlay />

					<ModalContent>
						<ModalHeader textAlign="center">{months[Number(selected.date.split('-')[1])] + ' ' + selected.date.split('-')[2] + ', ' + selected.date.split('-')[0]}</ModalHeader>

						<ModalBody></ModalBody>

						<ModalFooter gap={3}>
							<Button variant="tinted" size="lg" colorScheme="red">
								Mark as Closed
							</Button>

							<Button size="lg" onClick={onViewClose}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	)
}

Schedule.authentication = {
	authorized: 'Admin'
}

export default Schedule
