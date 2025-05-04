const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID ),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteEbooksCollectionId: String(import.meta.env.VITE_APPWRITE_EBOOKS_COLLECTION_ID),
    appwriteBlogsCollectionId: String(import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    cloudinaryCloudName: String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
    cloudinaryAPIKey: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
    cloudinaryAPISecret: String(import.meta.env.VITE_CLOUDINARY_API_SECRET)
}

export default config;