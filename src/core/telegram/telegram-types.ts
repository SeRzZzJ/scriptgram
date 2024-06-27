import {
    Id,
    MessageId,
    Offset,
    Size,
    FileInfo,
    Duration,
    Thumbnail,
    FileName,
    MimeType,
    Performer,
    Title,
    Length,
    Username,
    Nick,
    PhoneNumber,
    Text,
    UserAlies,
    CustomEmojiId,
    MessageAlies,
    PhotoAlies,
    Description,
    Caption,
    Type,
    ParseMode,
    MessageThreadId,
    Name,
    Email,
    From,
    ChatAlies,
    Bio,
    ChatId,
    UserId,
    RequestId,
    Source,
    FileHash,
    FileHashes,
    LocationInfoAccuracy,
    Address,
    LocationInfo,
    LocationAlies,
    URL,
    Data,
    Hash,
    Vcard,
    ReplyMarkup,
    InputMessageContentAlies,
    ThumbnailURL,
    ThumbnailSize,
    ThumbnailMimeType,
    LocationCoordinates,
    IconCustomEmojiId,
    WebApp,
    StickerAlies,
    Query,
    ResultId,
    InlineMessageId,
    Media,
    HasSpoiler,
    Status,
    AllowedUpdatesArray,
} from "./aliases-types"

export interface Update extends MessageAlies<Message> {
    update_id?: number
    edited_message?: Message
    channel_post?: Message
    edited_channel_post?: Message
    inline_query?: InlineQuery
    chosen_inline_result?: ChosenInlineResult
    callback_query?: CallbackQuery
    shipping_query?: ShippingQuery
    pre_checkout_query?: PreCheckoutQuery
    poll?: Poll
    poll_answer?: PollAnswer
    my_chat_member?: ChatMemberUpdated
    chat_member?: ChatMemberUpdated
    chat_join_request?: ChatJoinRequest
}

export interface WebhookInfo extends URL {
    has_custom_certificate: boolean
    pending_update_count: number
    ip_address?: string
    last_error_date?: number
    last_error_message?: string
    last_synchronization_error_date?: number
    max_connections?: number
    allowed_updates?: AllowedUpdatesArray
}

export interface User extends Id<number>, Username, Nick {
    is_bot?: boolean
    language_code?: string
    is_premium?: boolean
    added_to_attachment_menu?: boolean
    can_join_groups?: boolean
    can_read_all_group_messages?: boolean
    supports_inline_queries?: boolean
}

export interface Chat
    extends Id<number>,
        Username,
        Nick,
        Title,
        PhotoAlies<ChatPhoto>,
        Description,
        Type<"private" | "group" | "supergroup" | "channel">,
        Bio,
        LocationAlies<ChatLocation> {
    is_forum?: boolean
    active_usernames?: string[]
    emoji_status_custom_emoji_id?: string
    has_private_forwards?: boolean
    has_restricted_voice_and_video_messages?: boolean
    join_to_send_messages?: boolean
    join_by_request?: boolean
    invite_link?: string
    pinned_message?: Message
    permissions?: ChatPermissions
    slow_mode_delay?: number
    message_auto_delete_time?: number
    has_aggressive_anti_spam_enabled?: boolean
    has_hidden_members?: boolean
    has_protected_content?: boolean
    sticker_set_name?: string
    can_set_sticker_set?: boolean
    linked_chat_id?: number
}

