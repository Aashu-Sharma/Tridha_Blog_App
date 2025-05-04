import config from '../config/config.js';
import {Client, Databases, Storage, ID, Query } from 'appwrite';
import {uploadOnCloudinary} from '../utils/cloudinary.js';

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
            // return await this.bucket.createFile(
            //     config.appwriteBucketId,
            //     ID.unique(),
            //     file,
            // )

            const imageFromCloudinary = await uploadOnCloudinary(file);

            console.log("image from cloudinary: ", imageFromCloudinary )

            return imageFromCloudinary.url;


            
        } catch (error) {
            console.log("Database service :: uploadFile :: error", error.message);
            return false;
        }
    }

    async deleteFile(file){
        try {
            // await this.bucket.deleteFile(
            //     config.appwriteBucketId,
            //     fileId,
            // )
            // return true;
            // await deleteFromCloudinary(file);
            // return true;

            
        } catch (error) {
            console.log("Database service :: deleteFile :: error", error.message);
            return false;
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService