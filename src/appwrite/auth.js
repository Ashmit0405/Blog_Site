import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteprojectid);
        this.account=new Account(this.client);    
    }

    async createacc({email,password,name}){
        try {
            const useracc=await this.account.create(ID.unique(),email,password,name);
            if(useracc){
                return this.login({email,password});
            }
            else{
                return useracc;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getcurrentuser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authserv=new AuthService();

export default authserv;