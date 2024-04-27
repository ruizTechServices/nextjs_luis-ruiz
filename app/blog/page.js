//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\blog\page.js
"use client";
import React from "react";
import { BlogEntriesList } from "../components/main/blog/blogEntryList";

export default function Blog() {
    return (
        <div className="container mx-auto">
            <div className="container mx-auto text-center">
                <div className="flex flex-col justify-center align-middle items-center border p-20">
                    <h1 className="font-bold text-4xl md:text-6xl">Gio&apos;s Blog</h1>
                    <p className="min-w-[250px]">This is where my actual thoughts lie to the public eye.<br/> <span className="text-[10px]">Reader discretion is advised.</span></p>
                </div>
            </div>
            <div className="container mx-auto shadow-2xl">
                {/**/}
                <BlogEntriesList />
                {/**/}
            </div>  
        </div>
    );
}
