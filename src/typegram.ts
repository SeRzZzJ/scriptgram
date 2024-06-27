import { GetUpdateOpts } from "./core/telegram/aliases-types"
import { TelegramBot } from "./core/telegram/telegram-bot"
import { Message, Update } from "./core/telegram/telegram-types"

export class Typegram {
    readonly telegram: TelegramBot
    constructor(token: string) {
        this.telegram = new TelegramBot(token)
    }

    async startLongPolling(updatesOpts: GetUpdateOpts) {
        const request = await this.telegram.getUpdates(
            updatesOpts.offset,
            updatesOpts.limit,
            updatesOpts.timeout,
            updatesOpts.allowed_updates
        )
        // console.log(request)
        const update = request[0]
        if (update.message) console.log(update.message)
    }
}
