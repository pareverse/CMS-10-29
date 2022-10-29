import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const Profile = ({ isOpen, onClose }) => {
	const { data: session } = useSession()
	const [editMode, setEditMode] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm()

	const updateUserMutation = useMutation((data) => api.update('/users', session.user.id, data), {
		onSuccess: () => {
			setIsLoading(false)
			setEditMode(false)
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)

		updateUserMutation.mutate({
			data: data
		})
	}

	return (
		<Modal preserveScrollBarGap closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />

			<ModalContent>
				<ModalBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flex direction="column" gap={6}>
							<Flex justify="center" align="center" direction="column" gap={6} p={6}>
								<Avatar name={session.user.name} src={session.user.image} size="xl" />

								<Flex align="center" direction="column" textAlign="center">
									<Text fontSize="xl" fontWeight="semibold" textAlign="center" color="accent-1">
										{session.user.name}
									</Text>

									<Text>{session.user.email}</Text>
								</Flex>
							</Flex>

							<Divider />

							<Flex justify="space-between" align="center" gap={6}>
								<Text fontSize="xl" fontWeight="semibold" color="accent-1">
									Details
								</Text>

								<Button onClick={() => (editMode ? setEditMode(false) : setEditMode(true))}>{!editMode ? 'Edit Profile' : 'Cancel'}</Button>
							</Flex>

							<FormControl>
								<FormLabel>Full Name</FormLabel>
								<Input size="lg" defaultValue={session.user.name} disabled={!editMode} {...register('name', { required: true })} />
							</FormControl>

							<FormControl>
								<FormLabel>Email</FormLabel>
								<Input size="lg" defaultValue={session.user.email} disabled />
							</FormControl>

							<FormControl>
								<FormLabel>Contact</FormLabel>
								<Input size="lg" defaultValue={session.user.contact} disabled={!editMode} {...register('contact', { required: true })} />
							</FormControl>

							<FormControl>
								<FormLabel>Address</FormLabel>
								<Textarea defaultValue={session.user.address} disabled={!editMode} {...register('address', { required: true })} />
							</FormControl>

							{editMode && (
								<Button type="submit" size="lg" colorScheme="brand" w="full" isLoading={isLoading}>
									Update Profile
								</Button>
							)}
						</Flex>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button size="lg" w="full" onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Profile
