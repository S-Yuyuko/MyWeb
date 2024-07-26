// src/utils/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'myContentDB';
const DB_VERSION = 6; // Increment the version
const CONTENT_STORE = 'content';
const IMAGE_STORE = 'images';
const PROJECT_STORE = 'projects';
const ABOUT_ME_STORE = 'aboutMe';
const ADMIN_STORE = 'admin'; // Add a new store for admin information

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(CONTENT_STORE)) {
        db.createObjectStore(CONTENT_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(IMAGE_STORE)) {
        db.createObjectStore(IMAGE_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(PROJECT_STORE)) {
        db.createObjectStore(PROJECT_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(ABOUT_ME_STORE)) {
        db.createObjectStore(ABOUT_ME_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(ADMIN_STORE)) {
        db.createObjectStore(ADMIN_STORE, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

// Content methods
export const saveContent = async (content) => {
  const db = await initDB();
  await db.put(CONTENT_STORE, { ...content, id: 1 });
};

export const getContent = async () => {
  const db = await initDB();
  return await db.get(CONTENT_STORE, 1);
};

// About Me methods
export const saveAboutMe = async (aboutMe) => {
  const db = await initDB();
  await db.put(ABOUT_ME_STORE, { ...aboutMe, id: 1 });
};

export const getAboutMe = async () => {
  const db = await initDB();
  return await db.get(ABOUT_ME_STORE, 1);
};

// Image methods
export const addImage = async (image) => {
  const db = await initDB();
  await db.add(IMAGE_STORE, { image });
};

export const getImages = async () => {
  const db = await initDB();
  return await db.getAll(IMAGE_STORE);
};

export const deleteImage = async (id) => {
  const db = await initDB();
  await db.delete(IMAGE_STORE, id);
};

// Project methods
export const addProject = async (project) => {
  const db = await initDB();
  await db.add(PROJECT_STORE, project);
};

export const getProjects = async () => {
  const db = await initDB();
  return await db.getAll(PROJECT_STORE);
};

export const deleteProject = async (id) => {
  const db = await initDB();
  await db.delete(PROJECT_STORE, id);
};

export const editProject = async (project) => {
  const db = await initDB();
  await db.put(PROJECT_STORE, project);
};

// Admin methods
export const addAdmin = async (admin) => {
  const db = await initDB();
  await db.add(ADMIN_STORE, admin);
};

export const getAdmin = async (id) => {
  const db = await initDB();
  return await db.get(ADMIN_STORE, id);
};

export const getAdmins = async () => {
  const db = await initDB();
  return await db.getAll(ADMIN_STORE);
};

export const deleteAdmin = async (id) => {
  const db = await initDB();
  await db.delete(ADMIN_STORE, id);
};

export const editAdmin = async (admin) => {
  const db = await initDB();
  await db.put(ADMIN_STORE, admin);
};
