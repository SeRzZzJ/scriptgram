export interface UpdateScheme {
    update_id?: number;
    message?: Message;
    edited_message?: Message;
    channel_post?: Message;
    edited_channel_post?: Message;
    inline_query?: InlineQuery;
    chosen_inline_result?: ChosenInlineResult;
    callback_query?: CallbackQuery;
    shipping_query?: ShippingQuery;
    pre_checkout_query?: PreCheckoutQuery;
    poll?: Poll;
    poll_answer?: PollAnswer;
    my_chat_member?: ChatMemberUpdated;
    chat_member?: ChatMemberUpdated;
    chat_join_request?: ChatJoinRequest;
}
export interface Update {
    update_id?: number;
}
export interface User {
    id?: string | number;
    is_bot?: boolean;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
    can_join_groups?: boolean;
    can_read_all_group_messages?: boolean;
    supports_inline_queries?: boolean;
}
export interface Chat {
    id?: string | number;
    type?: "private" | "group" | "supergroup" | "channel";
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_forum?: boolean;
    photo?: ChatPhoto;
    active_usernames?: string[];
    emoji_status_custom_emoji_id?: string;
    bio?: string;
    has_private_forwards?: boolean;
    has_restricted_voice_and_video_messages?: boolean;
    join_to_send_messages?: boolean;
    join_by_request?: boolean;
    description?: string;
    invite_link?: string;
    pinned_message?: Message;
    permissions?: ChatPermissions;
    slow_mode_delay?: number;
    message_auto_delete_time?: number;
    has_aggressive_anti_spam_enabled?: boolean;
    has_hidden_members?: boolean;
    has_protected_content?: boolean;
    sticker_set_name?: string;
    can_set_sticker_set?: boolean;
    linked_chat_id?: number;
    location?: ChatLocation;
}
export interface Message extends Update {
    message_id?: string | number;
    message_thread_id?: string | number;
    from?: User;
    sender_chat?: Chat;
    date?: number;
    chat?: Chat;
    forward_from?: User;
    forward_from_chat?: Chat;
    forward_from_message_id?: number;
    forward_signature?: string;
    forward_sender_name?: string;
    forward_date?: number;
    is_topic_message?: boolean;
    is_automatic_forward?: boolean;
    reply_to_message?: Message;
    via_bot?: User;
    edit_date?: number;
    has_protected_content?: boolean;
    media_group_id?: string;
    author_signature?: string;
    text?: string;
    entities?: MessageEntity[];
    animation?: Animation;
    audio?: Audio;
    document?: Document;
    photo?: PhotoSize[];
    sticker?: Sticker;
    video?: Video;
    video_note?: VideoNote;
    voice?: Voice;
    caption?: string;
    caption_entities?: MessageEntity[];
    has_media_spoiler?: boolean;
    contact?: Contact;
    dice?: Dice;
    game?: Game;
    poll?: Poll;
    venue?: Venue;
    location?: Location;
    new_chat_members?: User[];
    left_chat_member?: User;
    new_chat_title?: string;
    new_chat_photo?: PhotoSize[];
    delete_chat_photo?: boolean;
    group_chat_created?: boolean;
    supergroup_chat_created?: boolean;
    channel_chat_created?: boolean;
    message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged;
    migrate_to_chat_id?: number;
    migrate_from_chat_id?: number;
    pinned_message?: Message;
    invoice?: Invoice;
    successful_payment?: SuccessfulPayment;
    user_shared?: UserShared;
    chat_shared?: ChatShared;
    connected_website?: string;
    write_access_allowed?: WriteAccessAllowed;
    passport_data?: PassportData;
    proximity_alert_triggered?: ProximityAlertTriggered;
    forum_topic_created?: ForumTopicCreated;
    forum_topic_edited?: ForumTopicEdited;
    forum_topic_closed?: ForumTopicClosed;
    forum_topic_reopened?: ForumTopicReopened;
    general_forum_topic_hidden?: GeneralForumTopicHidden;
    general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
    video_chat_scheduled?: VideoChatScheduled;
    video_chat_started?: VideoChatStarted;
    video_chat_ended?: VideoChatEnded;
    video_chat_participants_invited?: VideoChatParticipantsInvited;
    web_app_data?: WebAppData;
    reply_markup?: InlineKeyboardMarkup;
}
export interface MessageId {
    message_id?: string | number;
}
export interface MessageEntity {
    type?:
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
        | "custom_emoji";
    offset?: number;
    length?: number;
    url?: string;
    user?: User;
    language?: string;
    custom_emoji_id?: string;
}
export interface PhotoSize {
    file_id?: string;
    file_unique_id?: string;
    width?: number;
    height?: number;
    file_size?: number;
}
export interface Animation {
    file_id?: string;
    file_unique_id?: string;
    width?: number;
    height?: number;
    duration?: number;
    thumb?: PhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
export interface Audio {
    file_id?: string;
    file_unique_id?: string;
    duration?: number;
    performer?: string;
    title?: string;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
    thumb?: PhotoSize;
}
export interface Document {
    file_id?: string;
    file_unique_id?: string;
    thumb?: PhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
export interface Video {
    file_id?: string;
    file_unique_id?: string;
    width?: number;
    height?: number;
    duration?: number;
    thumb?: PhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
export interface VideoNote {
    file_id?: string;
    file_unique_id?: string;
    length?: number;
    duration?: number;
    thumb?: PhotoSize;
    file_size?: number;
}
export interface Voice {
    file_id?: string;
    file_unique_id?: string;
    duration?: number;
    mime_type?: string;
    file_size?: number;
}
export interface Contact {
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    user_id?: number;
    vcard?: string;
}
export interface Dice {
    emoji?: string;
    value?: number;
}
export interface PollOption {
    text?: string;
    voter_count?: number;
}
export interface PollAnswer extends Update {
    poll_id?: string;
    user?: User;
    option_ids?: number[];
}
export interface Poll extends Update {
    id?: string;
    question?: string;
    options?: PollOption[];
    total_voter_count?: number;
    is_closed?: boolean;
    is_anonymous?: boolean;
    type?: "regular" | "quiz";
    allows_multiple_answers?: boolean;
    correct_option_id?: number;
    explanation?: string;
    explanation_entities?: MessageEntity[];
    open_period?: number;
    close_date?: number;
}
export interface Location {
    longitude?: number;
    latitude?: number;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
}
export interface Venue {
    location?: Location;
    title?: string;
    address?: string;
    foursquare_id?: string;
    foursquare_type?: string;
    google_place_id?: string;
    google_place_type?: string;
}
export interface WebAppData {
    data?: string;
    button_text?: string;
}
export interface ProximityAlertTriggered {
    traveler?: User;
    watcher?: User;
    distance?: number;
}
export interface MessageAutoDeleteTimerChanged {
    message_auto_delete_time?: number;
}
export interface ForumTopicCreated {
    name?: string;
    icon_color?: number;
    icon_custom_emoji_id?: string;
}
export interface ForumTopicClosed {}
export interface ForumTopicEdited {
    name?: string;
    icon_custom_emoji_id?: string;
}
export interface ForumTopicReopened {}
export interface GeneralForumTopicHidden {}
export interface GeneralForumTopicUnhidden {}
export interface UserShared {
    request_id?: number;
    user_id?: number;
}
export interface ChatShared {
    request_id?: number;
    chat_id?: number;
}
export interface WriteAccessAllowed {}
export interface VideoChatScheduled {
    start_date?: number;
}
export interface VideoChatStarted {}
export interface VideoChatEnded {
    duration?: number;
}
export interface VideoChatParticipantsInvited {
    users?: User[];
}
export interface UserProfilePhotos {
    total_count?: number;
    photos?: PhotoSize[][];
}
export interface File {
    file_id?: string;
    file_unique_id?: string;
    file_size?: number;
    file_path?: string;
}
export interface WebAppInfo {
    url?: string;
}
export interface ReplyKeyboardMarkup {
    keyboard?: KeyboardButton[][];
    is_persistent?: boolean;
    resize_keyboard?: boolean;
    one_time_keyboard?: boolean;
    input_field_placeholder?: string;
    selective?: boolean;
}
export interface KeyboardButton {
    text?: string;
    request_user?: KeyboardButtonRequestUser;
    request_chat?: KeyboardButtonRequestChat;
    request_contact?: boolean;
    request_location?: boolean;
    request_poll?: KeyboardButtonPollType;
    web_app?: WebAppInfo;
}
export interface KeyboardButtonRequestUser {
    request_id?: number;
    user_is_bot?: boolean;
    user_is_premium?: boolean;
}
export interface KeyboardButtonRequestChat {
    request_id?: number;
    chat_is_channel?: boolean;
    chat_is_forum?: boolean;
    chat_has_username?: boolean;
    chat_is_created?: boolean;
    user_administrator_rights?: ChatAdministratorRights;
    bot_administrator_rights?: ChatAdministratorRights;
    bot_is_member?: boolean;
}
export interface KeyboardButtonPollType {
    type?: "regular" | "quiz";
}
export interface ReplyKeyboardRemove {
    remove_keyboard?: boolean;
    selective?: boolean;
}
export interface InlineKeyboardMarkup {
    inline_keyboard?: InlineKeyboardButton[][];
}
export interface InlineKeyboardButton {
    text?: string;
    url?: string;
    callback_data?: string;
    web_app?: WebAppInfo;
    login_url?: LoginUrl;
    switch_inline_query?: string;
    pay?: boolean;
}
export interface LoginUrl {
    url?: string;
    forward_text?: string;
    bot_username?: string;
    request_write_access?: boolean;
}
export interface CallbackQuery extends Update {
    id?: string;
    from?: User;
    message?: Message;
    inline_message_id?: string;
    chat_instance?: string;
    data?: string;
    game_short_name?: string;
}
export interface ForceReply {
    force_reply?: boolean;
    input_field_placeholder?: string;
    selective?: boolean;
}
export interface ChatPhoto {
    small_file_id?: string;
    small_file_unique_id?: string;
    big_file_id?: string;
    big_file_unique_id?: string;
}
export interface ChatInviteLink {
    invite_link?: string;
    creator?: User;
    creates_join_request?: boolean;
    is_primary?: boolean;
    is_revoked?: boolean;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    pending_join_request_count?: number;
}
export interface ChatAdministratorRights {
    is_anonymous?: boolean;
    can_manage_chat?: boolean;
    can_delete_messages?: boolean;
    can_manage_video_chats?: boolean;
    can_restrict_members?: boolean;
    can_promote_members?: boolean;
    can_change_info?: boolean;
    can_invite_users?: boolean;
    can_post_messages?: boolean;
    can_edit_messages?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
}
export interface ChatMember {}
export interface ChatMemberOwner {
    status?: string;
    user?: User;
    is_anonymous?: boolean;
    custom_title?: string;
}
export interface ChatMemberAdministrator {
    status?: string;
    user?: User;
    can_be_edited?: boolean;
    is_anonymous?: boolean;
    can_manage_chat?: boolean;
    can_delete_messages?: boolean;
    can_manage_video_chats?: boolean;
    can_restrict_members?: boolean;
    can_promote_members?: boolean;
    can_change_info?: boolean;
    can_invite_users?: boolean;
    can_post_messages?: boolean;
    can_edit_messages?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
    custom_title?: string;
}
export interface ChatMemberMember {
    status?: string;
    user?: User;
}
export interface ChatMemberRestricted {
    status?: string;
    user?: User;
    is_member?: boolean;
    can_send_messages?: boolean;
    can_send_audios?: boolean;
    can_send_documents?: boolean;
    can_send_photos?: boolean;
    can_send_videos?: boolean;
    can_send_video_notes?: boolean;
    can_send_voice_notes?: boolean;
    can_send_polls?: boolean;
    can_send_other_messages?: boolean;
    can_add_web_page_previews?: boolean;
    can_change_info?: boolean;
    can_invite_users?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
    until_date?: number;
}
export interface ChatMemberLeft {
    status?: string;
    user?: User;
}
export interface ChatMemberBanned {
    status?: string;
    user?: User;
    until_date?: number;
}
export interface ChatMemberUpdated extends Update {
    chat?: Chat;
    from?: User;
    date?: number;
    old_chat_member?: ChatMember;
    new_chat_member?: ChatMember;
    invite_link?: ChatInviteLink;
}
export interface ChatJoinRequest extends Update {
    chat?: Chat;
    from?: User;
    user_chat_id?: number;
    date?: number;
    bio?: string;
    invite_link?: ChatInviteLink;
}
export interface ChatPermissions {
    can_send_messages?: boolean;
    can_send_audios?: boolean;
    can_send_documents?: boolean;
    can_send_photos?: boolean;
    can_send_videos?: boolean;
    can_send_video_notes?: boolean;
    can_send_voice_notes?: boolean;
    can_send_polls?: boolean;
    can_send_other_messages?: boolean;
    can_add_web_page_previews?: boolean;
    can_change_info?: boolean;
    can_invite_users?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
}
export interface ChatLocation {
    location?: Location;
    address?: string;
}
export interface ForumTopic {
    message_thread_id?: number;
    name?: string;
    icon_color?: number;
    icon_custom_emoji_id?: string;
}
export interface BotCommand {
    command?: string;
    description?: string;
}
export interface BotCommandScope {}
export interface BotCommandScopeDefault {
    type?: string;
}
export interface BotCommandScopeAllPrivateChats {
    type?: string;
}
export interface BotCommandScopeAllGroupChats {
    type?: string;
}
export interface BotCommandScopeAllChatAdministrators {
    type?: string;
}
export interface BotCommandScopeChat {
    type?: string;
    chat_id?: string | number;
}
export interface BotCommandScopeChatAdministrators {
    type?: string;
    chat_id?: string | number;
}
export interface BotCommandScopeChatMember {
    type?: string;
    chat_id?: string | number;
    user_id?: number;
}
export interface MenuButton {}
export interface MenuButtonCommands {
    type?: string;
}
export interface MenuButtonWebApp {
    type?: string;
    text?: string;
    web_app?: WebAppInfo;
}
export interface MenuButtonDefault {
    type?: string;
}
export interface ResponseParameters {
    migrate_to_chat_id?: number;
    retry_after?: number;
}
export interface InputMedia {}
export interface InputMediaPhoto {
    type?: string;
    media?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    has_spoiler?: boolean;
}
export interface InputMediaVideo {
    type?: string;
    media?: string;
    thumb?: InputFile | string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    width?: number;
    height?: number;
    duration?: number;
    supports_streaming?: boolean;
    has_spoiler?: boolean;
}
export interface InputMediaAnimation {
    type?: string;
    media?: string;
    thumb?: InputFile | string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    width?: number;
    height?: number;
    duration?: number;
    has_spoiler?: boolean;
}
export interface InputMediaAudio {
    type?: string;
    media?: string;
    thumb?: InputFile | string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    duration?: number;
    performer?: string;
    title?: string;
}
export interface InputMediaDocument {
    type?: string;
    media?: string;
    thumb?: InputFile | string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    disable_content_type_detection?: boolean;
}
export interface InputFile {
    path?: string;
    name?: string;
    file_id?: string;
    url?: string;
}
export interface Sticker {
    file_id?: string;
    file_unique_id?: string;
    type?: string;
    width?: number;
    height?: number;
    is_animated?: boolean;
    is_video?: boolean;
    thumb?: PhotoSize;
    emoji?: string;
    set_name?: string;
    premium_animation?: File;
    mask_position?: MaskPosition;
    custom_emoji_id?: string;
    file_size?: number;
}
export interface StickerSet {
    name?: string;
    title?: string;
    sticker_type?: string;
    is_animated?: boolean;
    is_video?: boolean;
    stickers?: Sticker[];
    thumb?: PhotoSize;
}
export interface MaskPosition {
    point?: string;
    x_shift?: number;
    y_shift?: number;
    scale?: number;
}
export interface InlineQuery extends Update {
    id?: string;
    from?: User;
    query?: string;
    offset?: string;
    chat_type?: string;
    location?: Location;
}
export interface InlineQueryResult {}
export interface InlineQueryResultCachedAudio {
    type?: string;
    id?: string;
    audio_file_id?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultCachedDocument {
    type?: string;
    id?: string;
    title?: string;
    document_file_id?: string;
    description?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultCachedGif {
    type?: string;
    id?: string;
    gif_file_id?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultCachedMpeg4Gif {
    type?: string;
    id?: string;
    mpeg4_file_id?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultCachedPhoto {
    type?: string;
    id?: string;
    photo_file_id?: string;
    title?: string;
    description?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultCachedSticker {
    type?: string;
    id?: string;
    sticker_file_id?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultCachedVideo {
    type?: string;
    id?: string;
    video_file_id?: string;
    title?: string;
    description?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultCachedVoice {
    type?: string;
    id?: string;
    voice_file_id?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultArticle {
    type?: string;
    id?: string;
    title?: string;
    input_message_content?: InputMessageContent;
    reply_markup?: InlineKeyboardMarkup;
    url?: string;
    hide_url?: boolean;
    description?: string;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export interface InlineQueryResultAudio {
    type?: string;
    id?: string;
    audio_url?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    performer?: string;
    audio_duration?: number;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultContact {
    type?: string;
    id?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    vcard?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export interface InlineQueryResultGame {
    type?: string;
    id?: string;
    game_short_name?: string;
    reply_markup?: InlineKeyboardMarkup;
}
export interface InlineQueryResultDocument {
    type?: string;
    id?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    document_url?: string;
    mime_type?: string;
    description?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export interface InlineQueryResultGif {
    type?: string;
    id?: string;
    gif_url?: string;
    gif_width?: number;
    gif_height?: number;
    gif_duration?: number;
    thumb_url?: string;
    thumb_mime_type?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultLocation {
    type?: string;
    id?: string;
    latitude?: number;
    longitude?: number;
    title?: string;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export interface InlineQueryResultMpeg4Gif {
    type?: string;
    id?: string;
    mpeg4_url?: string;
    mpeg4_width?: number;
    mpeg4_height?: number;
    mpeg4_duration?: number;
    thumb_url?: string;
    thumb_mime_type?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultPhoto {
    type?: string;
    id?: string;
    photo_url?: string;
    thumb_url?: string;
    photo_width?: number;
    photo_height?: number;
    title?: string;
    description?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultVenue {
    type?: string;
    id?: string;
    latitude?: number;
    longitude?: number;
    title?: string;
    address?: string;
    foursquare_id?: string;
    foursquare_type?: string;
    google_place_id?: string;
    google_place_type?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumb_url?: string;
    thumb_width?: number;
    thumb_height?: number;
}
export interface InlineQueryResultVideo {
    type?: string;
    id?: string;
    video_url?: string;
    mime_type?: string;
    thumb_url?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    video_width?: number;
    video_height?: number;
    video_duration?: number;
    description?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InlineQueryResultVoice {
    type?: string;
    id?: string;
    voice_url?: string;
    title?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: MessageEntity[];
    voice_duration?: number;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
export interface InputTextMessageContent {
    message_text?: string;
    parse_mode?: string;
    entities?: MessageEntity[];
    disable_web_page_preview?: boolean;
}
export interface InputLocationMessageContent {
    latitude?: number;
    longitude?: number;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
}
export interface InputVenueMessageContent {
    latitude?: number;
    longitude?: number;
    title?: string;
    address?: string;
    foursquare_id?: string;
    foursquare_type?: string;
    google_place_id?: string;
    google_place_type?: string;
}
export interface InputContactMessageContent {
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    vcard?: string;
}
export interface InputInvoiceMessageContent {
    title?: string;
    description?: string;
    payload?: string;
    provider_token?: string;
    currency?: string;
    prices?: LabeledPrice[];
    max_tip_amount?: number;
    suggested_tip_amounts?: number[];
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
export interface InputMessageContent {
    result_id?: string;
    from?: User;
    location?: Location;
    inline_message_id?: string;
    query?: string;
}
export interface ChosenInlineResult extends Update {
    result_id?: string;
    from?: User;
    location?: Location;
    inline_message_id?: string;
    query?: string;
}
export interface SentWebAppMessage {
    inline_message_id?: string;
}
export interface LabeledPrice {
    label?: string;
    amount?: number;
}
export interface Invoice {
    title?: string;
    description?: string;
    start_parameter?: string;
    currency?: string;
    total_amount?: number;
}
export interface ShippingAddress {
    country_code?: string;
    state?: string;
    city?: string;
    street_line1?: string;
    street_line2?: string;
    post_code?: string;
}
export interface OrderInfo {
    name?: string;
    phone_number?: string;
    email?: string;
    shipping_address?: ShippingAddress;
}
export interface ShippingOption {
    id?: string;
    title?: string;
    prices?: LabeledPrice[];
}
export interface SuccessfulPayment {
    currency?: string;
    total_amount?: number;
    invoice_payload?: string;
    shipping_option_id?: string;
    order_info?: OrderInfo;
    telegram_payment_charge_id?: string;
    provider_payment_charge_id?: string;
}
export interface ShippingQuery extends Update {
    id?: string;
    from?: User;
    invoice_payload?: string;
    shipping_address?: ShippingAddress;
}
export interface PreCheckoutQuery extends Update {
    id?: string;
    from?: User;
    currency?: string;
    total_amount?: number;
    invoice_payload?: string;
    shipping_option_id?: string;
    order_info?: OrderInfo;
}
export interface PassportData {
    data?: EncryptedPassportElement[];
    credentials?: EncryptedCredentials;
}
export interface PassportFile {
    file_id?: string;
    file_unique_id?: string;
    file_size?: number;
    file_date?: number;
}
export interface EncryptedPassportElement {
    type?: string;
    data?: string;
    phone_number?: string;
    email?: string;
    files?: PassportFile[];
    front_side?: PassportFile;
    reverse_side?: PassportFile;
    selfie?: PassportFile;
    translation?: PassportFile[];
    hash?: string;
}
export interface EncryptedCredentials {
    data?: string;
    hash?: string;
    secret?: string;
}
export interface PassportElementError {}
export interface PassportElementErrorDataField {
    source?: string;
    type?: string;
    field_name?: string;
    data_hash?: string;
    message?: string;
}
export interface PassportElementErrorFrontSide {
    source?: string;
    type?: string;
    file_hash?: string;
    message?: string;
}
export interface PassportElementErrorReverseSide {
    source?: string;
    type?: string;
    file_hash?: string;
    message?: string;
}
export interface PassportElementErrorSelfie {
    source?: string;
    type?: string;
    file_hash?: string;
    message?: string;
}
export interface PassportElementErrorFile {
    source?: string;
    type?: string;
    file_hash?: string;
    message?: string;
}
export interface PassportElementErrorFiles {
    source?: string;
    type?: string;
    file_hashes?: string[];
    message?: string;
}
export interface PassportElementErrorTranslationFile {
    source?: string;
    type?: string;
    file_hash?: string;
    message?: string;
}
export interface PassportElementErrorTranslationFiles {
    source?: string;
    type?: string;
    file_hashes?: string[];
    message?: string;
}
export interface PassportElementErrorUnspecified {
    source?: string;
    type?: string;
    element_hash?: string;
    message?: string;
}
export interface Game {
    title?: string;
    description?: string;
    photo?: PhotoSize[];
    text?: string;
    text_entities?: MessageEntity[];
    animation?: Animation;
}
export interface CallbackGame {}
export interface GameHighScore {
    position?: number;
    user?: User;
    score?: number;
}
