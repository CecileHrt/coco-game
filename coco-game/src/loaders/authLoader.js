import { stayConnected } from "../apis/auth.api";

export async function authLoader() {
  return stayConnected();
}
