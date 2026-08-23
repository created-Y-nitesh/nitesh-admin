import { adminLogout, getCurrentUser } from "../core/auth.js";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`, href: "index.html" },
  { id: "requests", label: "Requests", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`, href: "requests.html" },
  { id: "projects", label: "Projects", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`, href: "projects.html" },
  { id: "users", label: "Users", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, href: "users.html" },
  { id: "payments", label: "Payments", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`, href: "payments.html" },
  { id: "certifications", label: "Certifications", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`, href: "certifications.html" },
  { id: "portfolio", label: "Portfolio", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`, href: "portfolio.html" },
  { id: "sync", label: "Sync Status", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`, href: "sync.html" },
];

export function renderSidebar(activeId) {
  const user = getCurrentUser();
  const sidebarEl = document.getElementById("sidebar");
  if (!sidebarEl) return;

  sidebarEl.innerHTML = `
    <div class="sidebar__brand">N<span>.</span> Admin</div>
    <nav class="sidebar__nav">
      ${NAV.map(n => `
        <a href="${n.href}" class="nav-item ${n.id === activeId ? "active" : ""}">
          ${n.icon}<span>${n.label}</span>
        </a>
      `).join("")}
    </nav>
    <div class="sidebar__footer">
      <div class="sidebar__user">
        Logged in as<br>
        <strong>${user?.name || "Admin"}</strong>
      </div>
      <button class="nav-item" id="logout-btn" style="color:var(--red)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Logout
      </button>
    </div>
  `;

  document.getElementById("logout-btn")?.addEventListener("click", adminLogout);
}
