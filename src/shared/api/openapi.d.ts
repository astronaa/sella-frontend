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
        /** @description Update user's profile picture. Accepts JPEG or PNG up to **3MB** (3 000 000 bytes) in size. */
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
    "/api/users/tron-address": {
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
        /** @description Changes tron address */
        patch: operations["UsersController_updateTronAddress"];
        trace?: never;
    };
    "/api/stores/{url}/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["StoresController_getProductsByStoreUrl"];
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
        get: operations["StoresController_getStoreByUrl"];
        put?: never;
        post?: never;
        delete: operations["StoresController_deleteStore"];
        options?: never;
        head?: never;
        patch: operations["StoresController_updateStore"];
        trace?: never;
    };
    "/api/stores": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["StoresController_getAllStores"];
        put?: never;
        post: operations["StoresController_createStore"];
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
        get: operations["StoresController_getStoreReportByUrl"];
        put?: never;
        post: operations["StoresController_reportStoreByUrl"];
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
        patch: operations["StoresController_changeStoreImage"];
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
        get: operations["StoresController_storeExists"];
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
    "/api/products/{id}/payment-methods": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ProductsController_getPaymentMethods"];
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
        delete: operations["ProductsController_deleteProduct"];
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
        get: operations["ProductsController_getProductsByStoreUrl"];
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
        post: operations["ProductsController_addImages"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/products/{id}/chat": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ProductsController_getOrCreateChat"];
        put?: never;
        post?: never;
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
    "/api/telegram/webhook": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["TelegramController_handleWebhook"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/featured-tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["TagController_getFeaturedTags"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ChatController_getAllChats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ChatController_getAllUnreadChats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats/{chatId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ChatController_getChatInfo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats/{chatId}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ChatController_getMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats/{chatId}/messages/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["ChatController_markMessagesAsRead"];
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
    "/api/orders/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["OrdersController_getOrderInfo"];
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
    "/api/my-orders": {
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
    "/api/orders/{id}/chat": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["OrdersController_getOrCreateChat"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/quests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["QuestsController_getQuests"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/quests/{id}/complete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["QuestsController_completeQuest"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/contract/abi": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ContractController_getAbi"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/product/{id}/report": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ProductReportsController_getByProductId"];
        put?: never;
        post: operations["ProductReportsController_reportStoreByUrl"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/stores/{url}/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["DashboardController_getMySellingProducts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/my-sales": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["DashboardController_getMySales"];
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
            message: Record<string, string | undefined>;
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
        QuestAttribute: {
            url?: string;
            xId?: string;
            postId?: string;
            friends?: number;
        };
        Quest: {
            id: string;
            title: string;
            description: string;
            /** @enum {string} */
            type: "followOnX" | "addSella" | "retweetOnX" | "likeOnX" | "commentOnX" | "followOnTelegram" | "createFirstStore" | "referFriends" | "commentOnMedium" | "commeOnReddit" | "upvoteOnReddit" | "likeOnMedium";
            questRequired: components["schemas"]["Quest"];
            attribute?: components["schemas"]["QuestAttribute"];
            points: number;
            /** Format: date-time */
            createdAt: string;
        };
        User: {
            id: number;
            profilePictureId: string;
            address: string;
            username: string;
            email?: string;
            twitterId?: string;
            twitterUsername?: string;
            telegramId?: string;
            refCode: string;
            invitedBy?: number;
            points: number;
            tronAddress?: string;
            /** Format: date-time */
            lastOnline: string;
            completedQuests: components["schemas"]["Quest"][];
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
            description?: string;
            url: string;
            /** Format: date-time */
            createdAt: string;
        };
        UpdateTronAddress: {
            /** @description Tron address */
            tronAddress: string;
        };
        EnumeratedProductDto: {
            id: string;
            name: string;
            hasPreview: boolean;
            imageIds: string[];
            price: number;
            description: string | null;
            shortDescription: string;
            holdPeriod: number;
            isFrozen: boolean;
            tagNames: string[];
        };
        ProductsResponseDto: {
            data: components["schemas"]["EnumeratedProductDto"][];
            total: number;
        };
        RatingDto: {
            total: number;
            positive: number;
            negative: number;
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
            ownerUsername: string;
            tagNames: string[];
            isFeatured: boolean;
        };
        CreateStoreDto: {
            name: string;
            description?: string;
            url: string;
            tagNames: string[];
        };
        StoresSearchResultDto: {
            data: components["schemas"]["StoreInfoDto"][];
            total: number;
        };
        UpdateStoreDto: {
            name?: string;
            description?: string;
            url?: string;
            tagNames: string[];
        };
        ReportStoreDto: {
            /** @description List of enum values */
            tag: ("Spam" | "Nudity" | "Scam" | "Illegal" | "Violence" | "HateSpeech" | "SomethingElse")[];
            message?: string;
        };
        Token: {
            /** @description The name of the token */
            name: string;
            /** @description The address of the token */
            address: string;
            decimals: number;
        };
        PaymentMethod: {
            /** @description The name of the blockchain */
            name: string;
            /** @description Chain id of network */
            chainId: number;
            /** @enum {string} */
            value: "ETH" | "SEPOLIA" | "TRX" | "MATIC" | "Nile";
            /** @description The contract address of the escrow contract */
            contractAddress: string;
            /** @description List of tokens associated with the blockchain */
            tokens: components["schemas"]["Token"][];
        };
        BaseStoreDto: {
            name: string;
            url: string;
            /** Format: uuid */
            imageId?: string;
            description?: string;
        };
        StoreOwnerDto: {
            username: string;
            /** Format: uuid */
            profilePictureId: string | null;
            rating: components["schemas"]["RatingDto"];
        };
        ProductDetailsDTO: {
            id: string;
            name: string;
            hasPreview: boolean;
            imageIds: string[];
            description?: string;
            shortDescription: string;
            price: number;
            holdPeriod: number;
            storeUrl: string;
            rating: components["schemas"]["RatingDto"];
            /** @default false */
            isFrozen: boolean;
            tagNames: string[];
            /** Format: date-time */
            createdAt: string;
            store: components["schemas"]["BaseStoreDto"];
            storeOwner: components["schemas"]["StoreOwnerDto"];
        };
        ProductCreateDto: {
            name: string;
            description?: string;
            shortDescription: string;
            price: number;
            storeUrl: string;
            holdPeriod: number;
            tagNames: string[];
        };
        ProductDto: {
            id: string;
            name: string;
            hasPreview: boolean;
            imageIds: string[];
            description?: string;
            shortDescription: string;
            price: number;
            holdPeriod: number;
            storeUrl: string;
            rating: components["schemas"]["RatingDto"];
            /** @default false */
            isFrozen: boolean;
            tagNames: string[];
            /** Format: date-time */
            createdAt: string;
        };
        ProductUpdateDto: {
            name?: string;
            description?: string;
            shortDescription?: string;
            price?: number;
            imageIds?: string[];
            hasPreview?: boolean;
            tagNames?: string[];
            holdPeriod?: number;
            isFrozen?: boolean;
        };
        ProductAddImageResultDto: {
            imageIds: string[];
        };
        ChatAccessResponseDto: {
            accessToken: string;
        };
        BaseUserDto: {
            username: string;
            /** Format: uuid */
            profilePictureId: string | null;
        };
        BaseProductDto: {
            id: string;
            name: string;
            hasPreview: boolean;
            imageIds: string[];
        };
        Message: {
            id: number;
            senderId: number;
            sender: components["schemas"]["User"];
            chatId: string;
            content: Record<string, never>;
            isRead: boolean;
            isSystem: boolean;
            /** @enum {string} */
            systemType: "NEW_CHAT" | "DISPUTE_RESOLVED" | "DISPUTE_STARTED" | "TRANSACTION_COMPLETED" | "TRANSACTION_FAILED" | "TRANSACTION_PENDING" | "FUNDS_DEPOSITED" | "FUNDS_RELEASED" | "FUNDS_CLAIMED" | "FUNDS_REFUNDED";
            systemData: Record<string, never>;
            /** Format: date-time */
            readAt: string;
            /** Format: date-time */
            createdAt: string;
        };
        ChatDTO: {
            id: string;
            buyer: components["schemas"]["BaseUserDto"];
            isFrozen: boolean;
            product: components["schemas"]["BaseProductDto"];
            lastMessage: components["schemas"]["Message"] | null;
            unreadMessagesCount: number;
        };
        ChatResponseWithMetaDto: {
            metadata: components["schemas"]["ChatAccessResponseDto"];
            result: components["schemas"]["ChatDTO"];
        };
        CommentUserDto: {
            username: string;
            /** Format: uuid */
            profilePictureId: string | null;
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
        FeaturedTagDto: {
            name: string;
            /** Format: uuid */
            imageId: string;
        };
        GetAllChatsResponseDto: {
            data: components["schemas"]["ChatDTO"][];
            total: number;
        };
        UnreadMessagesCountResponseDto: {
            unreadMessagesCount: number;
            metadata: components["schemas"]["ChatAccessResponseDto"];
        };
        MessageDto: {
            id: number;
            chatId: string;
            senderId: number;
            sender: components["schemas"]["User"];
            store: components["schemas"]["Store"];
            content: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            readAt: string;
            fileIds: string[];
            isSystem: boolean;
            /** @enum {string|null} */
            systemType: "NEW_CHAT" | "DISPUTE_RESOLVED" | "DISPUTE_STARTED" | "TRANSACTION_COMPLETED" | "TRANSACTION_FAILED" | "TRANSACTION_PENDING" | "FUNDS_DEPOSITED" | "FUNDS_RELEASED" | "FUNDS_CLAIMED" | "FUNDS_REFUNDED" | null;
            systemData: Record<string, never>;
        };
        GetMessagesResponseDto: {
            data: components["schemas"]["MessageDto"][];
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        SellerDto: {
            username: string;
            /** Format: uuid */
            profilePictureId: string | null;
            address: string;
            tronAddress?: string;
        };
        OrderInfoDto: {
            id: string;
            store: components["schemas"]["BaseStoreDto"];
            product: components["schemas"]["BaseProductDto"];
            seller: components["schemas"]["SellerDto"];
            /** @enum {string} */
            status: "Unpaid" | "Hold" | "Claimed" | "Refunded" | "Dispute" | "Resolved" | "Released";
            /** @enum {string} */
            fulfillmentStatus: "Pending" | "Processing" | "Fulfilled" | "Dispute" | "Failed" | "Canceled";
            price: number;
            /** Format: int64 */
            tokenAmount: number;
            /** @enum {string} */
            token: "ETH" | "TRX" | "MATIC" | "USDT" | "USDC" | "DAI" | "SELLA";
            contractEscrowId: number | null;
            /** @enum {string} */
            blockchain: "ETH" | "SEPOLIA" | "TRX" | "MATIC" | "Nile";
            holdPeriod: number;
            holdEndingAt: string | null;
            /** Format: date-time */
            createdAt: string;
        };
        OrderCreateDto: {
            productId: string;
            token: string;
            blockchain: string;
        };
        OrdersResponseDto: {
            data: components["schemas"]["OrderInfoDto"][];
            total: number;
            totalPrice: number;
        };
        QuestsResponseDto: {
            data: components["schemas"]["Quest"][];
        };
        CompleteQuestResponseDto: {
            completed: boolean;
        };
        ReportProductDto: {
            tags: ("Spam" | "Nudity" | "Scam" | "Illegal" | "Violence" | "HateSpeech" | "SomethingElse")[];
            message?: string;
        };
        SellingProductDto: {
            id: string;
            name: string;
            hasPreview: boolean;
            imageIds: string[];
            sold: number;
            rating: components["schemas"]["RatingDto"];
        };
        SellingProductsResponseDto: {
            data: components["schemas"]["SellingProductDto"][];
            total: number;
        };
        SalesInfoDto: {
            id: string;
            buyer: components["schemas"]["BaseUserDto"];
            product: components["schemas"]["BaseProductDto"];
            /** @enum {string} */
            status: "Unpaid" | "Hold" | "Claimed" | "Refunded" | "Dispute" | "Resolved" | "Released";
            /** @enum {string} */
            fulfillmentStatus: "Pending" | "Processing" | "Fulfilled" | "Dispute" | "Failed" | "Canceled";
            price: number;
            /** Format: int64 */
            tokenAmount: number;
            /** @enum {string} */
            token: "ETH" | "TRX" | "MATIC" | "USDT" | "USDC" | "DAI" | "SELLA";
            /** @enum {string} */
            blockchain: "ETH" | "SEPOLIA" | "TRX" | "MATIC" | "Nile";
            /** Format: date-time */
            createdAt: string;
        };
        SalesResponseDto: {
            data: components["schemas"]["SalesInfoDto"][];
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
    UsersController_updateTronAddress: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTronAddress"];
            };
        };
        responses: {
            /** @description Sucessfully changed tron address */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    StoresController_getProductsByStoreUrl: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
                query?: string;
                sort?: "new" | "old" | "price_asc" | "price_desc" | "rating";
                /** @description Minimum price (inclusive) */
                minPrice?: number;
                /** @description Maximum price (inclusive) */
                maxPrice?: number;
                /** @description One of tags */
                tagName?: string[];
            };
            header?: never;
            path: {
                url: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns array of products for stores */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductsResponseDto"];
                };
            };
        };
    };
    StoresController_getStoreByUrl: {
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
            /** @description Returns stores by given url address */
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
    StoresController_deleteStore: {
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
            /** @description User does not own stores */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    StoresController_updateStore: {
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
                content: {
                    "application/json": components["schemas"]["StoreInfoDto"];
                };
            };
            /** @description Request data sent was not valid by schema */
            400: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["BadRequestDto"];
                };
            };
            /** @description User does not own stores */
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
    StoresController_getAllStores: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
                query?: string;
                sort?: "rating" | "featured_rating";
                /** @description One of tags */
                tagName?: string[];
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
                    "application/json": components["schemas"]["StoresSearchResultDto"];
                };
            };
        };
    };
    StoresController_createStore: {
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
            /** @description Store created successfully, new stores was return in message body */
            201: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["StoreInfoDto"];
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
    StoresController_getStoreReportByUrl: {
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
            /** @description Store report successfully retrieved */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ReportStoreDto"];
                };
            };
            /** @description Report was not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    StoresController_reportStoreByUrl: {
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
    StoresController_changeStoreImage: {
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
            /** @description User successfully changed stores image */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User does not own stores */
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
    StoresController_storeExists: {
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
    ProductsController_getPaymentMethods: {
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
            /** @description Successfully sent payment methods */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["PaymentMethod"][];
                };
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
                    "application/json": components["schemas"]["ProductDetailsDTO"];
                };
            };
            /** @description Product not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    ProductsController_deleteProduct: {
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
            /** @description Product deleted successfully. */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductDto"];
                };
            };
            /** @description User cannot delete this product */
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
                    "application/json": components["schemas"]["ProductDto"];
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
    ProductsController_getProductsByStoreUrl: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
                query?: string;
                sort?: "new" | "old" | "price_asc" | "price_desc" | "rating";
                /** @description Minimum price (inclusive) */
                minPrice?: number;
                /** @description Maximum price (inclusive) */
                maxPrice?: number;
                /** @description One of tags */
                tagName?: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns array of products */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ProductsResponseDto"];
                };
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
                    "application/json": components["schemas"]["ProductDto"];
                };
            };
            /** @description Invalid product data or maximum number of images reached */
            400: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User does not own this stores */
            403: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    ProductsController_addImages: {
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
                    files?: string[];
                };
            };
        };
        responses: {
            /** @description Images added successfully. Returns an array of new product images IDs */
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
    ProductsController_getOrCreateChat: {
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
            /** @description Chat retrieved or created successfully. Returns chat information with metadata */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ChatResponseWithMetaDto"];
                };
            };
            /** @description Invalid product ID */
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
    ReviewsController_getCommentsByProductId: {
        parameters: {
            query: {
                productId: string;
                page: number;
                pageSize: number;
                sort: "newest" | "oldest" | "highestRating" | "lowestRating";
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
                orderId: string;
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
    TelegramController_handleWebhook: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Handle webhook telegram */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    TagController_getFeaturedTags: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Featured tags retrieved successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["FeaturedTagDto"][];
                };
            };
        };
    };
    ChatController_getAllChats: {
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
            /** @description Return all chats */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["GetAllChatsResponseDto"];
                };
            };
            /** @description Chats not allowed */
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
    ChatController_getAllUnreadChats: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Return count unread messages */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["UnreadMessagesCountResponseDto"];
                };
            };
            /** @description Chats not allowed */
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
    ChatController_getChatInfo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                chatId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns chat info */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ChatResponseWithMetaDto"];
                };
            };
            /** @description Invalid chat ID */
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
    ChatController_getMessages: {
        parameters: {
            query: {
                offset: number;
                limit: number;
            };
            header?: never;
            path: {
                chatId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns messages in chat */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["GetMessagesResponseDto"];
                };
            };
            /** @description Invalid chat ID */
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
    ChatController_markMessagesAsRead: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                chatId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Marks messages as read in chat */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description Invalid chat ID */
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
    OrdersController_getOrderInfo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Retrieved order info successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["OrderInfoDto"];
                };
            };
            /** @description Order not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
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
                    "application/json": components["schemas"]["OrderInfoDto"];
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
                    "application/json": components["schemas"]["OrdersResponseDto"];
                };
            };
        };
    };
    OrdersController_getOrCreateChat: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chat retrieved or created successfully. Returns chat information with metadata */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ChatResponseWithMetaDto"];
                };
            };
            /** @description Invalid order ID */
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
    QuestsController_getQuests: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Retrieved list quests successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["QuestsResponseDto"];
                };
            };
        };
    };
    QuestsController_completeQuest: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Complete Quest successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["CompleteQuestResponseDto"];
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
    ContractController_getAbi: {
        parameters: {
            query?: never;
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
    ProductReportsController_getByProductId: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Product report successfully retrieved */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["ReportProductDto"];
                };
            };
            /** @description Report was not found */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    ProductReportsController_reportStoreByUrl: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReportProductDto"];
            };
        };
        responses: {
            /** @description Product successfully reported */
            200: {
                headers: Record<string, unknown>;
                content?: never;
            };
            /** @description User has already reported this product */
            400: {
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
    DashboardController_getMySellingProducts: {
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
            /** @description Retrieved user sailing products successfully */
            200: {
                headers: Record<string, unknown>;
                content: {
                    "application/json": components["schemas"]["SellingProductsResponseDto"];
                };
            };
            /** @description Store not found or does not belong to the user */
            404: {
                headers: Record<string, unknown>;
                content?: never;
            };
        };
    };
    DashboardController_getMySales: {
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
                    "application/json": components["schemas"]["SalesResponseDto"];
                };
            };
        };
    };
}
