// DummyJSON's /users/add (used for sign-up) and /auth/login (used for
// sign-in) are two disconnected mock endpoints — accounts created via
// /users/add are never actually saved, so DummyJSON's real login has no way
// to know about them. To make sign-up -> sign-in behave like a real app, we
// keep a local "accounts table" of anyone who signs up through this app, and
// check it first on login. DummyJSON's own test accounts (e.g. emilys /
// emilyspass) still work too, via the real API, as a fallback.
//
// Note: this stores plaintext passwords in localStorage, which is fine for a
// student/demo project with no real backend, but should never be done in a
// production app — a real app would hash passwords server-side.

const LOCAL_USERS_KEY = "shopsphere_local_users";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

export const isUsernameTaken = (username) =>
  readUsers().some((u) => u.username.toLowerCase() === username.toLowerCase());

export const saveLocalAccount = (user) => {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
};

export const findLocalAccount = (username, password) =>
  readUsers().find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  ) || null;
