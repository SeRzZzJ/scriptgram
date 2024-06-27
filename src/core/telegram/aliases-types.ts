import {
    Chat,
    InlineKeyboardMarkup,
    InputMessageContent,
    MessageEntity,
    User,
    WebAppInfo,
} from "./telegram-types"

export type Id<T> = { id?: T }

export type MessageAlies<T> = { message?: T }

export type MessageId = { message_id?: string | number }

export type MessageThreadId = { message_thread_id?: string | number }

export type Nick = {
    first_name?: string
    last_name?: string
}

export type Username = { username?: string }

export type PhoneNumber = { phone_number?: string }

export type Text = { text?: string }

export type FileInfo = {
    file_id?: string
    file_unique_id?: string
    file_size?: number
}

export type Size = { width?: number; height?: number }

export type FileName = { file_name?: string }

export type MimeType = { mime_type?: string }

export type Thumbnail<T> = { thumbnail?: T }

export type Duration = { duration?: number }

export type Performer = { performer?: string }

export type Title = { title?: string }

export type Length = { length?: number }

export type FullFileInfo = FileInfo & Size

export type Offset = { offset?: string | number }

export type UserAlies = { user?: User }

export type Status = {
    status?:
        | "creator"
        | "administrator"
        | "member"
        | "restricted"
        | "left"
        | "kicked"
}

export type URL = { url?: string }

export type CustomEmojiId = { custom_emoji_id?: string }

export type IconCustomEmojiId = { icon_custom_emoji_id?: string }

export type PhotoAlies<T> = { photo?: T }

export type Description = { description?: string }

export type Type<T> = { type?: T }

export type Caption = { caption?: string; caption_entities?: MessageEntity[] }

export type ParseMode = { parse_mode?: "HTML" | "Markdown" | "MarkdownV2" }

export type Name = { name?: string }

export type Email = { email?: string }

export type From = { from?: User }

export type ChatAlies = { chat?: Chat; date?: number }

export type ChatId = { chat_id?: string | number }

export type Bio = { bio?: string }

export type UserId = { user_id?: number }

export type RequestId = { request_id?: number }

export type Source = { source?: string }

export type FileHash = { file_hash?: string }

export type FileHashes = { file_hashes?: string[] }

export type Address = { address?: string }

export type LocationInfo = { latitude?: number; longitude?: number }

export type LocationInfoAccuracy = {
    horizontal_accuracy?: number
    live_period?: number
    heading?: number
    proximity_alert_radius?: number
} & LocationInfo

export type LocationAlies<T> = { location?: T }

export type LocationCoordinates = {
    foursquare_id?: string
    foursquare_type?: string
    google_place_id?: string
    google_place_type?: string
}

export type Data<T> = { data?: T }

export type Hash = { hash?: string }

export type Vcard = { vcard?: string }

export type ReplyMarkup = { reply_markup?: InlineKeyboardMarkup }

export type InputMessageContentAlies = {
    input_message_content?: InputMessageContent
}

export type ThumbnailMimeType = { thumbnail_mime_type?: string }

export type ThumbnailURL = { thumbnail_url?: string }

export type ThumbnailSize = {
    thumbnail_width?: number
    thumbnail_height?: number
}

export type WebApp = { web_app?: WebAppInfo }

export type StickerAlies = { is_animated?: boolean; is_video?: boolean }

export type Query = { query?: string }

export type InlineMessageId = { inline_message_id?: string }

export type ResultId = { result_id?: string }

export type Media = { media?: string }

export type HasSpoiler = { has_spoiler?: boolean }

export type AllowedUpdateTypes =
    | "message"
    | "edited_message"
    | "channel_post"
    | "edited_channel_post"
    | "inline_query"
    | "chosen_inline_result"
    | "callback_query"
    | "shipping_query"
    | "pre_checkout_query"
    | "poll"
    | "poll_answer"
    | "my_chat_member"
    | "chat_member"
    | "chat_join_request"

export type AllowedUpdatesArray = [
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
    AllowedUpdateTypes?,
]
