import { ApiCaller } from "../api-caller";
import {
    BotCommand,
    BotCommandScope,
    ChatAdministratorRights,
    ChatPermissions,
    ForceReply,
    InlineKeyboardMarkup,
    InlineQueryResult,
    InputFile,
    InputMedia,
    InputMediaAudio,
    InputMediaDocument,
    InputMediaPhoto,
    InputMediaVideo,
    LabeledPrice,
    MaskPosition,
    MenuButton,
    MessageEntity,
    PassportElementError,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    ShippingOption,
    Update,
    User,
} from "./telegram-typess";

export class Telegram {
    public readonly baseUrl: string = "https://api.telegram.org";
    public readonly baseRoute: string = "/bot";
    public readonly token: string;
    public readonly apiCaller: ApiCaller;

    constructor(token: string) {
        this.token = token;
        this.apiCaller = new ApiCaller(this.baseUrl.concat(this.baseRoute, this.token));
    }
    
    public async getUpdates(
        offset: number = 0,
        limit: number = 100,
        timeout: number = 10000,
        allowed_updates: {
            message?: true;
            edited_message?: true;
            channel_post?: true;
            edited_channel_post?: true;
            inline_query?: true;
            chosen_inline_result?: true;
            callback_query?: true;
            shipping_query?: true;
            pre_checkout_query?: true;
            poll?: true;
            poll_answer?: true;
            my_chat_member?: true;
            chat_member?: true;
            chat_join_request?: true;
        }
    ): Promise<Update[]> {
        const allowed_updates_array: string[] = [];
        for (const key in Object.keys(allowed_updates)) {
            if (Object.prototype.hasOwnProperty.call(allowed_updates, key)) allowed_updates_array.push(key);
        }
        const jsonUpdates = await this.apiCaller.getCallApi("getUpdates", {
            offset: offset,
            limit: limit,
            timeout: timeout,
            allowed_updates: allowed_updates_array,
        });
        if (!jsonUpdates.ok) throw new Error(JSON.stringify(jsonUpdates));
        const updates: Update[] = [];
        for (const update of jsonUpdates.result) {
            updates.push(update);
        }
        return updates;
    }

    private assignParamsWithOptional(...params: object[]): any {
        let paramsObject: any = {};
        for (const param of params) {
            Object.assign(paramsObject, param);
        }
        return paramsObject;
    }

    public async setWebhook(
        url: string,
        optional?: {
            certificate?: InputFile;
            ip_address?: string;
            max_connections?: number;
            allowed_updates?: {
                message?: boolean;
                edited_message?: boolean;
                channel_post?: boolean;
                edited_channel_post?: boolean;
                inline_query?: boolean;
                chosen_inline_result?: boolean;
                callback_query?: boolean;
                shipping_query?: boolean;
                pre_checkout_query?: boolean;
                poll?: boolean;
                poll_answer?: boolean;
                my_chat_member?: boolean;
                chat_member?: boolean;
                chat_join_request?: boolean;
            };
            drop_pending_updates?: false;
            secret_token?: string;
        }
    ): Promise<boolean> {
        if (!optional) {
            return (await this.apiCaller.postCallApiData("setWebhook", { url: url })).result;
        }
        const allowed_updates_array: string[] = [];
        if (optional.allowed_updates) {
            for (const key in Object.keys(optional.allowed_updates)) {
                if (Object.prototype.hasOwnProperty.call(optional.allowed_updates, key)) allowed_updates_array.push(key);
            }
        }
        return (
            await this.apiCaller.postCallApiData(
                "setWebhook",
                this.assignParamsWithOptional({ url: url }, optional),
                optional.secret_token ? { "X-Telegram-Bot-Api-Secret-Token": optional.secret_token } : undefined
            )
        ).result;
    }

    public async getWebhookInfo(): Promise<boolean> {
        return (await this.apiCaller.getCallApi("getWebhookInfo")).result;
    }

    public async deleteWebhook(drop_pending_updates: boolean): Promise<boolean> {
        return (await this.apiCaller.postCallApiData("deleteWebhook", { drop_pending_updates: drop_pending_updates })).result;
    }

    public async getMe(): Promise<User> {
        return (await this.apiCaller.getCallApi("getMe")).result;
    }

    public async logOut(): Promise<boolean> {
        return (await this.apiCaller.getCallApi("getWebhookInfo")).result;
    }

    public async close(): Promise<boolean> {
        return (await this.apiCaller.getCallApi("getWebhookInfo")).result;
    }

