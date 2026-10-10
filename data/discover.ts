import { creators, type Creator } from "./mock";
export const categories = ["All", "Gaming", "Music", "Comedy", "Football", "Technology", "Fashion", "Beauty", "Culture", "Education", "Lifestyle"];
export const allCreators: Creator[] = [...creators,
  { id: "e", name: "Kwame Boateng", handle: "kwame.fc", city: "Kumasi", country: "Ghana", category: "Football", title: "Matchday reactions, no filter", viewers: 3120, followers: 30100 },
  { id: "f", name: "Amina Yusuf", handle: "amina.styles", city: "Kano", country: "Nigeria", category: "Fashion", title: "Ankara restyle challenge", viewers: 1240, followers: 15800 },
  { id: "g", name: "Neema Mushi", handle: "neema.sings", city: "Dar es Salaam", country: "Tanzania", category: "Music", title: "Acoustic Bongo Flava set", viewers: 880, followers: 8700 },
  { id: "h", name: "Chinwe Okafor", handle: "chinwe.teaches", city: "Enugu", country: "Nigeria", category: "Education", title: "JAMB maths crash class", viewers: 2050, followers: 19300 },
];
export const tiers = [
  { name: "Follower", price: "Free", perks: "Chat, follow alerts, public streams" },
  { name: "Member", price: "NGN 1,500/mo", perks: "Member badge, subscriber-only chat, replays" },
  { name: "Inner circle", price: "NGN 5,000/mo", perks: "Private group, monthly Q&A, early access" },
];
export const dash = {
  "7 days": { series: [820, 1100, 960, 1900, 1500, 2300, 2100], kpis: [["Current viewers", 2140], ["Followers", 38200], ["Avg watch time (min)", 24], ["Stream revenue (NGN)", 412000], ["New subscribers", 186], ["Tips (NGN)", 96500], ["Engagement (%)", 17]] },
  "30 days": { series: [900, 1300, 1100, 1700, 2100, 1900, 2600, 2400, 3000, 2800, 3300, 3100], kpis: [["Current viewers", 2140], ["Followers", 38200], ["Avg watch time (min)", 27], ["Stream revenue (NGN)", 1730000], ["New subscribers", 741], ["Tips (NGN)", 402000], ["Engagement (%)", 19]] },
} as Record<string, { series: number[]; kpis: [string, number][] }>;
export const audience: [string, number][] = [["Nigeria", 54], ["Ghana", 14], ["Kenya", 11], ["South Africa", 9], ["Other", 12]];
export const recent = [["Friday freestyle", "2h 10m", "NGN 88,400"], ["Q&A with members", "1h 05m", "NGN 41,200"], ["Studio tour", "48m", "NGN 19,800"]];
