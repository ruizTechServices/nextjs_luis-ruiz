// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\components\main\user_dash\user_home.js
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";
import Image from "next/image";

export default function Home() {
    const supabase = createClient();
    const params = useParams();
    const id = params.id;
    const [userInfo, setUserInfo] = useState(null);
    const [user, setUser] = useState();
    const [userImage, setUserImage] = useState();
    const [userImageURL, setUserImageURL] = useState();
    const [userImageName, setUserImageName] = useState();
    const [currentDate, setCurrentDate] = useState();


    useEffect(() => {
        const checkSession = async () => {
            const { data: session } = await supabase.auth.getSession();

            if (session) {
                setUser(session.user);
            } else {
                console.log("No active session. Redirecting to login...");
                router.push("/login");
            }
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, [supabase.auth]);

    const now = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDateTime = now.toLocaleDateString(undefined, options);


    return (
        <div className="flex flex-col h-screen p-10">
            <div className="flex flex-col text-center items-center p-4">
                <p className="text-5xl font-bold">{formattedDateTime}</p>
                <div className="rounded-full border-2 border-gray-200 w-fit">
                    <Image src={"/images/logo_lr.png"} width={100} height={100} />
                </div>
            </div>
            {user && (
                <div className="rounded-lg p-4 mt-4 w-fit">
                    <h2 className="font-bold text-2xl">User Information</h2>
                    <p>Email: {user.email}</p>
                    <p>User Name: {user.name}</p>
                </div>
            )}


        </div>
    );
}