let container;
function getContainer() {
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}
export function toast(msg, type = "info", duration = 3500) {
  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  el.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  getContainer().appendChild(el);
  setTimeout(() => el.remove(), duration);
}
export const toastSuccess = (m) => toast(m, "success");
export const toastError = (m) => toast(m, "error");
export const toastInfo = (m) => toast(m, "info");
