const storage = "rmnote";
const getDB = () => JSON.parse(localStorage.getItem(storage) || "{}");

export { storage, getDB };
