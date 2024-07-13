import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteprojectid);

        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    
    async createpost({title,slug,content,image,status,userid}){
        try {
            return await this.databases.createDocument(conf.appwritedbid,conf.appwritecollid,slug,{
                title,
                content,
                image,
                status,
                userid
            })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
        return null;
    }

    async updatepost(slug,{title,content,image,status}){
        try {
            return await this.databases.updateDocument(conf.appwritedbid,conf.appwritecollid,slug,{
                title,
                content,
                image,
                status
            })
        } catch (error) {
            console.log(error);
        }
    }

    async deletepost(slug){
        try {
            await this.databases.deleteDocument(conf.appwritedbid,conf.appwritecollid,slug);
            return true;    
        } catch (error) {
            console.log(error);        
            return false;
        }
    }

    async getpost(slug){
        try {
            return await this.databases.getDocument(conf.appwritedbid,conf.appwritecollid,slug);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getall(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwritedbid,conf.appwritecollid,queries);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async uploadfile(file){
        try {
            return this.bucket.createFile(conf.appwritebucketid,ID.unique(),file);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deletefile(fileid){
        try {
            await this.bucket.deleteFile(conf.appwritebucketid,fileid);
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    getFileprev(fileid){
        try {
          return this.bucket.getFilePreview(conf.appwritebucketid,fileid);  
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

const serv=new Service();
export default serv;