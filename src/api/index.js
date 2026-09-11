import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = axios.create({baseURL: BASE_URL});

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

function authHeader() {
  const accessToken = getAccessToken();
  return {Authorization: `Bearer ${accessToken}`};
}

// ===== AUTH =====

async function register({name, email, password}) {
  const response = await api.post('/register', {name, email, password});
  const {data} = response.data;
  return data.user;
}

async function login({email, password}) {
  const response = await api.post('/login', {email, password});
  const {data} = response.data;
  return data.token;
}

async function getOwnProfile() {
  const response = await api.get('/users/me', {headers: authHeader()});
  const {data} = response.data;
  return data.user;
}

async function getAllUsers() {
  const response = await api.get('/users');
  const {data} = response.data;
  return data.users;
}

// ===== THREADS =====

async function getAllThreads() {
  const response = await api.get('/threads');
  const {data} = response.data;
  return data.threads;
}

async function getThreadDetail(threadId) {
  const response = await api.get(`/threads/${threadId}`);
  const {data} = response.data;
  return data.detailThread;
}

async function createThread({title, body, category = ''}) {
  const response = await api.post(
      '/threads',
      {title, body, category},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.thread;
}

// ===== COMMENTS =====

async function createComment({threadId, content}) {
  const response = await api.post(
      `/threads/${threadId}/comments`,
      {content},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.comment;
}

// ===== VOTES: THREAD =====

async function upVoteThread(threadId) {
  const response = await api.post(
      `/threads/${threadId}/up-vote`,
      {},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.vote;
}

async function downVoteThread(threadId) {
  const response = await api.post(
      `/threads/${threadId}/down-vote`,
      {},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.vote;
}

async function neutralVoteThread(threadId) {
  const response = await api.post(
      `/threads/${threadId}/neutral-vote`,
      {},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.vote;
}

// ===== VOTES: COMMENT =====

async function upVoteComment(threadId, commentId) {
  const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/up-vote`,
      {},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.vote;
}

async function downVoteComment(threadId, commentId) {
  const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/down-vote`,
      {},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.vote;
}

async function neutralVoteComment(threadId, commentId) {
  const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {},
      {headers: authHeader()},
  );
  const {data} = response.data;
  return data.vote;
}

// ===== LEADERBOARD =====

async function getLeaderboards() {
  const response = await api.get('/leaderboards');
  const {data} = response.data;
  return data.leaderboards;
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  getLeaderboards,
};
