import {writeFileSync, readFileSync} from 'fs';


interface User {
  username: string;
  password: string;
}

// 存储用户数据文件的路径
const dataFilePath = './userData.json'

// 读取用户数据
export function readUsers(): User[] {
  try {
    const data = readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// 写入用户数据
export function writeUsers(users: User[]): void {
  const data = JSON.stringify(users, null, 2);
  writeFileSync(dataFilePath, data, 'utf8');
}

// 添加用户
export function addUser(user: User): boolean {
  const users = readUsers();
  if (users.some(u => u.username === user.username)) {
    return false; // 用户名已存在
  }
  users.push(user);
  writeUsers(users);
  return true;
}

// 根据用户名查找用户
export function findUserByUsername(username: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.username === username);
}

// 验证用户
export async function verifyUser(username: string, password: string): Promise<boolean> {
  const user = findUserByUsername(username);
  if (!user) {
    return false;
  }
  return password === user.password
}
