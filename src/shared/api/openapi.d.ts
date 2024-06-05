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
    "/api/users/{username}/exists": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Check if username taken */
        get: operations["UsersController_exists"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/{username}/stores": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns list of stores that user owns */
        get: operations["UsersController_getUserStores"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/stores": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns stores of authorized user */
        get: operations["UsersController_getAuthUserStores"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/stores/{url}/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["StoreController_getProductsByStoreUrl"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/stores/{url}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["StoreController_getStoreByUrl"];
        put?: never;
        post?: never;
        delete: operations["StoreController_deleteStore"];
        options?: never;
        head?: never;
        patch: operations["StoreController_updateStore"];
        trace?: never;
    };
    "/api/stores": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["StoreController_getAllStores"];
        put?: never;
        post: operations["StoreController_createStore"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/stores/{url}/report": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["StoreController_reportStoreByUrl"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/stores/{url}/image": {
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
        patch: operations["StoreController_changeStoreImage"];
        trace?: never;
    };
    "/api/stores/{url}/exists": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Check if url taken */
        get: operations["StoreController_storeExists"];
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
    "/api/products/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ProductsController_getProduct"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["ProductsController_updateProduct"];
        trace?: never;
    };
    "/api/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["ProductsController_createProduct"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/products/{id}/images": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["ProductsController_addImage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/products/{productId}/reviews": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ReviewsController_getCommentsByProductId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/orders/{orderId}/review": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ReviewsController_getReviewForOrder"];
        put?: never;
        post: operations["ReviewsController_createReview"];
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
        get: operations["TwitterController_callback"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/explore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ExploreController_getExplore"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["OrdersController_createOrder"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/orders/my-orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["OrdersController_getMyOrders"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/orders/my-sales": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["OrdersController_getMySales"];
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
            /** @description Referral code from friend */
            refCode?: string;
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
        User: {
            id: number;
            profilePictureId?: string;
            address: string;
            username?: string;
            email?: string;
            twitterId?: string;
            telegramId?: string;
            refCode: string;
            invitedBy?: string;
            /** Format: date-time */
            lastOnline: string;
            /** Format: date-time */
            createdAt: string;
        };
        ExistsResponseDto: {
            exists: boolean;
        };
        Store: {
            id: number;
            imageId?: string;
            ownerId: number;
            name: string;
            description: string;
            url: string;
            /** Format: date-time */
            createdAt: string;
        };
        RatingDto: {
            total: number;
            positive: number;
            negative: number;
        };
        ProductInfoDto: {
            id: string;
            name: string;
            description?: string;
            shortDescription: string;
            price: number;
            imageIds: string[];
            hasPreview: boolean;
            storeUrl: string;
            rating: components["schemas"]["RatingDto"];
        };
        ProductsResponseDto: {
            data: components["schemas"]["ProductInfoDto"][];
            total: number;
        };
        StoreInfoDto: {
            /** Format: uuid */
            imageId?: string;
            name: string;
            description?: string;
            url: string;
            /** Format: date-time */
            createdAt: string;
            rating: components["schemas"]["RatingDto"];
        };
        CreateStoreDto: {
            name: string;
            description?: string;
            url: string;
        };
        StoreResponseDto: {
            data: components["schemas"]["StoreInfoDto"][];
            total: number;
        };
        UpdateStoreDto: {
            name?: string;
            description?: string;
            url?: string;
        };
        ReportStoreDto: {
            /** @description List of enum values */
            tag: ("Spam" | "Nudity" | "Scam" | "Illegal" | "Violence" | "HateSpeech" | "SomethingElse")[];
            message?: string;
        };
        ProductCreateDto: {
            name: string;
            description?: string;
            shortDescription: string;
            price?: number;
            storeUrl: string;
        };
        ProductUpdateDto: {
            name?: string;
            description?: string;
            shortDescription?: string;
            price?: number;
            imageIds?: string[];
            hasPreview?: boolean;
        };
        ProductAddImageResultDto: {
            imageIds: string[];
        };
        CommentUserDto: {
            username: string;
            profilePictureId?: string;
        };
        ReviewDto: {
            /** Format: uuid */
            id: string;
            text: string;
            isPositive: boolean;
            user?: components["schemas"]["CommentUserDto"];
            /** Format: date-time */
            createdAt: string;
        };
        ReviewsResponseDto: {
            comments: components["schemas"]["ReviewDto"][];
            total: number;
        };
        CreateReviewDto: {
            text: string;
            isPositive: boolean;
        };
        GetExploreResponseDto: {
            data: components["schemas"]["Store"][];
            total: number;
        };
        OrderCreateDto: {
            productId: string;
            /** @enum {string} */
            status: "New" | "Paid" | "Delivered" | "Canceled";
            /** @enum {string} */
            fulfillmentStatus: "Pending" | "Processing" | "Fulfilled" | "Failed";
            price: number;
        };
        OrderCreateResultDto: {
            id: string;
        };
        Product: {
            id: string;
            name: string;
            description?: string;
            shortDescription: string;
            price: number;
            imageIds: string[];
            hasPreview: boolean;
            store: components["schemas"]["Store"];
            storeId: number;
            /** Format: date-time */
            createdAt: string;
        };
        Order: {
            id: string;
            buyerId: number;
            buyer: components["schemas"]["User"];
            sellerId: number;
            productId: string;
            product: components["schemas"]["Product"];
            /** @enum {string} */
            status: "New" | "Paid" | "Delivered" | "Canceled";
            /** @enum {string} */
            fulfillmentStatus: "Pending" | "Processing" | "Fulfilled" | "Failed";
            price: number;
            /** Format: date-time */
            createdAt: string;
        };
        OrderResponseDto: {
            data: components["schemas"]["Order"][];
            total: number;
            totalPrice: number;
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
    UsersController_exists: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response if username taken or not */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ExistsResponseDto"];
                };
            };
        };
    };
    UsersController_getUserStores: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully sent list of stores */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["Store"][];
                };
            };
        };
    };
    UsersController_getAuthUserStores: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully sent list of stores */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["Store"][];
                };
            };
        };
    };
    StoreController_getProductsByStoreUrl: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
            };
            header?: never;
            path: {
                url: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns array of products for store */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductsResponseDto"];
                };
            };
        };
    };
    StoreController_getStoreByUrl: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                url: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns store by given url address */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["StoreInfoDto"];
                };
            };
            /** @description Store was not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    StoreController_deleteStore: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                url: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Store successfully deleted */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User does not own store */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    StoreController_updateStore: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                url: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateStoreDto"];
            };
        };
        responses: {
            /** @description Store successfully updated */
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
            /** @description User does not own store */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Store with given url already exists */
            409: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    StoreController_getAllStores: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns all the stores in application */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["StoreResponseDto"];
                };
            };
        };
    };
    StoreController_createStore: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateStoreDto"];
            };
        };
        responses: {
            /** @description Store created successfully, new store was return in message body */
            201: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["Store"];
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
    StoreController_reportStoreByUrl: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                url: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReportStoreDto"];
            };
        };
        responses: {
            /** @description Store successfully reported */
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
        };
    };
    StoreController_changeStoreImage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                url: string;
            };
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
            /** @description User successfully changed store image */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User does not own store */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User sent not valid image */
            422: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["BadRequestDto"];
                };
            };
        };
    };
    StoreController_storeExists: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                url: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response if url taken or not */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ExistsResponseDto"];
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
    ProductsController_getProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Product id
                 * @example 123e4567-e89b-12d3-a456-426614174000
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Product retrieved successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductInfoDto"];
                };
            };
            /** @description Product not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    ProductsController_updateProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Product id
                 * @example 123e4567-e89b-12d3-a456-426614174000
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProductUpdateDto"];
            };
        };
        responses: {
            /** @description Product updated successfully. Returns updated product info */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductInfoDto"];
                };
            };
            /** @description Invalid product data or maximum number of images reached */
            400: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User cannot edit this product */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Product not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    ProductsController_createProduct: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProductCreateDto"];
            };
        };
        responses: {
            /** @description Product created successfully. Returns ID of a new product */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductInfoDto"];
                };
            };
            /** @description Invalid product data or maximum number of images reached */
            400: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User does not own this store */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    ProductsController_addImage: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Product id
                 * @example 123e4567-e89b-12d3-a456-426614174000
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    file?: string[];
                };
            };
        };
        responses: {
            /** @description Images added successfully. Returns an array of current product images IDs */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductAddImageResultDto"];
                };
            };
            /** @description Maximum number of images reached */
            400: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User cannot edit this product */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Product not found */
            404: {
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
    ReviewsController_getCommentsByProductId: {
        parameters: {
            query: {
                productId: string;
                page: number;
                pageSize: number;
                sort: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of reviews for product with given ID */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ReviewsResponseDto"];
                };
            };
        };
    };
    ReviewsController_getReviewForOrder: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Review for order with given ID */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ReviewDto"];
                };
            };
        };
    };
    ReviewsController_createReview: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                productId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateReviewDto"];
            };
        };
        responses: {
            201: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    TwitterController_auth: {
        parameters: {
            query: {
                /** @description URL to redirect user to after successful authentication */
                successUrl: string;
                /** @description URL to redirect user to after failed authentication */
                failureUrl: string;
            };
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
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    ExploreController_getExplore: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns array of stores for explore page */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["GetExploreResponseDto"];
                };
            };
        };
    };
    OrdersController_createOrder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OrderCreateDto"];
            };
        };
        responses: {
            /** @description Order created successfully. Returns ID of the new order */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["OrderCreateResultDto"];
                };
            };
            /** @description Invalid order data */
            400: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User is not authorized */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    OrdersController_getMyOrders: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Retrieved user orders successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["OrderResponseDto"];
                };
            };
        };
    };
    OrdersController_getMySales: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Retrieved user sales successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["OrderResponseDto"];
                };
            };
        };
    };
}
