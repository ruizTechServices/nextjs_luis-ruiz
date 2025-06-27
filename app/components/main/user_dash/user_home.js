// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\components\main\user_dash\user_home.js
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    const params = useParams();
    const id = params.id;
    const { user, isSignedIn, isLoaded } = useUser();
    const [userInfo, setUserInfo] = useState(null);
    const [userImage, setUserImage] = useState();
    const [userImageURL, setUserImageURL] = useState();
    const [userImageName, setUserImageName] = useState();
    const [currentDate, setCurrentDate] = useState();

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            console.log("No active session. Clerk middleware should handle redirection.");
            // Optionally, you can still redirect here if Clerk middleware is not configured to do so
            // router.push("/sign-in");
        }
    }, [isLoaded, isSignedIn]);

    const now = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDateTime = now.toLocaleDateString(undefined, options);


    return (
        <div className="flex flex-col h-screen p-10">
            <div className="flex flex-col text-center items-center p-4">
                <p className="text-5xl font-bold">{formattedDateTime}</p>
                <div className="rounded-full border-2 border-gray-200 w-fit">
                    <Image src={"/images/logo_lr.png"} width={100} height={100} alt="Luis Ruiz Tech Services Logo" />
                </div>
            </div>
            {user && (
                <div className="rounded-lg p-4 mt-4 w-fit">
                    <h2 className="font-bold text-2xl">User Information</h2>
                    <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
                    <p>User Name: {user?.fullName || user?.id}</p>
                </div>
            )}


        </div>
    );
}