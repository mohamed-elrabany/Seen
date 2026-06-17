export function isProfileDefault(profilePictureUrl) {
  // 1. Put all your potential default URLs into an array
  const defaultUrls = [
    "https://ollie-wroth-tributarily.ngrok-free.dev/storage/profiles/default.png",
    "https://127.0.0.1:8000/storage/profiles/default.png",
    "http://127.0.0.1:8000/storage/profiles/default.png",
    "https://localhost:8000/storage/profiles/default.png",
    "https://ollie-wroth-tributarily.ngrok-free.dev/storage/https://ollie-wroth-tributarily.ngrok-free.dev/profiles/default.png"
  ];

  // 2. If it's empty, null, or matches anything in our default list, return null
  if (!profilePictureUrl || defaultUrls.includes(profilePictureUrl)) {
    return null;
  }

  // 3. Otherwise, return the custom profile picture URL
  return profilePictureUrl;
}