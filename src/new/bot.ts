import { readFileSync } from 'fs';

type FetchParams = {
  method: undefined | string;
  headers: undefined | Headers;
  body: undefined | string | FormData;
};

// type Args<T> = {
//   [P in keyof T]: T[P];
// };

// type ArgsStructure<T> = {
//   params?: T;
//   inputFile?: { path: string; name: string };
// };
type Args<T> = {
  params?: T;
  inputFile?: { path: string; name: string };
};
export class Bot {
  constructor(public readonly token: string) {}

  async sendRequestToAPI<T>(telegramMethod: string, args?: Args<T>) {
    const requestURI = `https://api.telegram.org/bot${this.token}/${telegramMethod}`;
    const fetchParams: FetchParams = {
      method: 'POST',
      headers: undefined,
      body: undefined
    };
    this.post(fetchParams as FetchParams, args);
    const response = await (
      await fetch(requestURI, fetchParams as RequestInit)
    ).json();
    if (!response.ok) {
      throw Error(
        `Telegram request error ${response.error_code}: ${response.description}`
      );
    }
    return response?.result;
  }

  private post(fetchParams: FetchParams, args: any | undefined) {
    if (!args) return;
    let secretToken = '';
    if (args.secretToken) secretToken = args.params.secret_token;

    let blob: Blob | null = null;

    if (args.inputFile?.path)
      blob = new Blob([readFileSync(args.inputFile.path)]);

    const formData = new FormData();
    const isFile =
      args.params && blob && args.inputFile?.path && args.inputFile?.name;
    this.appendFormData(formData, args);
    if (isFile) {
      formData.append('document', blob!, args.inputFile.name);
    }

    if (secretToken) {
      const headers = new Headers();
      headers.set('X-Telegram-Bot-Api-Secret-Token', secretToken);
      fetchParams.headers = headers;
    }
    fetchParams.body = formData;
  }

  private appendFormData(formData: FormData, args: any) {
    for (const [key, value] of Object.entries(args.params)) {
      if (args.params.hasOwnProperty(key)) {
        formData.append(key, value as string);
      }
    }
  }

  private get(requestURI: string, args: unknown) {
    if (args)
      requestURI = this.token.concat(
        '?',
        this.preparationObjectToLinkParams(args)
      );
  }

  private preparationObjectToLinkParams(object: Object): string {
    let params: string = '';
    for (const [key, value] of Object.entries(object)) {
      if (object.hasOwnProperty(key)) {
        if (params.length > 0) {
          params += '&';
        }
        params += key + '=' + value;
      }
    }
    return params;
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
    let blob: Blob | null = null;
    // C:\Users\SeRzZzJ\AppData\Roaming\programming\node_projects\twilight-js\typegram\src\core\network\api-client.ts
    if (args.inputFile.path)
      blob = new Blob([readFileSync(args.inputFile.path)]);
    // path.resolve(
    //   <string>(<unknown>process.env.PWD),
    //   args.inputFile.path.replace(/(\.\/)|(\.\.\/)/gm, "")
    // )
    const formData = new FormData();
    if (args.params && blob && args.inputFile.path && args.inputFile.name) {
      for (const [key, value] of Object.entries(args.params)) {
        if (args.params.hasOwnProperty(key)) {
          formData.append(key, value as string);
        }
      }
      formData.append(args.inputFile.name, blob, args.inputFile.name);
    }
    fetchParams.body = formData;
    fetchParams.body = JSON.stringify(args);
  }
}
