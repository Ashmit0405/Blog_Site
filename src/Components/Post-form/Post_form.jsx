import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import {Button,Select,Texteditor,Input} from "../index";
import serv from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}){
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title: post?.title||'',
            slug: post?.slug||'',
            content: post?.content||'',
            status: post?.status||'active',

        }
    });
    console.log(post);
    const navigate=useNavigate();
    const userdata=useSelector((state)=>state.auth.userdata);
    const submit=async(data)=>{
        if(post){
            const file=data.image[0]?await serv.uploadfile(data.image[0]):null;
            if(file){
                serv.deletefile(post.image);
            }
            const dbPost=await serv.updatepost(post.$id,{...data,image:file?file.$id:undefined});
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else{
            const file=data.image[0]?await serv.uploadfile(data.image[0]):null;
            if(file){
                const fileid=file.$id;
                data.image=fileid;
                const dbPost=await serv.createpost({...data,userid: userdata.$id});
                console.log(dbPost);
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugtransform=useCallback((value)=>{
        if(value&& typeof value==="string"){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-');
        }
        return "";
    },[]);

    React.useEffect(()=>{
    const curr=watch((value,{name})=>{
        if(name==="title"){
            setValue("slug",slugtransform(value.title),{shouldValidate:true});
        }
    })

    return ()=>{
        curr.unsubscribe();
    }
    },[watch,slugtransform,setValue])


    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-row gap-6">
            <div className="w-2/3">
                <Input 
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title",{required:true})}
                />
                <Input 
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug",{required:true})}
                onInput={(e)=>{
                    setValue("slug",slugtransform(e.currentTarget.value),{shouldValidate:true});
                }}
                />
                <Texteditor 
                label="Content"
                name="Content"
                control={control}
                defaultValue={getValues("content")}
                {...register("content",{required: true})}
                />
            <Button type="submit" bgColor={post?"bg-green-200":undefined} className="w-1/2 p-1"> 
                {post?"Update":"Submit"}
            </Button>
            </div>

            <div className="w-1/3 px-2">
            <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={serv.getFileprev(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
            </div>

        </form>
    )
}