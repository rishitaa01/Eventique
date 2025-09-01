'use client';

import {
  Client,
  Account,
  Models,
  ID,
  Databases,
  Storage,
} from 'appwrite';
import { User } from './interface';

export class AppwriteConfig {
  databaseId = process.env.NEXT_PUBLIC_DATABASEID as string;
  activeCollId = process.env.NEXT_PUBLIC_EVENT_COLLID as string;
  bannerBucketId = process.env.NEXT_PUBLIC_EVENTBUCKET as string;

  client: Client = new Client();
  account: Account = new Account(this.client);
  databases: Databases = new Databases(this.client);
  storage: Storage = new Storage(this.client);
  user: User = {} as User;

  constructor() {
    this.client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_PROJECTID as string);
  }

  // Google OAuth
  googlelog() {
    this.account.createOAuth2Session(
      'google',
      `${process.env.NEXT_PUBLIC_APPURL}/login/success`,
      `${process.env.NEXT_PUBLIC_APPURL}/login/failure`
    );
  }

  // GitHub OAuth
  githublog() {
    this.account.createOAuth2Session(
      'github',
      `${process.env.NEXT_PUBLIC_APPURL}/login/success`,
      `${process.env.NEXT_PUBLIC_APPURL}/login/failure`
    );
  }

  // Current user
  async getCurUser(): Promise<User | null> {
    try {
      const res = await this.account.get();
      this.user = res as unknown as User;
      localStorage.setItem('userInfo', JSON.stringify(this.user));
      return this.user;
    } catch {
      return null;
    }
  }
}

// ✅ Export both the class and an instance
export const appwrite = new AppwriteConfig();
