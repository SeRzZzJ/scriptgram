export interface Session<T> {
  chat_id: number;
  state: string;
  data?: T;
}