export interface Message
    extends MessageId,
        PhotoAlies<PhotoSize[]>,
        Caption,
        MessageThreadId,
        From,
        ChatAlies,
        Text,
        LocationAlies<Location>,
        ReplyMarkup {
    sender_chat?: Chat
    forward_from?: User
    forward_from_chat?: Chat
    forward_from_message_id?: number
    forward_signature?: string
    forward_sender_name?: string
    forward_date?: number
    is_topic_message?: boolean
    is_automatic_forward?: boolean
    reply_to_message?: Message
    via_bot?: User
    edit_date?: number
    has_protected_content?: boolean
    media_group_id?: string
    author_signature?: string
    entities?: MessageEntity[]
    animation?: Animation
    audio?: Audio
    document?: Document
    sticker?: Sticker
    video?: Video
    video_note?: VideoNote
    voice?: Voice
    has_media_spoiler?: boolean
    contact?: Contact
    dice?: Dice
    game?: Game
    poll?: Poll
    venue?: Venue
    new_chat_members?: User[]
    left_chat_member?: User
    new_chat_title?: string
    new_chat_photo?: PhotoSize[]
    delete_chat_photo?: boolean
    group_chat_created?: boolean
    supergroup_chat_created?: boolean
    channel_chat_created?: boolean
    message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged
    migrate_to_chat_id?: number
    migrate_from_chat_id?: number
    pinned_message?: Message
    invoice?: Invoice
    successful_payment?: SuccessfulPayment
    user_shared?: UserShared
    chat_shared?: ChatShared
    connected_website?: string
    write_access_allowed?: WriteAccessAllowed
    passport_data?: PassportData
    proximity_alert_triggered?: ProximityAlertTriggered
    forum_topic_created?: ForumTopicCreated
    forum_topic_edited?: ForumTopicEdited
    forum_topic_closed?: ForumTopicClosed
    forum_topic_reopened?: ForumTopicReopened
    general_forum_topic_hidden?: GeneralForumTopicHidden
    general_forum_topic_unhidden?: GeneralForumTopicUnhidden
    video_chat_scheduled?: VideoChatScheduled
    video_chat_started?: VideoChatStarted
    video_chat_ended?: VideoChatEnded
    video_chat_participants_invited?: VideoChatParticipantsInvited
    web_app_data?: WebAppData
}

export interface MessageEntity
    extends Offset,
        Length,
        UserAlies,
        URL,
        CustomEmojiId,
        Type<
            | "mention"
            | "hashtag"
            | "cashtag"
            | "bot_command"
            | "url"
            | "email"
            | "phone_number"
            | "bold"
            | "italic"
            | "underline"
            | "strikethrough"
            | "spoiler"
            | "code"
            | "pre"
            | "text_link"
            | "text_mention"
            | "custom_emoji"
        > {
    language?: string
}

export interface PhotoSize extends FileInfo {}

export interface Animation
    extends FileInfo,
        Size,
        Duration,
        Thumbnail<PhotoSize>,
        FileName,
        MimeType {}

export interface Audio
    extends FileInfo,
        Duration,
        Performer,
        Title,
        Thumbnail<PhotoSize>,
        FileName,
        MimeType {}

export interface Document
    extends FileInfo,
        Thumbnail<PhotoSize>,
        FileName,
        MimeType {}

export interface Video
    extends FileInfo,
        Size,
        Duration,
        Thumbnail<PhotoSize>,
        FileName,
        MimeType {}

export interface VideoNote
    extends FileInfo,
        Duration,
        Thumbnail<PhotoSize>,
        Length {}

export interface Voice extends FileInfo, Duration, MimeType {}

export interface Contact extends PhoneNumber, Nick, UserId, Vcard {}

export interface Dice {
    emoji?: string
    value?: number
}

export interface PollOption extends Text {
    voter_count?: number
}

export interface PollAnswer extends UserAlies {
    poll_id?: string
    option_ids?: number[]
}

export interface Poll extends Id<string>, Type<"regular" | "quiz"> {
    question?: string
    options?: PollOption[]
    total_voter_count?: number
    is_closed?: boolean
    is_anonymous?: boolean
    allows_multiple_answers?: boolean
    correct_option_id?: number
    explanation?: string
    explanation_entities?: MessageEntity[]
    open_period?: number
    close_date?: number
}

export interface Location extends LocationInfoAccuracy {}

export interface Venue
    extends Title,
        LocationAlies<Location>,
        Address,
        LocationCoordinates {}

export interface WebAppData extends Data<string> {
    button_text?: string
}

export interface ProximityAlertTriggered {
    traveler?: User
    watcher?: User
    distance?: number
}

export interface MessageAutoDeleteTimerChanged {
    message_auto_delete_time?: number
}

export interface ForumTopicCreated extends Name, IconCustomEmojiId {
    icon_color?: number
}

export interface ForumTopicClosed {}

export interface ForumTopicEdited extends Name, IconCustomEmojiId {}

export interface ForumTopicReopened {}

export interface GeneralForumTopicHidden {}

export interface GeneralForumTopicUnhidden {}

export interface UserShared extends UserId, RequestId {}

export interface ChatShared extends ChatId, RequestId {}

export interface WriteAccessAllowed {}

export interface VideoChatScheduled {
    start_date?: number
}

export interface VideoChatStarted {}

export interface VideoChatEnded extends Duration {}

