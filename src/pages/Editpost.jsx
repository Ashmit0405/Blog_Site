import React,{useState,useEffect} from "react";
import { Container,PostForm } from "../Components";
import serv from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

export default function Editpost(){
    const [post,setpost]=useState([]);
    const {slug}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        if(slug){
        serv.getpost(slug).then((post)=>{
            if(post){
                setpost(post);
            }
        })
        }
        else{
            navigate("/");
        }
    },[slug,navigate]);

    return post?(<div className="py-8">
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>):null;
}