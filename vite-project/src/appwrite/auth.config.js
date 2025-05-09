import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccont({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      console.log("createdUser: ", userAccount);

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }     
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error", error.message);
    }
  }

  async login({ email, password }) {
    try {
      console.log(email);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: error", error.message);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error.message);
    }
    return null;
  }

  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logOut :: error", error.message);
    }
  }
}

const authService = new AuthService();

export default authService;
