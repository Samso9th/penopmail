import { WebHaptics, defaultPatterns } from "web-haptics";

let instance: WebHaptics | null = null;

function getInstance(): WebHaptics | null {
  if (typeof window === "undefined") return null;
  if (!instance) instance = new WebHaptics();
  return instance;
}

export const haptics = {
  /** Medium tap — default button press */
  trigger: () => getInstance()?.trigger(),

  /** Two ascending pulses — success state */
  success: () => getInstance()?.trigger(defaultPatterns.success),

  /** Two pulses — cautionary / destructive action */
  warning: () =>
    getInstance()?.trigger([
      { duration: 40, intensity: 0.8 },
      { delay: 100, duration: 40, intensity: 0.6 },
    ]),

  /** Four pulses — error state */
  error: () =>
    getInstance()?.trigger([
      { duration: 40, intensity: 0.7 },
      { delay: 40, duration: 40, intensity: 0.7 },
      { delay: 40, duration: 40, intensity: 0.9 },
      { delay: 40, duration: 50, intensity: 0.6 },
    ]),
};