export interface VideoChatParticipantsInvited {
    users?: User[]
}

export interface UserProfilePhotos {
    total_count?: number
    photos?: PhotoSize[][]
}

export interface File extends FileInfo {
    file_path?: string
}

export interface WebAppInfo extends URL {}

export interface ReplyKeyboardMarkup {
    keyboard?: KeyboardButton[][]
    is_persistent?: boolean
    resize_keyboard?: boolean
    one_time_keyboard?: boolean
    input_field_placeholder?: string
    selective?: boolean
}

export interface KeyboardButton extends Text, WebApp {
    request_user?: KeyboardButtonRequestUser
    request_chat?: KeyboardButtonRequestChat
    request_contact?: boolean
    request_location?: boolean
    request_poll?: KeyboardButtonPollType
}

export interface KeyboardButtonRequestUser extends RequestId {
    user_is_bot?: boolean
    user_is_premium?: boolean
}

export interface KeyboardButtonRequestChat extends RequestId {
    chat_is_channel?: boolean
    chat_is_forum?: boolean
    chat_has_username?: boolean
    chat_is_created?: boolean
    user_administrator_rights?: ChatAdministratorRights
    bot_administrator_rights?: ChatAdministratorRights
    bot_is_member?: boolean
}

export interface KeyboardButtonPollType extends Type<"regular" | "quiz"> {}
export interface ReplyKeyboardRemove {
    remove_keyboard?: boolean
    selective?: boolean
}

export interface InlineKeyboardMarkup {
    inline_keyboard?: InlineKeyboardButton[][]
}

export interface InlineKeyboardButton extends Text, URL, WebApp {
    callback_data?: string
    login_url?: LoginUrl
    switch_inline_query?: string
    pay?: boolean
}

export interface LoginUrl extends URL {
    forward_text?: string
    bot_username?: string
    request_write_access?: boolean
}

export interface CallbackQuery
    extends Id<string>,
        MessageAlies<Message>,
        From,
        Data<string> {
    inline_message_id?: string
    chat_instance?: string
    game_short_name?: string
}

export interface ForceReply {
    force_reply?: boolean
    input_field_placeholder?: string
    selective?: boolean
}

export interface ChatPhoto {
    small_file_id?: string
    small_file_unique_id?: string
    big_file_id?: string
    big_file_unique_id?: string
}

export interface ChatInviteLink extends Name {
    invite_link?: string
    creator?: User
    creates_join_request?: boolean
    is_primary?: boolean
    is_revoked?: boolean
    expire_date?: number
    member_limit?: number
    pending_join_request_count?: number
}

export interface ChatAdministratorRights {
    is_anonymous?: boolean
    can_manage_chat?: boolean
    can_delete_messages?: boolean
    can_manage_video_chats?: boolean
    can_restrict_members?: boolean
    can_promote_members?: boolean
    can_change_info?: boolean
    can_invite_users?: boolean
    can_post_messages?: boolean
    can_edit_messages?: boolean
    can_pin_messages?: boolean
    can_manage_topics?: boolean
}

export type ChatMember =
    | ChatMemberOwner
    | ChatMemberAdministrator
    | ChatMemberMember
    | ChatMemberRestricted
    | ChatMemberLeft
    | ChatMemberBanned

export interface ChatMemberOwner extends UserAlies, Status {
    is_anonymous?: boolean
    custom_title?: string
}

export interface ChatMemberAdministrator extends UserAlies, Status {
    can_be_edited?: boolean
    is_anonymous?: boolean
    can_manage_chat?: boolean
    can_delete_messages?: boolean
    can_manage_video_chats?: boolean
    can_restrict_members?: boolean
    can_promote_members?: boolean
    can_change_info?: boolean
    can_invite_users?: boolean
    can_post_messages?: boolean
    can_edit_messages?: boolean
    can_pin_messages?: boolean
    can_manage_topics?: boolean
    custom_title?: string
}

export interface ChatMemberMember extends UserAlies, Status {}

export interface ChatMemberRestricted extends UserAlies, Status {
    is_member?: boolean
    can_send_messages?: boolean
    can_send_audios?: boolean
    can_send_documents?: boolean
    can_send_photos?: boolean
    can_send_videos?: boolean
    can_send_video_notes?: boolean
    can_send_voice_notes?: boolean
    can_send_polls?: boolean
    can_send_other_messages?: boolean
    can_add_web_page_previews?: boolean
    can_change_info?: boolean
    can_invite_users?: boolean
    can_pin_messages?: boolean
    can_manage_topics?: boolean
    until_date?: number
}

