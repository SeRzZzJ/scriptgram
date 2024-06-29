// import assert from "node:assert"
// import { describe, it } from "node:test"
// import dotenv from "dotenv"
// import { ApiClient } from "../../../src/core/network/api-client"

// describe("Client API testing", async () => {
//   dotenv.config()

//   const baseUrl: string = "https://api.telegram.org"
//   const baseRoute: string = "/bot"
//   const token: string = process.env!.TOKEN as string
//   const chatId: number = Number(process.env!.CHAT_ID)

//   const apiClient = new ApiClient(baseUrl.concat(baseRoute, token))

//   it("HTTP method 'GET'", async () => {
//     const getMeResult = await apiClient.callApi("get", "getMe")
//     const getUpdatesResult = await apiClient.callApi<
//       "get",
//       {
//         params: {
//           offset?: number
//           limit?: number
//           timeout?: number
//           allowed_updates?: string[]
//         }
//       }
//     >("get", "getUpdates", { params: { limit: 1 } })
//     const getWebhookInfoResult = await apiClient.callApi<
//       "get",
//       {
//         params: {
//           url: string
//         }
//       }
//     >("get", "getWebhookInfo", { params: { url: apiClient.requestURL } })
//     assert.ok(getMeResult.ok)
//     assert.ok(getUpdatesResult.ok)
//     assert.ok(getWebhookInfoResult.ok)
//   })

//   it("HTTP method 'POST'", async () => {
//     const sendMessageResult = await apiClient.callApi<
//       "post",
//       { params: { chat_id: number; text: string } }
//     >("post", "sendMessage", {
//       params: { chat_id: chatId, text: "test message" },
//     })
//     const sendDocumentResult = await apiClient.callApi<
//       "post",
//       { inputFile: { path: string; name: string }; params: { chat_id: number } }
//     >("post", "sendDocument", {
//       inputFile: {
//         path: 
//         name: "test.josn.json",
//       },
//       params: {
//         chat_id: chatId,
//       },
//     })

//     assert.ok(sendMessageResult.ok)
//     assert.ok(sendDocumentResult.ok)
//     // console.log(sendMessageResult)
//     // console.log(sendDocumentResult)
//   })
// })
