import { readFileSync } from "fs";
import path from "path";
import { InputFile } from "./telegram/telegram-typess";
export class ApiCaller {
    private requestUrl: string;

    constructor(requestUrl: string) {
        this.requestUrl = requestUrl;
    }

    public async getCallApi(method: string, params?: unknown): Promise<any> {
        let url: string = this.requestUrl.concat("/", method);
        if (params) url = this.requestUrl.concat("?", this.preparationObjectToLinkParams(params));
        console.log(url);
        return await (await fetch(url, { method: "GET" })).json();
    }

    private preparationObjectToLinkParams(object: Object): string {
        let params: string = "";
        for (const [key, value] of Object.entries(object)) {
            if (object.hasOwnProperty(key)) {
                if (params.length > 0) {
                    params += "&";
                }
                params += key + "=" + value;
            }
        }
        return params;
    }

    public async postCallApiData(method: string, params?: unknown, header?: unknown): Promise<any> {
        let url: string = this.requestUrl.concat("/", method);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Content-Length", JSON.stringify(params).length.toString());
        if (header) {
            for (const [key, value] of Object.entries(header)) {
                if (Object.prototype.hasOwnProperty.call(header, key)) headers.append(key, value);
            }
        }
        let init = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params),
        };
        return await (await fetch(url, init)).json();
    }

    public async postCallApiFile(method: string, file: InputFile, params?: unknown): Promise<any> {
        let url: string = this.requestUrl.concat("/", method);
        let blob: Blob | null = null;
        if (file.path) blob = new Blob([readFileSync(path.resolve(<string>(<unknown>process.env.PWD), file.path.replace(/(\.\/)|(\.\.\/)/gm, "")))]);
        const formData = new FormData();
        if (params && blob && file.path && file.name) {
            for (const [key, value] of Object.entries(params)) {
                if (params.hasOwnProperty(key)) {
                    formData.append(key, value);
                }
            }
            formData.append(file.name, blob, file.name);
        }
        let init = {
            method: "POST",
            body: formData,
        };
        return await (await fetch(url, init)).json();
    }
}
