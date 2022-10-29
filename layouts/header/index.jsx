import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, chakra, Flex, IconButton, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FiFileText, FiLogOut, FiMoon, FiSun } from 'react-icons/fi'
import Profile from 'components/profile'

const Header = ({ onSidebarOpen }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { toggleColorMode } = useColorMode()
	const colorModeIcon = useColorModeValue(<FiMoon size={20} fill="currentColor" />, <FiSun size={20} fill="currentColor" />)
	const [isScrolling, setIsScrolling] = useState(false)
	const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				setIsScrolling(window.pageYOffset > 0)
			})
		}
	}, [])

	return (
		<>
			<chakra.header bg="white" position="sticky" top={0} shadow={isScrolling && 'sm'} transition=".4s" zIndex={99} _dark={{ bg: isScrolling ? 'surface' : 'system', border: 'none', shadow: isScrolling && 'dark-xl' }}>
				<Flex align="center" gap={6} mx="auto" px={6} h="72px" w="full" maxW={1280}>
					<Flex flex={1} justify="start" align="center" outline="1px solid transparent">
						<Text fontWeight="semibold" color="accent-1">
							LOGO HERE
						</Text>
					</Flex>

					<Flex flex={3} justify="center" align="center" outline="1px solid transparent">
						<Flex align="center" gap={8}>
							{session && session.user.role === 'Admin' ? (
								<>
									<NextLink href="/appointment" passHref>
										<Link active={router.pathname.includes('appointment') ? 1 : 0}>Appointment</Link>
									</NextLink>

									<NextLink href="/schedule" passHref>
										<Link active={router.pathname.includes('schedule') ? 1 : 0}>Schedule</Link>
									</NextLink>

									<NextLink href="/patients" passHref>
										<Link active={router.pathname.includes('patients') ? 1 : 0}>Patients</Link>
									</NextLink>

									<NextLink href="/blogs" passHref>
										<Link active={router.pathname.includes('blogs') ? 1 : 0}>Blogs</Link>
									</NextLink>
								</>
							) : (
								<>
									<NextLink href="/" passHref>
										<Link>Home</Link>
									</NextLink>

									<NextLink href="/services" passHref>
										<Link>Services</Link>
									</NextLink>

									<Link>Blogs</Link>
									<Link>About Us</Link>

									<Link href="#contact">Call Us</Link>
								</>
							)}
						</Flex>
					</Flex>

					<Flex flex={1} justify="end" align="center" outline="1px solid transparent">
						<Flex align="center" gap={3}>
							<IconButton variant="ghost" icon={colorModeIcon} onClick={toggleColorMode} />

							{session ? (
								<Menu>
									<MenuButton>
										<Avatar name={session.user.role} src={session.user.image} />
									</MenuButton>

									<MenuList w={256}>
										<MenuItem onClick={onProfileOpen}>
											<Flex align="center" gap={3}>
												<Avatar name={session.user.role} src={session.user.image} />

												<Text>My Profile</Text>
											</Flex>
										</MenuItem>

										<MenuDivider />

										<MenuItem icon={<FiFileText size={16} />}>History</MenuItem>

										<MenuItem icon={<FiLogOut size={16} />} onClick={() => signOut()}>
											Log out
										</MenuItem>
									</MenuList>
								</Menu>
							) : (
								<Button colorScheme="brand" onClick={() => signIn('google')}>
									Sign in
								</Button>
							)}
						</Flex>
					</Flex>
				</Flex>
			</chakra.header>

			{session && <Profile isOpen={isProfileOpen} onClose={onProfileClose} />}
		</>
	)
}

export default Header
