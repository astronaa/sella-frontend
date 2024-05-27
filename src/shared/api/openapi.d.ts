export interface paths {
    "/api/auth/username": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["AuthController_setUsername"];
        trace?: never;
    };
    "/api/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Endpoint that either log in user if he was already registered, or sign up */
        post: operations["AuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/email/verify-code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Endpoint that validates email verification code, max 3 attempts. */
        post: operations["AuthController_verifyCode"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/email/send-code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Endpoint to send verification code to given email, max 1r/m. */
        post: operations["AuthController_sendCode"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/telegram": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Telegram widget redirects user to this endpoint with telegram data, route validates data and then redirects user to the next sign up step */
        get: operations["AuthController_telegramCallback"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Route to refresh accessToken, by default accessToken is valid for 1 hour */
        post: operations["AuthController_getNewAccessToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/nonce": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Route to get nonce to sign message with */
        post: operations["AuthController_createNonce"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/profile-picture": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Deletes current user's profile picture. */
        delete: operations["UsersController_deleteProfilePicture"];
        options?: never;
        head?: never;
        /** @description Update user's profile picture. Accepts JPEG or PNG up to **2MB** (2 000 000 bytes) in size. */
        patch: operations["UsersController_updateProfilePicture"];
        trace?: never;
    };
    "/api/users/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns information about current user */
        get: operations["UsersController_profile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/media/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get media by UUIDv4. */
        get: operations["MediaController_getMedia"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/twitter/auth": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Redirects the user to Twitter's authorization page. */
        get: operations["TwitterController_auth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/twitter/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description This endpoint is where Twitter redirects the user after authorization. It saves the user's Twitter account to the database. */
        get: operations["TwitterController_callback"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SetUsernameDto: {
            username: string;
        };
        BadRequestDto: {
            message: string[];
            error: string;
            statusCode: number;
        };
        HttpExceptionDto: {
            statusCode: number;
            message: string;
        };
        LoginDto: {
            /** @description Address that signed login message, user address */
            address: string;
            /** @description Signature after user signed login message */
            signature: string;
        };
        LoginResponseDto: {
            hasTwitter: boolean;
            hasUsername: boolean;
        };
        VerifyCodeDto: {
            email: string;
            code: string;
        };
        SendCodeDto: {
            email: string;
        };
        CreateNonceDto: {
            address: string;
        };
        NonceResponseDto: {
            nonce: number;
        };
        Promise: Record<string, never>;
        User: {
            id: number;
            profilePicture: components["schemas"]["Promise"];
            profilePictureId: string;
            address: string;
            username: string;
            email: string;
            twitterId: string;
            telegramId: string;
            /** Format: date-time */
            createdAt: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AuthController_setUsername: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetUsernameDto"];
            };
        };
        responses: {
            /** @description Username set successfully */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Request data sent was not valid by schema */
            400: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["BadRequestDto"];
                };
            };
            /** @description User with given username already exists */
            409: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
        };
    };
    AuthController_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginDto"];
            };
        };
        responses: {
            /** @description User logged in with wallet, if hasTwitter and hasUsername equals true, then redirect to the profile page on a client, otherwise process login by current step */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["LoginResponseDto"];
                };
            };
            /** @description Request data sent was not valid by schema */
            400: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["BadRequestDto"];
                };
            };
            /** @description Sent signature was invalid, user does not own address */
            403: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
        };
    };
    AuthController_verifyCode: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VerifyCodeDto"];
            };
        };
        responses: {
            /** @description Code is valid, email changed. */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Request data sent was not valid by schema */
            400: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["BadRequestDto"];
                };
            };
            /** @description Sent code is invalid, email has not changed */
            403: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
        };
    };
    AuthController_sendCode: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SendCodeDto"];
            };
        };
        responses: {
            /** @description Verification code successfully sent */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Request data sent was not valid by schema */
            400: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["BadRequestDto"];
                };
            };
            /** @description User with given email already exists */
            409: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
            /** @description Rate limited */
            429: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
        };
    };
    AuthController_telegramCallback: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User has successfully connected telegram account, redirecting to login */
            302: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Data send in callback was not valid */
            403: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
            /** @description Telegram account was already connected to another user */
            409: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
        };
    };
    AuthController_getNewAccessToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description accessToken successfully refreshed, in Cookie header new accessToken sent */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Refresh token no longer valid */
            401: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
            /** @description User does not have refreshToken */
            403: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["HttpExceptionDto"];
                };
            };
        };
    };
    AuthController_createNonce: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateNonceDto"];
            };
        };
        responses: {
            /** @description Address is valid and nonce returned */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["NonceResponseDto"];
                };
            };
            /** @description Request data sent was not valid by schema */
            400: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["BadRequestDto"];
                };
            };
        };
    };
    UsersController_deleteProfilePicture: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Profile picture deleted successfully */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    UsersController_updateProfilePicture: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /** Format: binary */
                    file?: string;
                };
            };
        };
        responses: {
            /** @description Profile picture updated successfully */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Invalid file type or file size */
            422: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    UsersController_profile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User information */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
        };
    };
    MediaController_getMedia: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description UUIDv4 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Requested media */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Media with that ID was not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    TwitterController_auth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful redirect link creation */
            302: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    TwitterController_callback: {
        parameters: {
            query: {
                oauth_token: string;
                oauth_verifier: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Currently just a placeholder. Should redirect to the frontend page, which will explain the result */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
}
