'use client';

import {
  Client,
  Account,
  Models,
  ID,
  Databases,
  Storage,
  Permission,
  Role,
} from 'appwrite';
import { User } from './interface';

interface Sponsors {
  id: number;
  name: string;
  url: string;
}

class ServerConfig {
  client: Client = new Client();
  regDb: string = `${process.env.NEXT_PUBLIC_REGDB}`;
  sponDb: string = `${process.env.NEXT_PUBLIC_SPODB}`;
  databases: Databases = new Databases(this.client);

  constructor() {
    this.client
      .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`);
  }

  createRegColl(id: string, name: string) {
    console.warn('Collections must be created in the Appwrite Console.');
  }

  createSponColl(id: string, name: string, sponsor: Sponsors[], user: string) {
    console.warn('Collections must be created in the Appwrite Console.');
  }
}

class AppwriteConfig {
  databaseId: string = `${process.env.NEXT_PUBLIC_DATABASEID}`;
  activeCollId: string = `${process.env.NEXT_PUBLIC_EVENT_COLLID}`;
  bannerBucketId: string = `${process.env.NEXT_PUBLIC_EVENTBUCKET}`;
  regDbId: string = `${process.env.NEXT_PUBLIC_REGDB}`;

  client: Client = new Client();
  account: Account = new Account(this.client);
  databases: Databases = new Databases(this.client);
  storage: Storage = new Storage(this.client);
  user: User = {} as User;

  constructor() {
    this.client
      .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`);
  }

  // ✅ Google OAuth
  googlelog(): void {
    this.account.createOAuth2Session(
      'google',
      `${process.env.NEXT_PUBLIC_APPURL}/login/success`,
      `${process.env.NEXT_PUBLIC_APPURL}/login/failure`
    );
  }

  // ✅ GitHub OAuth
  githublog(): void {
    this.account.createOAuth2Session(
      'github',
      `${process.env.NEXT_PUBLIC_APPURL}/login/success`,
      `${process.env.NEXT_PUBLIC_APPURL}/login/failure`
    );
  }

  // ✅ Fetch current user (after login)
  async getCurUser(): Promise<User | null> {
    try {
      const res = await this.account.get();
      this.user = res as unknown as User;
      localStorage.setItem('userInfo', JSON.stringify(this.user));
      return this.user;
    } catch (err) {
      console.error('Error fetching user:', err);
      return null;
    }
  }

  // ✅ Email signup
  async emailSignUp(name: string, email: string, password: string): Promise<void> {
    try {
      await this.account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.error(error);
    }
  }

  // ✅ Email login
  emailLogin(email: string, password: string): Promise<Models.Session> {
    return this.account.createEmailSession(email, password);
  }

  // ✅ Sign out
  async signOut(): Promise<boolean> {
    try {
      await this.account.deleteSession('current');
      localStorage.removeItem('userInfo');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // ✅ Magic URL login (requires SMTP setup in Appwrite console!)
  magicUrlLogin(email: string): void {
    this.account.createMagicURLSession(
      ID.unique(),
      email,
      `${process.env.NEXT_PUBLIC_APPURL}/login/success`
    );
  }

  // ✅ Event creation
  async createEvent(
    eventname: string,
    description: string,
    banner: File,
    hostname: string,
    eventdate: string,
    email: string,
    country: string,
    address: string,
    city: string,
    state: string,
    postal: string,
    audience: string,
    type: string,
    attendees: number,
    price: number,
    tech: string,
    agenda: string,
    sponsor: Sponsors[],
    approval: string,
    twitter: string,
    website: string,
    linkedin: string,
    instagram: string,
  ): Promise<string> {
    try {
      const uploaded = await this.storage.createFile(this.bannerBucketId, ID.unique(), banner);

      await this.databases.createDocument(this.databaseId, this.activeCollId, ID.unique(), {
        eventname,
        description,
        url: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${this.bannerBucketId}/files/${uploaded.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}`,
        hostname,
        eventdate,
        email,
        country,
        address,
        city,
        state,
        postal,
        audience,
        type,
        attendees,
        price,
        tech,
        agenda,
        approval,
        created: JSON.parse(localStorage.getItem('userInfo') || '{}').$id,
        twitter,
        website,
        linkedin,
        instagram,
        registrations: [],
      });

      return 'success';
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }
}

export { AppwriteConfig, ServerConfig };

const regDb: string = process.env.NEXT_PUBLIC_REGDB as string;
const sponDb: string = process.env.NEXT_PUBLIC_SPODB as string;
const eventCollId: string = process.env.NEXT_PUBLIC_EVENT_COLLID as string;
const eventBucketId: string = process.env.NEXT_PUBLIC_EVENTBUCKET as string;

export { regDb, sponDb, eventCollId, eventBucketId };