export interface ChatMemberLeft extends UserAlies, Status {}

export interface ChatMemberBanned extends UserAlies, Status {
    until_date?: number
}

export interface ChatMemberUpdated extends From, ChatAlies {
    old_chat_member?: ChatMember
    new_chat_member?: ChatMember
    invite_link?: ChatInviteLink
}

export interface ChatJoinRequest extends From, ChatAlies, Bio {
    user_chat_id?: number
    invite_link?: ChatInviteLink
}

export interface ChatPermissions {
    can_send_messages?: boolean
    can_send_audios?: boolean
    can_send_documents?: boolean
    can_send_photos?: boolean
    can_send_videos?: boolean
    can_send_video_notes?: boolean
    can_send_voice_notes?: boolean
    can_send_polls?: boolean
    can_send_other_messages?: boolean
    can_add_web_page_previews?: boolean
    can_change_info?: boolean
    can_invite_users?: boolean
    can_pin_messages?: boolean
    can_manage_topics?: boolean
}

export interface ChatLocation extends LocationAlies<Location>, Address {}

export interface ForumTopic extends MessageThreadId, Name, IconCustomEmojiId {
    icon_color?: number
}

export interface BotCommand extends Description {
    command?: string
}

export type BotCommandScope =
    | BotCommandScopeDefault
    | BotCommandScopeAllPrivateChats
    | BotCommandScopeAllGroupChats
    | BotCommandScopeAllChatAdministrators
    | BotCommandScopeChat
    | BotCommandScopeChatAdministrators
    | BotCommandScopeChatMember

export interface BotCommandScopeDefault extends Type<string> {}

export interface BotCommandScopeAllPrivateChats extends Type<string> {}

export interface BotCommandScopeAllGroupChats extends Type<string> {}

export interface BotCommandScopeAllChatAdministrators extends Type<string> {}

export interface BotCommandScopeChat extends Type<string>, ChatId {}

export interface BotCommandScopeChatAdministrators
    extends Type<string>,
        ChatId {}

export interface BotCommandScopeChatMember
    extends Type<string>,
        ChatId,
        UserId {}

export type MenuButton =
    | MenuButtonCommands
    | MenuButtonWebApp
    | MenuButtonDefault

export interface MenuButtonCommands extends Type<string> {}

export interface MenuButtonWebApp extends Type<string>, Text, WebApp {}

export interface MenuButtonDefault extends Type<string> {}

export interface ResponseParameters extends Type<string> {
    migrate_to_chat_id?: number
    retry_after?: number
}

export type InputMedia =
    | InputMediaPhoto
    | InputMediaVideo
    | InputMediaAnimation
    | InputMediaAudio
    | InputMediaDocument

export interface InputMediaPhoto
    extends Caption,
        Type<string>,
        ParseMode,
        Media,
        HasSpoiler {}

export interface InputMediaVideo
    extends Caption,
        Type<string>,
        ParseMode,
        Media,
        Size,
        Thumbnail<InputFile | string>,
        Duration,
        HasSpoiler {
    supports_streaming?: boolean
}

export interface InputMediaAnimation
    extends Caption,
        Type<string>,
        ParseMode,
        Media,
        Size,
        Thumbnail<InputFile | string>,
        Duration,
        HasSpoiler {}

export interface InputMediaAudio
    extends Caption,
        Title,
        Type<string>,
        ParseMode,
        Thumbnail<InputFile | string>,
        Duration,
        Performer,
        Media {}

export interface InputMediaDocument
    extends Caption,
        Type<string>,
        ParseMode,
        Thumbnail<InputFile | string>,
        Media {
    disable_content_type_detection?: boolean
}

export interface InputFile extends URL, Name {
    path?: string
    file_id?: string
}

export interface Sticker
    extends CustomEmojiId,
        Type<string>,
        Thumbnail<PhotoSize>,
        FileInfo,
        Size,
        StickerAlies {
    emoji?: string
    set_name?: string
    premium_animation?: File
    mask_position?: MaskPosition
}

export interface StickerSet
    extends Title,
        Name,
        Thumbnail<PhotoSize>,
        StickerAlies {
    sticker_type?: string
    stickers?: Sticker[]
}

export interface MaskPosition {
    point?: string
    x_shift?: number
    y_shift?: number
    scale?: number
}

