// ==========================================================================
// ADMIN AUTH GUARD
// Every admin page calls guardAdmin() on load.
// Scenarios handled per spec sections 11, 13, 43, 75.
// ==========================================================================
import { api } from "./api.js";
import { CONFIG } from "../config.js";

let _currentUser = null;

export async function guardAdmin() {
  try {
    const resp = await api.get("/auth/me");
    const user = resp?.data;
    if (!user) throw new Error("No user data");

    if (user.role !== "ADMIN") {
      // CLIENT role → back to client dashboard
      window.location.replace(`${CONFIG.SITE_URL}/client-dashboard.html`);
      return null;
    }
    _currentUser = user;
    return user;
  } catch (err) {
    // 401 or network → not authenticated → public login
    window.location.replace(`${CONFIG.SITE_URL}/login.html`);
    return null;
  }
}

export function getCurrentUser() {
  return _currentUser;
}

export async function adminLogout() {
  try {
    await api.post("/auth/logout", {});
  } catch {}
  window.location.replace(`${CONFIG.SITE_URL}/login.html`);
}
