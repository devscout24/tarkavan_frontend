export function isSubscriptionActive(): boolean {
  // Server-side
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const userData = localStorage.getItem("go_elite_user");

    if (!userData) {
      return false;
    }

    const parsed = JSON.parse(userData);

    return parsed?.is_subscription_active === true;
  } catch (error) {
    console.error("Failed to read go_elite_user:", error);
    return false;
  }
}