export interface InlineQuery
    extends Offset,
        Id<string>,
        From,
        LocationAlies<Location>,
        Query {
    chat_type?: string
}

export type InlineQueryResult =
    | InlineQueryResultArticle
    | InlineQueryResultAudio
    | InlineQueryResultCachedAudio
    | InlineQueryResultCachedDocument
    | InlineQueryResultCachedGif
    | InlineQueryResultCachedMpeg4Gif
    | InlineQueryResultCachedPhoto
    | InlineQueryResultCachedSticker
    | InlineQueryResultCachedVideo
    | InlineQueryResultCachedVoice
    | InlineQueryResultContact
    | InlineQueryResultDocument
    | InlineQueryResultGame
    | InlineQueryResultGif
    | InlineQueryResultLocation
    | InlineQueryResultMpeg4Gif
    | InlineQueryResultPhoto
    | InlineQueryResultVenue
    | InlineQueryResultVideo
    | InlineQueryResultVoice

export interface InlineQueryResultCachedAudio
    extends Caption,
        Id<string>,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    audio_file_id?: string
}

export interface InlineQueryResultCachedDocument
    extends Description,
        Id<string>,
        Title,
        Caption,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    document_file_id?: string
}

export interface InlineQueryResultCachedGif
    extends Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    gif_file_id?: string
}

export interface InlineQueryResultCachedMpeg4Gif
    extends Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    mpeg4_file_id?: string
}

export interface InlineQueryResultCachedPhoto
    extends Description,
        Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    photo_file_id?: string
}

export interface InlineQueryResultCachedSticker
    extends Id<string>,
        Type<string>,
        ReplyMarkup,
        InputMessageContentAlies {
    sticker_file_id?: string
}

export interface InlineQueryResultCachedVideo
    extends Description,
        Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    video_file_id?: string
}

export interface InlineQueryResultCachedVoice
    extends Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    voice_file_id?: string
}

export interface InlineQueryResultArticle
    extends URL,
        Description,
        Id<string>,
        Title,
        Type<string>,
        ReplyMarkup,
        InputMessageContentAlies,
        ThumbnailURL,
        ThumbnailSize {
    hide_url?: boolean
}

export interface InlineQueryResultAudio
    extends Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    audio_url?: string
    performer?: string
    audio_duration?: number
}

export interface InlineQueryResultContact
    extends Id<string>,
        Type<string>,
        PhoneNumber,
        Nick,
        Vcard,
        ReplyMarkup,
        InputMessageContentAlies,
        ThumbnailURL,
        ThumbnailSize {}

export interface InlineQueryResultGame
    extends Id<string>,
        Type<string>,
        ReplyMarkup {
    game_short_name?: string
}

export interface InlineQueryResultDocument
    extends Description,
        Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies,
        MimeType,
        ThumbnailURL,
        ThumbnailSize {
    document_url?: string
}

export interface InlineQueryResultGif
    extends Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies,
        ThumbnailURL,
        ThumbnailSize {
    gif_url?: string
    gif_width?: number
    gif_height?: number
    gif_duration?: number
}

export interface InlineQueryResultLocation
    extends Id<string>,
        Title,
        Type<string>,
        LocationInfoAccuracy,
        ReplyMarkup,
        InputMessageContentAlies,
        ThumbnailURL,
        ThumbnailSize {}

export interface InlineQueryResultMpeg4Gif
    extends Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies,
        ThumbnailURL,
        ThumbnailMimeType {
    mpeg4_url?: string
    mpeg4_width?: number
    mpeg4_height?: number
    mpeg4_duration?: number
}

export interface InlineQueryResultPhoto
    extends Description,
        Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies,
        ThumbnailURL {
    photo_url?: string
    photo_width?: number
    photo_height?: number
}

export interface InlineQueryResultVenue
    extends Id<string>,
        Title,
        Type<string>,
        ReplyMarkup,
        InputMessageContentAlies,
        ThumbnailURL,
        ThumbnailSize,
        Address,
        LocationInfo,
        LocationCoordinates {}

export interface InlineQueryResultVideo
    extends Description,
        Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies,
        MimeType,
        ThumbnailURL {
    video_url?: string
    video_width?: number
    video_height?: number
    video_duration?: number
}

export interface InlineQueryResultVoice
    extends Caption,
        Id<string>,
        Title,
        Type<string>,
        ParseMode,
        ReplyMarkup,
        InputMessageContentAlies {
    voice_url?: string
    voice_duration?: number
}

