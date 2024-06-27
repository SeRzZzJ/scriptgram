import { ApiClient } from "../network"
import { AllowedUpdatesArray } from "./aliases-types"
import type {
    MessageEntity,
    InputFile,
    Message,
    Update,
    InlineKeyboardMarkup,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    ForceReply,
    InputMediaAudio,
    InputMediaDocument,
    InputMediaPhoto,
    InputMediaVideo,
    ChatPermissions,
    BotCommand,
    BotCommandScope,
    MenuButton,
    ChatAdministratorRights,
    InputMedia,
    MaskPosition,
    InlineQueryResult,
    LabeledPrice,
    ShippingOption,
    PassportElementError,
    WebhookInfo,
    User,
} from "./telegram-types"

export class TelegramBot {
    public readonly baseUrl: string = "https://api.telegram.org"
    public readonly baseRoute: string = "/bot"
    public readonly token: string
    public readonly apiClient: ApiClient

    constructor(token: string) {
        this.token = token
        this.apiClient = new ApiClient(
            this.baseUrl.concat(this.baseRoute, this.token)
        )
    }

    async getUpdates(
        offset?: number,
        limit?: number,
        timeout?: number,
        allowed_updates?: AllowedUpdatesArray
    ) {
        return (
            await this.apiClient.callApi("get", "getUpdates", {
                params: {
                    offset: offset,
                    limit: limit,
                    timeout: timeout,
                    allowed_updates: allowed_updates,
                },
            })
        ).result as Update[]
    }

    async setWebhook(
        url: string,
        optional?: {
            certificate?: InputFile
            ip_address?: string
            max_connections?: number
            allowed_updates?: AllowedUpdatesArray
            drop_pending_updates?: false
            secret_token?: string
        }
    ) {
        if (!optional) {
            return (
                await this.apiClient.callApi("post", "setWebhook", {
                    params: { url: url },
                })
            ).result as boolean
        }
        return (
            await this.apiClient.callApi("post", "setWebhook", {
                params: Object.assign({ url: url }, optional),
            })
        ).result as boolean
    }

    async getWebhookInfo() {
        return (await this.apiClient.callApi("get", "getWebhookInfo"))
            .result as WebhookInfo
    }

    async deleteWebhook(drop_pending_updates?: boolean) {
        return (
            await this.apiClient.callApi("post", "deleteWebhook", {
                params: {
                    drop_pending_updates: drop_pending_updates,
                },
            })
        ).result as boolean
    }

    async getMe() {
        return (await this.apiClient.callApi("get", "getMe")).result as User
    }

    async logOut() {
        return (await this.apiClient.callApi("post", "logOut"))
            .result as boolean
    }

    async close() {
        return (await this.apiClient.callApi("post", "close")).result as boolean
    }

