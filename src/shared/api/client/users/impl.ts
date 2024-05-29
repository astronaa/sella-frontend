import { authFetchClient } from "../fetch-client";

export function createUsersClient() {
	return {
		async getProfile() {
			return authFetchClient.GET('/api/users/profile');
		},
		async setAvatar(file: File) {
			const formData = new FormData()
			formData.append('name', file.name)
			formData.append('type', file.type)
			formData.append('size', String(file.size))
			formData.append('file', file)

			return authFetchClient.PATCH('/api/users/profile-picture', {
				headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
				body: { file: '' }, //TODO put form data
			})
		}
	}
}
