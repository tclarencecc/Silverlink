// Simple on-device accounts, stored in this browser's localStorage.
// Passwords are saved as a SHA-256 hash rather than plain text.

export type LocalUser = { name: string; email: string; password: string };

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

async function hashPassword(password: string) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readUsers(): LocalUser[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCurrent(user: LocalUser) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}

export async function signUp(name: string, email: string, password: string) {
  const users = readUsers();
  const normalized = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalized)) {
    return { ok: false as const, error: "An account with this email already exists." };
  }
  const user: LocalUser = {
    name: name.trim(),
    email: normalized,
    password: await hashPassword(password),
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  saveCurrent(user);
  return { ok: true as const };
}

export async function logIn(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const hashed = await hashPassword(password);
  const user = readUsers().find((u) => u.email === normalized && u.password === hashed);
  if (!user) return { ok: false as const, error: "Email or password is incorrect." };
  saveCurrent(user);
  return { ok: true as const };
}

export function getCurrentUser(): LocalUser | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? (JSON.parse(raw) as LocalUser) : null;
  } catch {
    return null;
  }
}

export function logOut() {
  localStorage.removeItem(CURRENT_KEY);
}