    public sendMessage(
        chat_id: number | string,
        text: string,
        optional?: {
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            entities?: MessageEntity[];
            disable_web_page_preview?: boolean;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}

    public forwardMessage(
        chat_id: number | string,
        message_id: number | string,
        from_chat_id: number | string,
        optional?: {
            message_thread_id?: number;
            disable_notification?: boolean;
            protect_content?: boolean;
        }
    ) {}

    public copyMessage(
        chat_id: number | string,
        message_id: number | string,
        from_chat_id: number | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            caption_entities?: MessageEntity[];
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}

    public sendPhoto(
        chat_id: number | string,
        photo: InputFile | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            has_spoiler?: boolean;
            message_thread_id?: number;
            caption_entities?: MessageEntity[];
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}

    public sendAudio(
        chat_id: number | string,
        audio: InputFile | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            caption_entities?: MessageEntity[];
            duration?: number;
            performer?: string;
            title?: string;
            thumb?: InputFile | string;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    
    public sendDocument(
        chat_id: number | string,
        document: InputFile | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            caption_entities?: MessageEntity[];
            thumb?: InputFile | string;
            disable_content_type_detection?: boolean;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendVideo(
        chat_id: number | string,
        video: InputFile | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            has_spoiler?: boolean;
            caption_entities?: MessageEntity[];
            duration?: number;
            width?: number;
            height?: number;
            thumb?: InputFile | string;
            supports_streaming?: boolean;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendAnimation(
        chat_id: number | string,
        animation: InputFile | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            has_spoiler?: boolean;
            caption_entities?: MessageEntity[];
            duration?: number;
            width?: number;
            height?: number;
            thumb?: InputFile | string;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendVoice(
        chat_id: number | string,
        voice: InputFile | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            caption_entities?: MessageEntity[];
            duration?: number;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendVideoNote(
        chat_id: number | string,
        video_note: InputFile | string,
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            caption_entities?: MessageEntity[];
            duration?: number;
            length?: number;
            thumb?: InputFile | string;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendMediaGroup(
        chat_id: number | string,
        media: InputMediaAudio[] | InputMediaDocument[] | InputMediaPhoto[] | InputMediaVideo[],
        optional?: {
            caption?: string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            caption_entities?: MessageEntity[];
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendLocation(
        latitude: number | string,
        longitude: number | string,
        optional?: {
            horizontal_accuracy?: number;
            live_period?: number;
            heading?: number;
            proximity_alert_radius?: number;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public editMessageLiveLocation(
        latitude: number | string,
        longitude: number | string,
        optional?: {
            chat_id?: number | string;
            inline_message_id?: string;
            horizontal_accuracy?: number;
            heading?: number;
            proximity_alert_radius?: number;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public stopMessageLiveLocation(
        chat_id?: number | string,
        message_id?: number,
        inline_message_id?: string,
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
    ) {}
    public sendVenue(
        chat_id: number | string,
        latitude: number | string,
        longitude: number | string,
        title: string,
        address: string,
        optional?: {
            foursquare_id?: string;
            foursquare_type?: string;
            google_place_id?: string;
            google_place_type?: string;
            message_thread_id?: number;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendContact(
        chat_id: number | string,
        phone_number: string,
        first_name: string,
        optional?: {
            last_name?: string;
            vcard?: number;
            message_thread_id?: number;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendPoll(
        chat_id: number | string,
        question: string,
        options: string[],
        optional?: {
            is_anonymous?: boolean;
            type?: "quiz" | "regular";
            allows_multiple_answers?: boolean;
            correct_option_id?: number;
            explanation?: string;
            explanation_parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_thread_id?: number;
            explanation_entities?: MessageEntity[];
            open_period?: number;
            close_date?: number | Date;
            is_closed?: boolean;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendDice(
        chat_id: number | string,
        optional?: {
            message_thread_id?: number;
            emoji?: string;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public sendChatAction(
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
            message_thread_id?: number;
        }
    ) {}
    public getUserProfilePhotos(
        user_id: number,
        optional?: {
            offset?: number;
            limit?: number;
        }
    ) {}
    public getFile(file_id: string) {}
    public banChatMember(
        chat_id: string | number,
        user_id: number,
        optional?: {
            until_date?: number;
            revoke_messages?: boolean;
        }
    ) {}
    public unbanChatMember(
        chat_id: string | number,
        user_id: number,
        optional?: {
            only_if_banned?: boolean;
        }
    ) {}
    public restrictChatMember(
        chat_id: string | number,
        user_id: number,
        permissions: ChatPermissions,
        optional?: {
            use_independent_chat_permissions?: boolean;
            until_date?: number;
        }
    ) {}
    public promoteChatMember(
        chat_id: string | number,
        user_id: number,
        optional?: {
            is_anonymous?: boolean;
            can_manage_chat?: boolean;
            can_post_messages?: boolean;
            can_edit_messages?: boolean;
            can_delete_messages?: boolean;
            can_manage_video_chats?: boolean;
            can_restrict_members?: boolean;
            can_promote_members?: boolean;
            can_change_info?: boolean;
            can_invite_users?: boolean;
            can_pin_messages?: boolean;
            can_manage_topics?: boolean;
        }
    ) {}
    public setChatAdministratorCustomTitle(chat_id: string | number, user_id: number, custom_title: string) {}
    public banChatSenderChat(chat_id: string | number, sender_chat_id: number) {}
    public unbanChatSenderChat(chat_id: string | number, sender_chat_id: number) {}
    public setChatPermissions(
        chat_id: string | number,
        permissions: ChatPermissions,
        optional?: {
            use_independent_chat_permissions?: boolean;
        }
    ) {}
    public exportChatInviteLink(chat_id: string | number) {}
    public createChatInviteLink(
        chat_id: string | number,
        optional?: {
            name?: string;
            expire_date?: number;
            member_limit?: number;
            creates_join_request?: boolean;
        }
    ) {}
    public editChatInviteLink(
        chat_id: string | number,
        invite_link: string,
        optional?: {
            name?: string;
            expire_date?: number;
            member_limit?: number;
            creates_join_request?: boolean;
        }
    ) {}
    public revokeChatInviteLink(chat_id: string | number, invite_link: string) {}
    public approveChatJoinRequest(chat_id: string | number, user_id: number) {}
    public declineChatJoinRequest(chat_id: string | number, user_id: number) {}
    public setChatPhoto(chat_id: string | number, photo: InputFile) {}
    public deleteChatPhoto(chat_id: string | number) {}
    public setChatTitle(chat_id: string | number, title: string) {}
    public setChatDescription(chat_id: string | number, description: string) {}
    public pinChatMessage(
        chat_id: string | number,
        message_id: number,
        optional?: {
            disable_notifications?: boolean;
        }
    ) {}
    public unpinChatMessage(chat_id: string | number, message_id: number) {}
    public unpinAllChatMessages(chat_id: string | number) {}
    public leaveChat(chat_id: string | number) {}
    public getChat(chat_id: string | number) {}
    public getChatAdministrators(chat_id: string | number) {}
    public getChatMemberCount(chat_id: string | number) {}
    public getChatMember(chat_id: string | number, user_id: number) {}
    public setChatStickerSet(chat_id: string | number, sticker_set_name: string) {}
    public deleteChatStickerSet(chat_id: string | number) {}
    public getForumTopicIconStickers() {}
    public createForumTopic(
        chat_id: string | number,
        name: string,
        optional?: {
            icon_color?: number;
            icon_custom_emoji_id?: string;
        }
    ) {}
    public editForumTopic(
        chat_id: string | number,
        message_thread_id: number,
        optional?: {
            name?: string;
            icon_custom_emoji_id?: string;
        }
    ) {}
    public closeForumTopic(chat_id: string | number, message_thread_id: number) {}
    public reopenForumTopic(chat_id: string | number, message_thread_id: number) {}
    public deleteForumTopic(chat_id: string | number, message_thread_id: number) {}
    public unpinAllForumTopicMessages(chat_id: string | number, message_thread_id: number) {}
    public editGeneralForumTopic(chat_id: string | number, name: string) {}
    public closeGeneralForumTopic(chat_id: string | number) {}
    public reopenGeneralForumTopic(chat_id: string | number) {}
    public hideGeneralForumTopic(chat_id: string | number) {}
    public unhideGeneralForumTopic(chat_id: string | number) {}
    public answerCallbackQuery(
        callback_query_id: string,
        optional?: {
            text?: string;
            show_alert?: boolean;
            url?: string;
            cache_time?: number;
        }
    ) {}
    public setMyCommands(
        commands: BotCommand[],
        optional?: {
            scope?: BotCommandScope;
            language_code?: string;
        }
    ) {}
    public deleteMyCommands(optional?: { scope?: BotCommandScope; language_code?: string }) {}
    public getMyCommands(optional?: { scope?: BotCommandScope; language_code?: string }) {}
    public setChatMenuButton(optional?: { chat_id?: number; menu_button?: MenuButton }) {}
    public getChatMenuButton(chat_id: string | number) {}
    public setMyDefaultAdministratorRights(optional?: { rights?: ChatAdministratorRights; for_channels?: boolean }) {}
    public getMyDefaultAdministratorRights(optional?: { for_channels?: boolean }) {}
    public editMessageText(
        text: string,
        optional?: {
            chat_id?: number | string;
            parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
            message_id?: number;
            inline_message_id?: string;
            entities?: MessageEntity[];
            disable_web_page_preview?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public editMessageCaption(optional?: {
        chat_id?: number | string;
        caption?: string;
        parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
        message_id?: number;
        inline_message_id?: string;
        entities?: MessageEntity[];
        disable_web_page_preview?: boolean;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }) {}
    public editMessageMedia(
        media: InputMedia,
        optional?: {
            chat_id?: number | string;
            message_id?: number;
            inline_message_id?: string;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public editMessageReplyMarkup(optional?: {
        chat_id?: number | string;
        message_id?: number;
        inline_message_id?: string;
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }) {}
    public stopPoll(
        chat_id: number | string,
        message_id: number,
        optional?: {
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public deleteMessage(chat_id: number | string, message_id: number) {}
    public sendSticker(
        chat_id: number | string,
        sticker: InputFile | string,
        optional?: {
            message_thread_id?: number;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public getStickerSet(name: string) {}
    public getCustomEmojiStickers(custom_emoji_ids: string[]) {}
    public uploadStickerFile(user_id: number, png_sticker: InputFile) {}
    public createNewStickerSet(
        user_id: number,
        name: string,
        title: string,
        emojis: string,
        optional?: {
            png_sticker?: InputFile | string;
            tgs_sticker?: InputFile;
            webm_sticker?: InputFile;
            sticker_type?: "regular" | "mask";
            mask_position?: MaskPosition;
        }
    ) {}
    public addStickerToSet(
        user_id: number,
        name: string,
        emojis: string,
        optional?: {
            png_sticker?: InputFile | string;
            tgs_sticker?: InputFile;
            webm_sticker?: InputFile;
            sticker_type?: "regular" | "mask";
            mask_position?: MaskPosition;
        }
    ) {}
    public setStickerPositionInSet(sticker: string, position: number) {}
    public deleteStickerFromSet(sticker: string) {}
    public setStickerSetThumb(
        name: string,
        user_id: number,
        optional?: {
            thumb?: InputFile | string;
        }
    ) {}
    public answerInlineQuery(
        inline_query_id: string,
        results: InlineQueryResult,
        optional?: {
            cache_time?: number;
            is_personal?: boolean;
            next_offset?: string;
            switch_pm_text?: string;
            switch_pm_parameter?: string;
        }
    ) {}
    public answerWebAppQuery(web_app_query_id: string, results: InlineQueryResult) {}
    public sendInvoice(
        chat_id: number | string,
        title: string,
        description: string,
        payload: string,
        provider_token: string,
        currency: string,
        prices: LabeledPrice[],
        optional?: {
            message_thread_id?: number;
            max_tip_amount?: number;
            suggested_tip_amounts?: number[];
            start_parameter?: string;
            provider_data?: string;
            photo_url?: string;
            photo_size?: number;
            photo_width?: number;
            photo_height?: number;
            need_name?: boolean;
            need_phone_number?: boolean;
            need_email?: boolean;
            need_shipping_address?: boolean;
            send_phone_number_to_provider?: boolean;
            send_email_to_provider?: boolean;
            is_flexible?: boolean;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public createInvoiceLink(
        title: string,
        description: string,
        payload: string,
        provider_token: string,
        currency: string,
        prices: LabeledPrice[],
        optional?: {
            max_tip_amount?: number;
            suggested_tip_amounts?: number[];
            start_parameter?: string;
            provider_data?: string;
            photo_url?: string;
            photo_size?: number;
            photo_width?: number;
            photo_height?: number;
            need_name?: boolean;
            need_phone_number?: boolean;
            need_email?: boolean;
            need_shipping_address?: boolean;
            send_phone_number_to_provider?: boolean;
            send_email_to_provider?: boolean;
            is_flexible?: boolean;
        }
    ) {}
    public answerShippingQuery(
        shipping_query_id: string,
        ok: boolean,
        optional?: {
            shipping_options?: ShippingOption[];
            error_message?: string;
        }
    ) {}
    public answerPreCheckoutQuery(
        pre_checkout_query_id: string,
        ok: boolean,
        optional?: {
            error_message?: string;
        }
    ) {}
    public setPassportDataErrors(user_id: number, errors: PassportElementError[]) {}
    public sendGame(
        chat_id: number | string,
        game_short_name: string,
        optional?: {
            message_thread_id?: number;
            disable_notification?: boolean;
            protect_content?: boolean;
            reply_to_message_id?: number;
            allow_sending_without_reply?: boolean;
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        }
    ) {}
    public setGameScore(
        user_id: number,
        score: number,
        optional?: {
            force?: boolean;
            disable_edit_message?: boolean;
            chat_id?: number;
            message_id?: number;
            inline_message_id?: string;
        }
    ) {}
    public getGameHighScores(
        user_id: number,
        optional?: {
            chat_id?: number;
            message_id?: number;
            inline_message_id?: string;
        }
    ) {}
}