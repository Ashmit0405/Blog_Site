import React,{useState,useEffect} from "react";
import serv from "../appwrite/config";
import { Container,PostCard } from "../Components";
import { data } from "autoprefixer";
export default function Home(){
    const [posts,setposts]=useState([]);
    useEffect(()=>{
        serv.getall().then((posts)=>{
            if(posts){
                setposts(posts.documents);
            }
        })
    },[])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-3xl font-semibold hover:text-gray-500">
                                WELCOME TO BLOG SITE
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}