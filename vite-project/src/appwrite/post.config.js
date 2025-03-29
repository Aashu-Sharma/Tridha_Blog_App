// import config from "../config/config.js";
// // import {useId} from 'react'
// import { Client, ID, Databases, Storage, Query } from "appwrite";

// // const id = useId();

// export class DatabaseService {
//   client = new Client();
//   databases;
//   bucket;

//   constructor() {
//     this.client
//       .setEndpoint(config.appwriteUrl)
//       .setProject(config.appwriteProjectId);

//     this.databases = new Databases(this.client);
//     this.bucket = new Storage(this.client);
//   }

//   async createPost({ title, slug, content, featured_image, status, userId }) {
//     try {
//       return await this.databases.createDocument(
//         config.appwriteDatabaseId,
//         config.appwriteCollectionId,
//         // slug,
//         ID.unique(),
//         {
//           title,
//           content,
//           featured_image,
//           status,
//           userId,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite databaseService :: createPost :: error", error);
//     }
//   }

//   async updatePost(slug, { title, content, featured_image, status, userId }) {
//     try {
//       return await this.databases.updateDocument(
//         config.appwriteDatabaseId,
//         config.appwriteCollectionId,
//         slug,
//         {
//           title,
//           content,
//           featured_image,
//           status,
//           userId,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite databaseService :: updatePost :: error", error);
//     }
//   }

//   async deletePost(slug) {
//     try {
//       await this.databases.deleteDocument(
//         config.appwriteDatabaseId,
//         config.appwriteCollectionId,
//         slug
//       );
//       return true;
//     } catch (error) {
//       console.log("Appwrite databaseService :: deletePost :: error", error);
//       return false;
//     }
//   }

//   async getPost(slug) {
//     try {
//       return await this.databases.getDocument(
//         config.appwriteDatabaseId,
//         config.appwriteCollectionId,
//         slug
//       );
//     } catch (error) {
//       console.log("Appwrite databaseService :: getPost :: error", error);
//       return false;
//     }
//   }

//   async getPosts(queries = [Query.equal("status", "active")]) {
//     try {
//       return await this.databases.listDocuments(
//         config.appwriteDatabaseId,
//         config.appwriteCollectionId,
//         queries
//       );
//     } catch (error) {
//       console.log(
//         "Appwrite databaseService :: getPosts :: error",
//         error.message
//       );
//       return false;
//     }
//   }

//   async uploadFile(file) {
//     try {
//       console.log(file);
//       return await this.bucket.createFile(
//         config.appwriteBucketId,
//         ID.unique(),
//         file
//       );
//     } catch (error) {
//       console.log("Appwrite databaseService :: uploadFile :: error", error);
//       return false;
//     }
//   }

//   async deleteFile(fileId) {
//     try {
//       await this.bucket.deleteFile(config.appwriteBucketId, fileId);
//       return true;
//     } catch (error) {
//       console.log("Appwrite databaseService :: deleteFile :: error", error);
//       return false;
//     }
//   }

//   getFilePreview(fileId) {
//     try {
//       return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
//     } catch (error) {
//       console.log(
//         "Appwrite databaseService :: getFilePreview :: error",
//         error.message
//       );
//     }
//   }
// }

// const databaseService = new DatabaseService();

// export default databaseService;

import config from '../config/config.js';
import {Client, Databases, Storage, ID, Query } from 'appwrite';

export class DatabaseService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, content, featured_image, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteBlogsCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featured_image,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Database service :: createPost :: error", error.message);
        }
    }

    async updatePost(slug,{title, content, featured_image, status, userId}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteBlogsCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Database service :: updatePost :: error", error.message);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteBlogsCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Database service :: deletePost :: error", error.message);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteBlogsCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Database service :: getPost :: error", error.message);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteBlogsCollectionId,
                queries
            )
        } catch (error) {
            console.log("Database service :: getPosts :: error", error.message);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Database service :: uploadFile :: error", error.message);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Database service :: deleteFile :: error", error.message);
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("Database service :: deleteFile :: error", error.message);
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService