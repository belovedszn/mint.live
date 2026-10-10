export type Creator = { id: string; name: string; handle: string; city: string; country: string; category: string; title: string; viewers: number; followers: number };
export type ChatMsg = { user: string; text: string };
export type RoadmapItem = { phase: string; name: string; items: string[] };
export const creators: Creator[] = [
  { id: "a", name: "Tolu Adeyemi", handle: "tolu.plays", city: "Lagos", country: "Nigeria", category: "Gaming", title: "FC 26 Naija Cup: semi-final night", viewers: 4210, followers: 38200 },
  { id: "b", name: "Ama Mensah", handle: "amakitchen", city: "Accra", country: "Ghana", category: "Culture", title: "Cooking waakye for 12 people, live", viewers: 1860, followers: 21400 },
  { id: "c", name: "Wanjiru Kamau", handle: "wanjiru.codes", city: "Nairobi", country: "Kenya", category: "Technology", title: "Build an M-Pesa checkout in 60 minutes", viewers: 970, followers: 9800 },
  { id: "d", name: "Sipho Dlamini", handle: "sipho.laughs", city: "Johannesburg", country: "South Africa", category: "Comedy", title: "Open mic: audience picks the topic", viewers: 2540, followers: 27700 },
];
export const seedChat: ChatMsg[] = [
  { user: "chidi_k", text: "Lagos represent" }, { user: "efua", text: "this stream is smooth on my data" },
  { user: "kev254", text: "following, where have you been" }, { user: "zandi", text: "tipped, do the next round" },
  { user: "obinna", text: "chat is moving fast tonight" }, { user: "naledi", text: "first time here, good vibes" },
];
export const roadmap: RoadmapItem[] = [
  { phase: "01", name: "Validate", items: ["Creator interviews", "Audience research", "Prototype", "Community building"] },
  { phase: "02", name: "Launch MVP", items: ["Live streaming", "Creator profiles", "Discovery", "Chat and following"] },
  { phase: "03", name: "Monetization", items: ["Subscriptions", "Tips", "Gifts", "Creator wallets"] },
  { phase: "04", name: "Scale", items: ["Regional infrastructure", "Recommendations", "Advertising", "Brand marketplace"] },
];
export const payMethods = ["Card", "Bank transfer", "USSD", "Mobile money"];
