import { useSession, signIn } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Button, chakra, Container, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from '@chakra-ui/react'

const Hero = () => {
	const { data: session } = useSession()
	const { data: schedule, isFetched: isScheduleFetched } = useQuery(['schedule'], () => api.all('/schedule'))
	const { isOpen, onOpen, onClose } = useDisclosure()
	console.log(schedule)

	return (
		<>
			<chakra.section>
				<Container>
					<Flex gap={12} h={624}>
						<Flex flex={1} justify="start" align="center">
							<Flex align="start" direction="column" gap={6}>
								<Text fontSize={80} fontWeight="bold" lineHeight={1} letterSpacing={0} color="accent-1">
									A better life starts with a <chakra.span color="brand.default">beautiful smile</chakra.span>
								</Text>

								<Text fontSize="lg">Everything in the world has beauty, but not everyone sees it. Every time you smile at someone, it is an act of love.</Text>

								<Button size="xl" colorScheme="brand" onClick={() => (session ? onOpen() : signIn('google'))}>
									Book Now
								</Button>
							</Flex>
						</Flex>

						<Flex flex={1} justify="end" align="center">
							<chakra.div bgImage="url('/assets/hero.png')" bgRepeat="no-repeat" bgSize="contain" h="full" w="full">
								<chakra.svg width="149" height="624" viewBox="0 0 149 624" fill="none" xmlns="http://www.w3.org/2000/svg">
									<chakra.path d="M149 0L0 624V0H149Z" fill="system" />
								</chakra.svg>
							</chakra.div>
						</Flex>
					</Flex>
				</Container>
			</chakra.section>

			{session && (
				<Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />

					<ModalContent>
						<ModalHeader>Book Appointment</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl>
									<FormLabel>Full Name</FormLabel>
									<Input size="lg" defaultValue={session.user.name} readOnly />
								</FormControl>

								<FormControl>
									<FormLabel>Email Address</FormLabel>
									<Input size="lg" defaultValue={session.user.email} readOnly />
								</FormControl>

								<FormControl>
									<FormLabel>Contact</FormLabel>
									<Input size="lg" defaultValue={session.user.contact} readOnly={session.user.contact} />
								</FormControl>

								<FormControl>
									<FormLabel>Address</FormLabel>
									<Input size="lg" defaultValue={session.user.address} readOnly={session.user.address} />
								</FormControl>

								<FormControl>
									<FormLabel>Services</FormLabel>

									<Select placeholder="Select Schedule" size="lg">
										<option>Consultion</option>
									</Select>
								</FormControl>

								<FormControl>
									<FormLabel>Available Schedule</FormLabel>

									<Select placeholder="Select Schedule" size="lg">
										{isScheduleFetched && schedule.map((schedule) => <option key={schedule._id}>{schedule.date}</option>)}
									</Select>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button size="lg" colorScheme="brand">
								Submit
							</Button>

							<Button size="lg" onClick={onClose}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	)
}

export default Hero
