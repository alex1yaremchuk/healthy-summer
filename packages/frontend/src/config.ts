export const API_BASES = {
  user: import.meta.env.VITE_USER_API || "http://localhost:3001",
  activity: import.meta.env.VITE_ACTIVITY_API || "http://localhost:3002",
  nutrition: import.meta.env.VITE_NUTRITION_API || "http://localhost:3003",
  social: import.meta.env.VITE_SOCIAL_API || "http://localhost:3004"
};
