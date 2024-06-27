import { readFileSync } from "fs"

type FetchParams = {
    method: undefined | string
    headers: undefined | Headers
    body: undefined | string | FormData
}

type Args<T> = {
    [P in keyof T]: T[P]
}

type ArgsStructure = {
    params?: unknown
    inputFile?: { path: string; name: string }
}

export class ApiClient {
    constructor(public readonly requestURL: string) {}

    async callApi<T extends "get" | "post" | "file", U extends ArgsStructure>(
        httpMethod: T,
        tgMethod: string,
        args?: Args<U>
    ) {
        const requestURI = this.requestURL.concat("/", tgMethod)
        const fetchParams: FetchParams = {
            method: undefined,
            headers: undefined,
            body: undefined,
        }
        switch (httpMethod) {
            case "get":
                fetchParams.method = "get"
                this.get(requestURI, args)
                break
            case "post":
                fetchParams.method = "post"
                this.post(fetchParams as FetchParams, args)
                break
            default:
                throw Error("Unsucc to call api")
        }

        return await (
            await fetch(requestURI, fetchParams as RequestInit)
        ).json()
    }

    private get(requestURI: string, args: unknown) {
        if (args)
            requestURI = this.requestURL.concat(
                "?",
                this.preparationObjectToLinkParams(args)
            )
    }

    private preparationObjectToLinkParams(object: Object): string {
        let params: string = ""
        for (const [key, value] of Object.entries(object)) {
            if (object.hasOwnProperty(key)) {
                if (params.length > 0) {
                    params += "&"
                }
                params += key + "=" + value
            }
        }
        return params
    }

    private post(fetchParams: FetchParams, args: any) {
        let secretToken = ""
        if (args.secretToken) secretToken = args.params.secret_token

        let blob: Blob | null = null

        if (args.inputFile?.path)
            blob = new Blob([readFileSync(args.inputFile.path)])

        const formData = new FormData()
        const isFile =
            args.params && blob && args.inputFile?.path && args.inputFile?.name
        this.appendFormData(formData, args)
        if (isFile) {
            formData.append("document", blob!, args.inputFile.name)
        }

        if (secretToken) {
            const headers = new Headers()
            headers.set("X-Telegram-Bot-Api-Secret-Token", secretToken)
            fetchParams.headers = headers
        }
        fetchParams.body = formData
    }

    private appendFormData(formData: FormData, args: any) {
        for (const [key, value] of Object.entries(args.params)) {
            if (args.params.hasOwnProperty(key)) {
                formData.append(key, value as string)
            }
        }
    }

    private file(fetchParams: FetchParams, args: any) {
        // const headers = new Headers()
        // headers.append("Content-Type", "application/json")
        // headers.append("Content-Length", JSON.stringify(args).length.toString())
        // if (secretToken) {
        //   for (const [key, value] of Object.entries(secretToken)) {
        //     if (Object.prototype.hasOwnProperty.call(secretToken, key))
        //       headers.append(key, value)
        //   }
        // }
        // fetchParams.headers = headers
        let blob: Blob | null = null
        // C:\Users\SeRzZzJ\AppData\Roaming\programming\node_projects\twilight-js\typegram\src\core\network\api-client.ts
        if (args.inputFile.path)
            blob = new Blob([readFileSync(args.inputFile.path)])
        // path.resolve(
        //   <string>(<unknown>process.env.PWD),
        //   args.inputFile.path.replace(/(\.\/)|(\.\.\/)/gm, "")
        // )
        const formData = new FormData()
        if (args.params && blob && args.inputFile.path && args.inputFile.name) {
            for (const [key, value] of Object.entries(args.params)) {
                if (args.params.hasOwnProperty(key)) {
                    formData.append(key, value as string)
                }
            }
            formData.append(args.inputFile.name, blob, args.inputFile.name)
        }
        fetchParams.body = formData
        fetchParams.body = JSON.stringify(args)
    }
}
