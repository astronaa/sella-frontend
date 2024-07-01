import { authFetchClient } from "../fetch-client";
import { schemaFile } from "../shared/schemas";
import { mapDtoToUser } from "./mappers";

export function createUsersClient() {
	return {
		async getProfile() {
			const { data, error, response } = await authFetchClient.GET('/api/users/profile');

			return data ? {
				data: mapDtoToUser(data),
				error, response
			} : {
				data, error, response
			}
		},
		async setAvatar(file: File) {
			return authFetchClient.PATCH('/api/users/profile-picture', {
				body: { file: 'placeholder' },
				bodySerializer: () => {
					const formData = new FormData()
					formData.append('file', file)
					return formData;
				}
			})
		},
		async deleteAvatar() {
			return authFetchClient.DELETE('/api/users/profile-picture')
		},
		async setTronWallet(address: string) {
			return authFetchClient.PATCH('/api/users/tron-address', {
				body: { tronAddress: address }
			})
		},

		schemaAvatarFile: schemaFile(1024 * 1024 * 2) // 2mb
	}
}
