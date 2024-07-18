import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const users = [
  { id: '42', name: 'Yucan', password: '123456' },
  { id: '43', name: 'danyelle@metanoya.ca', password: '6472609736' },
  { id: '44', name: 'Bob', password: 'mypassword' },
  // Add more users here
];

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'Enter username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Enter password',
        },
      },
      async authorize(credentials) {
        // Find the user that matches the provided credentials
        // This is where you need to retrieve user data 
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = users.find(
          user => user.name === credentials?.username && user.password === credentials?.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
