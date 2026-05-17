const cache = new Map();

function getCacheKey(category, profileId) {
  return `${category ?? "null"}::${profileId ?? "null"}`;
}

export function getCachedFeed(category, profileId) {
  return cache.get(getCacheKey(category, profileId)) ?? null;
}

export function setCachedFeed(category, profileId, data) {
  cache.set(getCacheKey(category, profileId), data);
}

export function invalidateFeed(category, profileId) {
  cache.delete(getCacheKey(category, profileId));
}