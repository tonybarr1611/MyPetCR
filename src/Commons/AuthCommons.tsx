import * as jose from "jose";

function isExpired() {
  const token = localStorage.getItem("token");
  if (token === "guest") return false;
  if (!token) return true;

  const decodedToken = jose.decodeJwt(token) as any;
  if (!decodedToken) return true;

  return decodedToken.exp * 1000 < Date.now();
}

async function handleExpiration() {
  if (isExpired()) {
    window.location.assign("/");
  } else if (localStorage.getItem("token") !== "guest") {
    const key = new TextEncoder().encode("secret");
    const newExp = Math.floor(Date.now() / 1000) + 1800;

    const newToken = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(newExp)
      .sign(key);

    localStorage.setItem("token", newToken);
  }
}

// Function that returns true if token is guest and false if it isnt
function isGuest() {
  return localStorage.getItem("token") === "guest";
}

// Optional parameter notClient, default true
function guestRedirection(notClient = true) {
  const userType = localStorage.getItem("userType") || "4";
  if (isGuest() || (parseInt(userType) === 4 && notClient)) {
    window.location.assign("/");
  }
}

export { isExpired, handleExpiration, isGuest, guestRedirection };
