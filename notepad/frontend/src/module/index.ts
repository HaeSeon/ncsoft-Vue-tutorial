import { serverUrl } from "@/main";

export function convertDatestring(datetime: number): string {
  if (typeof datetime != "number") {
    return ''
  }
  const date = new Date(datetime)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

export function getToken(): string {
  const token = document.cookie.split("token=")[1];
  return token
}

export async function getUserId(): Promise<string> {
  const url = `${serverUrl}/auth/user`;
  const token = getToken();
  const response = await fetch(url, {
    headers: {
      token,
    },
  });
  const userId = (await response.json()).id;
  if (!userId) {
    throw "oguogu";
  }
  return userId as string
}