    async sendMessage(
        chat_id: number | string,
        text: string,
        optional?: {
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            entities?: MessageEntity[]
            disable_web_page_preview?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {
        return (
            await this.apiClient.callApi<
                "post",
                {
                    params: {
                        chat_id: number | string
                        text: string
                    }
                }
            >("post", "sendMessage", {
                params: {
                    chat_id: chat_id,
                    text: text,
                },
            })
        ).result as Message
    }

    async forwardMessage(
        chat_id: number | string,
        message_id: number | string,
        from_chat_id: number | string,
        optional?: {
            message_thread_id?: number
            disable_notification?: boolean
            protect_content?: boolean
        }
    ) {}

    async copyMessage(
        chat_id: number | string,
        message_id: number | string,
        from_chat_id: number | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            caption_entities?: MessageEntity[]
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendPhoto(
        chat_id: number | string,
        photo: InputFile | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            has_spoiler?: boolean
            message_thread_id?: number
            caption_entities?: MessageEntity[]
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendAudio(
        chat_id: number | string,
        audio: InputFile | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            caption_entities?: MessageEntity[]
            duration?: number
            performer?: string
            title?: string
            thumb?: InputFile | string
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendDocument(
        chat_id: number | string,
        document: InputFile | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            caption_entities?: MessageEntity[]
            thumb?: InputFile | string
            disable_content_type_detection?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendVideo(
        chat_id: number | string,
        video: InputFile | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            has_spoiler?: boolean
            caption_entities?: MessageEntity[]
            duration?: number
            width?: number
            height?: number
            thumb?: InputFile | string
            supports_streaming?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendAnimation(
        chat_id: number | string,
        animation: InputFile | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            has_spoiler?: boolean
            caption_entities?: MessageEntity[]
            duration?: number
            width?: number
            height?: number
            thumb?: InputFile | string
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendVoice(
        chat_id: number | string,
        voice: InputFile | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            caption_entities?: MessageEntity[]
            duration?: number
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendVideoNote(
        chat_id: number | string,
        video_note: InputFile | string,
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            caption_entities?: MessageEntity[]
            duration?: number
            length?: number
            thumb?: InputFile | string
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendMediaGroup(
        chat_id: number | string,
        media:
            | InputMediaAudio[]
            | InputMediaDocument[]
            | InputMediaPhoto[]
            | InputMediaVideo[],
        optional?: {
            caption?: string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            caption_entities?: MessageEntity[]
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendLocation(
        latitude: number | string,
        longitude: number | string,
        optional?: {
            horizontal_accuracy?: number
            live_period?: number
            heading?: number
            proximity_alert_radius?: number
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async editMessageLiveLocation(
        latitude: number | string,
        longitude: number | string,
        optional?: {
            chat_id?: number | string
            inline_message_id?: string
            horizontal_accuracy?: number
            heading?: number
            proximity_alert_radius?: number
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async stopMessageLiveLocation(
        chat_id?: number | string,
        message_id?: number,
        inline_message_id?: string,
        reply_markup?:
            | InlineKeyboardMarkup
            | ReplyKeyboardMarkup
            | ReplyKeyboardRemove
            | ForceReply
    ) {}

    async sendVenue(
        chat_id: number | string,
        latitude: number | string,
        longitude: number | string,
        title: string,
        address: string,
        optional?: {
            foursquare_id?: string
            foursquare_type?: string
            google_place_id?: string
            google_place_type?: string
            message_thread_id?: number
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendContact(
        chat_id: number | string,
        phone_number: string,
        first_name: string,
        optional?: {
            last_name?: string
            vcard?: number
            message_thread_id?: number
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendPoll(
        chat_id: number | string,
        question: string,
        options: string[],
        optional?: {
            is_anonymous?: boolean
            type?: "quiz" | "regular"
            allows_multiple_answers?: boolean
            correct_option_id?: number
            explanation?: string
            explanation_parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_thread_id?: number
            explanation_entities?: MessageEntity[]
            open_period?: number
            close_date?: number | Date
            is_closed?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendDice(
        chat_id: number | string,
        optional?: {
            message_thread_id?: number
            emoji?: string
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async sendChatAction(
        chat_id: number | string,
        action:
            | "typing"
            | "upload_photo"
            | "record_video"
            | "upload_video"
            | "record_voice"
            | "upload_voice"
            | "upload_document"
            | "choose_sticker"
            | "find_location"
            | "record_video_note"
            | "upload_video_note",
        optional?: {
            message_thread_id?: number
        }
    ) {}

    async getUserProfilePhotos(
        user_id: number,
        optional?: {
            offset?: number
            limit?: number
        }
    ) {}

    async getFile(file_id: string) {}

    async banChatMember(
        chat_id: string | number,
        user_id: number,
        optional?: {
            until_date?: number
            revoke_messages?: boolean
        }
    ) {}

    async unbanChatMember(
        chat_id: string | number,
        user_id: number,
        optional?: {
            only_if_banned?: boolean
        }
    ) {}

    async restrictChatMember(
        chat_id: string | number,
        user_id: number,
        permissions: ChatPermissions,
        optional?: {
            use_independent_chat_permissions?: boolean
            until_date?: number
        }
    ) {}

    async promoteChatMember(
        chat_id: string | number,
        user_id: number,
        optional?: {
            is_anonymous?: boolean
            can_manage_chat?: boolean
            can_post_messages?: boolean
            can_edit_messages?: boolean
            can_delete_messages?: boolean
            can_manage_video_chats?: boolean
            can_restrict_members?: boolean
            can_promote_members?: boolean
            can_change_info?: boolean
            can_invite_users?: boolean
            can_pin_messages?: boolean
            can_manage_topics?: boolean
        }
    ) {}

    async setChatAdministratorCustomTitle(
        chat_id: string | number,
        user_id: number,
        custom_title: string
    ) {}

    async banChatSenderChat(chat_id: string | number, sender_chat_id: number) {}

    async unbanChatSenderChat(
        chat_id: string | number,
        sender_chat_id: number
    ) {}

    async setChatPermissions(
        chat_id: string | number,
        permissions: ChatPermissions,
        optional?: {
            use_independent_chat_permissions?: boolean
        }
    ) {}

    async exportChatInviteLink(chat_id: string | number) {}

    async createChatInviteLink(
        chat_id: string | number,
        optional?: {
            name?: string
            expire_date?: number
            member_limit?: number
            creates_join_request?: boolean
        }
    ) {}

    async editChatInviteLink(
        chat_id: string | number,
        invite_link: string,
        optional?: {
            name?: string
            expire_date?: number
            member_limit?: number
            creates_join_request?: boolean
        }
    ) {}

    async revokeChatInviteLink(chat_id: string | number, invite_link: string) {}

    async approveChatJoinRequest(chat_id: string | number, user_id: number) {}

    async declineChatJoinRequest(chat_id: string | number, user_id: number) {}

    async setChatPhoto(chat_id: string | number, photo: InputFile) {}

    async deleteChatPhoto(chat_id: string | number) {}

    async setChatTitle(chat_id: string | number, title: string) {}

    async setChatDescription(chat_id: string | number, description: string) {}

    async pinChatMessage(
        chat_id: string | number,
        message_id: number,
        optional?: {
            disable_notifications?: boolean
        }
    ) {}

    async unpinChatMessage(chat_id: string | number, message_id: number) {}

    async unpinAllChatMessages(chat_id: string | number) {}

    async leaveChat(chat_id: string | number) {}

    async getChat(chat_id: string | number) {}

    async getChatAdministrators(chat_id: string | number) {}

    async getChatMemberCount(chat_id: string | number) {}

    async getChatMember(chat_id: string | number, user_id: number) {}

    async setChatStickerSet(
        chat_id: string | number,
        sticker_set_name: string
    ) {}

    async deleteChatStickerSet(chat_id: string | number) {}

    async getForumTopicIconStickers() {}

    async createForumTopic(
        chat_id: string | number,
        name: string,
        optional?: {
            icon_color?: number
            icon_custom_emoji_id?: string
        }
    ) {}

    async editForumTopic(
        chat_id: string | number,
        message_thread_id: number,
        optional?: {
            name?: string
            icon_custom_emoji_id?: string
        }
    ) {}

    async closeForumTopic(
        chat_id: string | number,
        message_thread_id: number
    ) {}

    async reopenForumTopic(
        chat_id: string | number,
        message_thread_id: number
    ) {}

    async deleteForumTopic(
        chat_id: string | number,
        message_thread_id: number
    ) {}

    async unpinAllForumTopicMessages(
        chat_id: string | number,
        message_thread_id: number
    ) {}

    async editGeneralForumTopic(chat_id: string | number, name: string) {}

    async closeGeneralForumTopic(chat_id: string | number) {}

    async reopenGeneralForumTopic(chat_id: string | number) {}

    async hideGeneralForumTopic(chat_id: string | number) {}

    async unhideGeneralForumTopic(chat_id: string | number) {}

    async answerCallbackQuery(
        callback_query_id: string,
        optional?: {
            text?: string
            show_alert?: boolean
            url?: string
            cache_time?: number
        }
    ) {}

    async setMyCommands(
        commands: BotCommand[],
        optional?: {
            scope?: BotCommandScope
            language_code?: string
        }
    ) {}

    async deleteMyCommands(optional?: {
        scope?: BotCommandScope
        language_code?: string
    }) {}

    async getMyCommands(optional?: {
        scope?: BotCommandScope
        language_code?: string
    }) {}

    async setChatMenuButton(optional?: {
        chat_id?: number
        menu_button?: MenuButton
    }) {}

    async getChatMenuButton(chat_id: string | number) {}

    async setMyDefaultAdministratorRights(optional?: {
        rights?: ChatAdministratorRights
        for_channels?: boolean
    }) {}

    async getMyDefaultAdministratorRights(optional?: {
        for_channels?: boolean
    }) {}

    async editMessageText(
        text: string,
        optional?: {
            chat_id?: number | string
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
            message_id?: number
            inline_message_id?: string
            entities?: MessageEntity[]
            disable_web_page_preview?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async editMessageCaption(optional?: {
        chat_id?: number | string
        caption?: string
        parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
        message_id?: number
        inline_message_id?: string
        entities?: MessageEntity[]
        disable_web_page_preview?: boolean
        reply_markup?:
            | InlineKeyboardMarkup
            | ReplyKeyboardMarkup
            | ReplyKeyboardRemove
            | ForceReply
    }) {}

    async editMessageMedia(
        media: InputMedia,
        optional?: {
            chat_id?: number | string
            message_id?: number
            inline_message_id?: string
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async editMessageReplyMarkup(optional?: {
        chat_id?: number | string
        message_id?: number
        inline_message_id?: string
        reply_markup?:
            | InlineKeyboardMarkup
            | ReplyKeyboardMarkup
            | ReplyKeyboardRemove
            | ForceReply
    }) {}

    async stopPoll(
        chat_id: number | string,
        message_id: number,
        optional?: {
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async deleteMessage(chat_id: number | string, message_id: number) {}

    async sendSticker(
        chat_id: number | string,
        sticker: InputFile | string,
        optional?: {
            message_thread_id?: number
            disable_notification?: boolean
            emoji?: string
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async getStickerSet(name: string) {}

    async getCustomEmojiStickers(custom_emoji_ids: string[]) {}

    async uploadStickerFile(user_id: number, png_sticker: InputFile) {}

    async createNewStickerSet(
        user_id: number,
        name: string,
        title: string,
        emojis: string,
        optional?: {
            png_sticker?: InputFile | string
            tgs_sticker?: InputFile
            webm_sticker?: InputFile
            sticker_type?: "regular" | "mask"
            mask_position?: MaskPosition
        }
    ) {}

    async addStickerToSet(
        user_id: number,
        name: string,
        emojis: string,
        optional?: {
            png_sticker?: InputFile | string
            tgs_sticker?: InputFile
            webm_sticker?: InputFile
            sticker_type?: "regular" | "mask"
            mask_position?: MaskPosition
        }
    ) {}

    async setStickerPositionInSet(sticker: string, position: number) {}
    async deleteStickerFromSet(sticker: string) {}
    async setStickerSetThumb(
        name: string,
        user_id: number,
        optional?: {
            thumb?: InputFile | string
        }
    ) {}

    async answerInlineQuery(
        inline_query_id: string,
        results: InlineQueryResult,
        optional?: {
            cache_time?: number
            is_personal?: boolean
            next_offset?: string
            switch_pm_text?: string
            switch_pm_parameter?: string
        }
    ) {}
    async answerWebAppQuery(
        web_app_query_id: string,
        results: InlineQueryResult
    ) {}

    async sendInvoice(
        chat_id: number | string,
        title: string,
        description: string,
        payload: string,
        provider_token: string,
        currency: string,
        prices: LabeledPrice[],
        optional?: {
            message_thread_id?: number
            max_tip_amount?: number
            suggested_tip_amounts?: number[]
            start_parameter?: string
            provider_data?: string
            photo_url?: string
            photo_size?: number
            photo_width?: number
            photo_height?: number
            need_name?: boolean
            need_phone_number?: boolean
            need_email?: boolean
            need_shipping_address?: boolean
            send_phone_number_to_provider?: boolean
            send_email_to_provider?: boolean
            is_flexible?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async createInvoiceLink(
        title: string,
        description: string,
        payload: string,
        provider_token: string,
        currency: string,
        prices: LabeledPrice[],
        optional?: {
            max_tip_amount?: number
            suggested_tip_amounts?: number[]
            start_parameter?: string
            provider_data?: string
            photo_url?: string
            photo_size?: number
            photo_width?: number
            photo_height?: number
            need_name?: boolean
            need_phone_number?: boolean
            need_email?: boolean
            need_shipping_address?: boolean
            send_phone_number_to_provider?: boolean
            send_email_to_provider?: boolean
            is_flexible?: boolean
        }
    ) {}

    async answerShippingQuery(
        shipping_query_id: string,
        ok: boolean,
        optional?: {
            shipping_options?: ShippingOption[]
            error_message?: string
        }
    ) {}

    async answerPreCheckoutQuery(
        pre_checkout_query_id: string,
        ok: boolean,
        optional?: {
            error_message?: string
        }
    ) {}

    async setPassportDataErrors(
        user_id: number,
        errors: PassportElementError[]
    ) {}

    async sendGame(
        chat_id: number | string,
        game_short_name: string,
        optional?: {
            message_thread_id?: number
            disable_notification?: boolean
            protect_content?: boolean
            reply_to_message_id?: number
            allow_sending_without_reply?: boolean
            reply_markup?:
                | InlineKeyboardMarkup
                | ReplyKeyboardMarkup
                | ReplyKeyboardRemove
                | ForceReply
        }
    ) {}

    async setGameScore(
        user_id: number,
        score: number,
        optional?: {
            force?: boolean
            disable_edit_message?: boolean
            chat_id?: number
            message_id?: number
            inline_message_id?: string
        }
    ) {}

    async getGameHighScores(
        user_id: number,
        optional?: {
            chat_id?: number
            message_id?: number
            inline_message_id?: string
        }
    ) {}

    async setMyDescription(optional?: {
        description?: string
        language_code?: string
    }) {}

    async getMyDescription(optional?: { language_code?: string }) {}

    async setMyShortDescription(optional?: {
        short_description?: string
        language_code?: string
    }) {}

    async getMyShortDescription(optional?: { language_code?: string }) {}

    async getMyName(optional?: { language_code?: string }) {}
}
