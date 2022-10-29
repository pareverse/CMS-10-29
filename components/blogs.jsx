import { chakra, Container, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import Card from './_card'

const Blogs = () => {
	return (
		<chakra.section pt={100}>
			<Container>
				<Flex direction="column" gap={12}>
					<Flex align="center" direction="column" textAlign="center">
						<Text fontSize={32} fontWeight="semibold" color="accent-1">
							Latest from Our Blog
						</Text>

						<Text>We&apos;d Love For You To Dive Into Some Of Our Carefully Written Pieces.</Text>
					</Flex>

					<SimpleGrid columns={3} gap={6}>
						{[...Array(3)].map((data, index) => (
							<Card p={0} key={index}>
								<Image alt="blog" src="/assets/blog.jpg" />

								<Flex direction="column" gap={3} p={6}>
									<Text fontSize="xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
										Blog Title
									</Text>

									<Text noOfLines={3}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat provident deserunt eligendi omnis dolorum minima optio ratione, nulla, voluptatem quia impedit doloribus autem at quaerat! Nisi nulla cupiditate praesentium inventore!</Text>

									<Text fontSize="sm" fontWeight="medium" color="accent-1">
										10/30/2022
									</Text>
								</Flex>
							</Card>
						))}
					</SimpleGrid>
				</Flex>
			</Container>
		</chakra.section>
	)
}

export default Blogs
