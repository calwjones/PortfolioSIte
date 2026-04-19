export function fireToast(name: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sav:toast", { detail: name }));
}
