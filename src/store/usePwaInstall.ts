import { useEffect, useState } from "react";

// Capture the browser's install prompt (fired once, often before React mounts)
// at module scope, then expose it to components. Also tracks display-mode so we
// can hide the button when the app is already installed.

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function isStandalone(): boolean {
  return (
    typeof matchMedia !== "undefined" &&
    (matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true)
  );
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    notify();
  });
}

export function useInstallPrompt() {
  const [available, setAvailable] = useState(() => !!deferred && !isStandalone());
  useEffect(() => {
    const l = () => setAvailable(!!deferred && !isStandalone());
    listeners.add(l);
    l();
    return () => { listeners.delete(l); };
  }, []);

  const promptInstall = async (): Promise<boolean> => {
    if (!deferred) return false;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    deferred = null;
    notify();
    return choice.outcome === "accepted";
  };

  return { available, promptInstall };
}
