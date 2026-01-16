// Mock authentication

export const loginUser = (username: string, password: string) => {
  // TODO: Implement API call to login user
  return {
    id: 1,
    name: 'User',
    username: 'user',
    email: 'user@example.com',
  };
};

export const loginAdmin = (username: string, password: string) => {
  if (username === 'admin' && password === 'admin') {
    return {
      id: 1,
      name: 'Admin',
      username: 'admin',
      email: 'admin@example.com',
      permissions: ['admin'],
    };
  }

  throw new Error('Invalid username or password');
};
