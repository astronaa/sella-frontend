import { authFetchClient } from "../fetch-client";

export function createUsersClient() {
	return {
		async getProfile() {
			return authFetchClient.GET('/api/users/profile');
		},
		async setAvatar(file: File) {
			return authFetchClient.PATCH('/api/users/profile-picture', {
				// headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
				body: { file: 'placeholder' },
				bodySerializer: () => {
					const formData = new FormData()
					formData.append('file', file)
					return formData;
				}
			})
		}
	}
}
