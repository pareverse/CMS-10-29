import { chakra, Container, Flex, FormControl, FormLabel, Icon, Input, SimpleGrid, Text, Textarea } from '@chakra-ui/react'
import { FiMail, FiMap, FiPhoneCall } from 'react-icons/fi'
import Card from './_card'

const Contact = () => {
	return (
		<chakra.section id="contact" py={100}>
			<Container>
				<Flex gap={12}>
					<Flex direction="column" gap={6}>
						<Flex direction="column">
							<Text fontSize={32} fontWeight="semibold" color="accent-1">
								Contact Us
							</Text>

							<Text>Our friendly team would love to hear from you!</Text>
						</Flex>

						<FormControl>
							<FormLabel>Full Name</FormLabel>
							<Input size="lg" />
						</FormControl>

						<FormControl>
							<FormLabel>Email Address</FormLabel>
							<Input size="lg" />
						</FormControl>

						<FormControl>
							<FormLabel>Phone Number</FormLabel>
							<Input size="lg" />
						</FormControl>

						<FormControl>
							<FormLabel>Message</FormLabel>
							<Textarea minH={148}></Textarea>
						</FormControl>
					</Flex>

					<Flex flex={1}>
						<chakra.div bgImage="url('/assets/map.png')" bgSize="cover" bgPos="center" borderRadius={12} h="full" w="full" />
					</Flex>
				</Flex>

				<SimpleGrid columns={3} gap={6} mt={12}>
					<Card>
						<Flex direction="column" gap={6}>
							<Flex bg="brand.alpha" justify="center" align="center" borderRadius={12} h={12} w={12}>
								<Icon as={FiMail} boxSize={6} color="brand.default" />
							</Flex>

							<Flex direction="column">
								<Text fontWeight="semibold" color="accent-1">
									Mail Us
								</Text>

								<Text fontSize="sm">Speak to our friendly team.</Text>
							</Flex>

							<Text fontWeight="semibold" color="accent-1">
								jpdentalclinic@gmail.com
							</Text>
						</Flex>
					</Card>

					<Card>
						<Flex direction="column" gap={6}>
							<Flex bg="brand.alpha" justify="center" align="center" borderRadius={12} h={12} w={12}>
								<Icon as={FiMap} boxSize={6} color="brand.default" />
							</Flex>

							<Flex direction="column">
								<Text fontWeight="semibold" color="accent-1">
									Visit Us
								</Text>

								<Text fontSize="sm">Visit our clinic.</Text>
							</Flex>

							<Text fontWeight="semibold" color="accent-1">
								Pamplona, Las Pinas City
							</Text>
						</Flex>
					</Card>

					<Card>
						<Flex direction="column" gap={6}>
							<Flex bg="brand.alpha" justify="center" align="center" borderRadius={12} h={12} w={12}>
								<Icon as={FiPhoneCall} boxSize={6} color="brand.default" />
							</Flex>

							<Flex direction="column">
								<Text fontWeight="semibold" color="accent-1">
									Call Us
								</Text>

								<Text fontSize="sm">Mon-Fri from 8am to 8pm.</Text>
							</Flex>

							<Text fontWeight="semibold" color="accent-1">
								+(63) 9123456789
							</Text>
						</Flex>
					</Card>
				</SimpleGrid>
			</Container>
		</chakra.section>
	)
}

export default Contact
