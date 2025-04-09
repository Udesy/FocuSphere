export interface User {
  _id: string;
  email: string;
  name: string;
  username: string;
  image?: string;
  firstLogin: string;
  focusSessions: number;
  totalFocusTime: number;
  breaksTaken: number;
}

export async function getUser(): Promise<User | null> {
  try {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error("Failed to fetch user");
    return await res.json();
  } catch (err) {
    console.error("User fetch failed:", err);
    return null;
  }
}
