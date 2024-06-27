import { ApiClient } from "./src/core/network/api-client"
import { config } from "dotenv"
import { TelegramBot } from "./src/core/telegram/telegram-bot"
import { Typegram } from "./src/typegram"

config()
// import { Telegram } from "./src/telegram/telegram";

// const telegram = new Telegram("1397194440:AAGaP70TMT5cdZAfh19-pyDtHNNCR8XxkAA");

const baseUrl: string = "https://api.telegram.org"
const baseRoute: string = "/bot"
const token: string = process.env!.TOKEN as string

const apiClient = new ApiClient(baseUrl.concat(baseRoute, token))

async function test() {
    const bot = new Typegram(token)

    await bot.startLongPolling({})

    // console.log(await telegram.apiCaller.getCallApi("getMe"));
    // console.log(await apiClient.callApi("get", "getMe"))
    // console.log(
    //   await apiClient.callApi("post", "sendMessage", {
    //     params: {
    //       chat_id: 856570258,
    //       text: "message",
    //     },
    //   })
    // )
    // console.log(
    //   await apiClient.callApi("post", "sendDocument", {
    //     inputFile: {
    //       //src\\core\\network\\api-client.ts
    //       path: "C:\\Users\\SeRzZzJ\\AppData\\Roaming\\programming\\node_projects\\twilight-js\\typegram\\json.json",
    //       name: "document",
    //     },
    //     params: {
    //       chat_id: 856570258,
    //     },
    //   })
    // )
    // console.log(
    //     typeof {
    //         message: true,
    //         edited_message: true,
    //         channel_post: true,
    //         edited_channel_post: true,
    //         inline_query: true,
    //         chosen_inline_result: true,
    //         callback_query: true,
    //         shipping_query: true,
    //         pre_checkout_query: true,
    //         poll: true,
    //         poll_answer: true,
    //         my_chat_member: true,
    //         chat_member: true,
    //         chat_join_request: true,
    //     }
    // );
    // console.log(await telegram.apiCaller.postCallApiData("sendMessage", { chat_id: 856570258, text: "message" }));
    // console.log("log",
    //     await telegram.apiCaller.postCallApiFile("sendDocument", { path: "src/json.json", name: "document" }, { chat_id: 856570258 })
    // );
    // const updates = await telegram.getUpdates(0, 100, 10_000, {
    //     message: true,
    //     edited_message: true,
    //     // "channel_post",
    //     // "edited_channel_post",
    //     // "inline_query",
    //     // "chosen_inline_result",
    //     // "callback_query",
    //     // "shipping_query",
    //     // "pre_checkout_query",
    //     // "poll",
    //     // "poll_answer",
    //     // "my_chat_member",
    //     // "chat_member",
    //     chat_join_request: true,
    // });
    // console.log(updates);
}

test().then()