export interface InputTextMessageContent extends ParseMode {
    message_text?: string
    entities?: MessageEntity[]
    disable_web_page_preview?: boolean
}

export interface InputLocationMessageContent extends LocationInfoAccuracy {}

export interface InputVenueMessageContent
    extends Title,
        Address,
        LocationInfo,
        LocationCoordinates {}

export interface InputContactMessageContent extends PhoneNumber, Nick, Vcard {}

export interface InputInvoiceMessageContent extends Description, Title {
    payload?: string
    provider_token?: string
    currency?: string
    prices?: LabeledPrice[]
    max_tip_amount?: number
    suggested_tip_amounts?: number[]
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

export interface InputMessageContent
    extends From,
        LocationAlies<Location>,
        Query,
        ResultId,
        InlineMessageId {}

export interface ChosenInlineResult
    extends From,
        LocationAlies<Location>,
        Query,
        ResultId,
        InlineMessageId {}

export interface SentWebAppMessage extends InlineMessageId {}

export interface LabeledPrice {
    label?: string
    amount?: number
}

export interface Invoice extends Description, Title {
    start_parameter?: string
    currency?: string
    total_amount?: number
}

export interface ShippingAddress {
    country_code?: string
    state?: string
    city?: string
    street_line1?: string
    street_line2?: string
    post_code?: string
}

export interface OrderInfo extends Name, PhoneNumber, Email {
    shipping_address?: ShippingAddress
}

export interface ShippingOption extends Id<string>, Title {
    prices?: LabeledPrice[]
}

export interface SuccessfulPayment {
    currency?: string
    total_amount?: number
    invoice_payload?: string
    shipping_option_id?: string
    order_info?: OrderInfo
    telegram_payment_charge_id?: string
    provider_payment_charge_id?: string
}

export interface ShippingQuery extends Id<string>, From {
    invoice_payload?: string
    shipping_address?: ShippingAddress
}

export interface PreCheckoutQuery extends Id<string>, From {
    currency?: string
    total_amount?: number
    invoice_payload?: string
    shipping_option_id?: string
    order_info?: OrderInfo
}

export interface PassportData extends Data<EncryptedPassportElement[]> {
    credentials?: EncryptedCredentials
}

export interface PassportFile extends FileInfo {
    file_date?: number
}

export interface EncryptedPassportElement
    extends Type<string>,
        PhoneNumber,
        Email,
        Data<string>,
        Hash {
    files?: PassportFile[]
    front_side?: PassportFile
    reverse_side?: PassportFile
    selfie?: PassportFile
    translation?: PassportFile[]
}

export interface EncryptedCredentials extends Data<string>, Hash {
    secret?: string
}

export interface PassportElementError {}
export interface PassportElementErrorDataField
    extends MessageAlies<string>,
        Type<string>,
        Source {
    field_name?: string
    data_hash?: string
}

export interface PassportElementErrorFrontSide
    extends MessageAlies<string>,
        Type<string>,
        Source,
        FileHash {}

export interface PassportElementErrorReverseSide
    extends MessageAlies<string>,
        Type<string>,
        Source,
        FileHash {}

export interface PassportElementErrorSelfie
    extends MessageAlies<string>,
        Type<string>,
        Source,
        FileHash {}

export interface PassportElementErrorFile
    extends MessageAlies<string>,
        Type<string>,
        Source,
        FileHash {}

export interface PassportElementErrorFiles
    extends MessageAlies<string>,
        Type<string>,
        Source,
        FileHashes {}

export interface PassportElementErrorTranslationFile
    extends MessageAlies<string>,
        Type<string>,
        Source,
        FileHash {}

export interface PassportElementErrorTranslationFiles
    extends MessageAlies<string>,
        Type<string>,
        Source,
        FileHashes {}

export interface PassportElementErrorUnspecified
    extends MessageAlies<string>,
        Type<string>,
        Source {
    element_hash?: string
}

export interface Game
    extends Title,
        Text,
        PhotoAlies<PhotoSize[]>,
        Description {
    text_entities?: MessageEntity[]
    animation?: Animation
}

export interface CallbackGame {}

export interface GameHighScore extends UserAlies {
    position?: number
    score?: number
}

export interface BotDescription extends Description {}

export interface BotShortDescription {
    short_description?: string
}
