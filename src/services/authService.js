import api from "../api/axios";

function isBase64ImageDataUrl(value) {
  return (
    typeof value === "string" &&
    value.startsWith("data:image/") &&
    value.includes(";base64,")
  );
}

function dataUrlToBlob(dataUrl) {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) throw new Error("Invalid data URL");

  const header = dataUrl.slice(0, commaIndex);
  const base64 = dataUrl.slice(commaIndex + 1);
  const mimeMatch = header.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64$/);
  if (!mimeMatch) throw new Error("Invalid image data URL header");

  const mime = mimeMatch[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function mimeToExtension(mime) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

async function handleRequest(request){
    try{
        const response = await request;
        return response.data;
    }catch(error){
        return {
            error: error || "Something wrong happened!"
        }
    }
}

export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password }, { withCredentials: false });
    return response.data;
  } catch (err) {
    const message = error.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
}

export async function register(userData) {
  try {
    const response = await api.post("/register", userData, { withCredentials: false });
    console.log(response.data);
    console.log('user Created Successfully');
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Registration failed";
  }
}

export async function userExists(email){
  const data= await handleRequest(
    api.post("/check-email",  { email }, { withCredentials: false })
  );
  return data.exists;
}

export function getMe(){
  return handleRequest(
    api.get("/me", { withCredentials: false })
  );
}

export function logout(){
  return handleRequest(
    api.post("/logout")
  );
}
export function deleteMe({ password }){
  return handleRequest(
    api.delete("/delete-me", { password })
  );
}

export function updateMe(userData){
  if (isBase64ImageDataUrl(userData?.profile_picture)) {
    const formData = new FormData();

    // Some backends (notably PHP/Laravel) do not reliably parse file uploads
    // on true PUT/PATCH requests. Method spoofing via POST keeps the route
    // semantics while ensuring the file is received.
    formData.append("_method", "PUT");

    for (const [key, value] of Object.entries(userData ?? {})) {
      if (key === "profile_picture") continue;
      if (value === undefined) continue;
      if (value === null) {
        formData.append(key, "");
        continue;
      }
      formData.append(key, String(value));
    }

    const blob = dataUrlToBlob(userData.profile_picture);
    const ext = mimeToExtension(blob.type);
    const file = new File([blob], `profile_picture.${ext}`, { type: blob.type });
    formData.append("profile_picture", file);

    return handleRequest(api.post("/user/profile", formData));
  }

  return handleRequest(api.put("/user/profile", userData));
}
