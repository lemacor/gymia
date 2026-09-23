export type Plan = "free" | "pro";

export const PRO_FEATURES = new Set([
  "ai_workout_unlimited",
  "coach_ai",
  "exercise_adaptation",
  "advanced_history",
  "advanced_stats",
  "personalized_progression",
]);

export function canUseFeature(plan: Plan, feature: string) {
  return plan === "pro" || !PRO_FEATURES.has(feature);
}
