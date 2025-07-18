// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\components\main\user_dash\settingsForm.js
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function Profile() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const { user, isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push("/sign-in");
            console.log("Redirecting to sign-in as user is not signed in.");
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || !isSignedIn) {
        return <>
            <div className="h-full p-4 max-w-4xl mx-auto">
                <p className="text-4xl animate-pulse">Loading...</p>
            </div>
        </>
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <form className="space-y-6">
                {/* Name Setting */}
                <div className="flex items-center justify-between">
                    <label htmlFor="name" className="flex-grow text-sm font-medium">
                        Name
                    </label>
                    <div className="w-full ml-2 flex gap-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={user.name} // Display logged-in user's name
                            className="input w-1/3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Phone Setting */}
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="phone" className="w-30 text-sm font-medium">
                        Phone Number
                    </label>
                    <div className="w-full ml-2 flex gap-2">
                        <input
                            id="phone"
                            name="phone"
                            defaultValue={user.primaryPhoneNumber?.phoneNumber} // Display logged-in user's phone
                            className="input w-1/3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="tel"
                        />
                    </div>
                </div>

                {/* Email Setting */}
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="email" className="w-30 text-sm font-medium">
                        Email Address
                    </label>
                    <div className="w-full ml-2 flex gap-2">
                        <input
                            id="email"
                            name="email"
                            defaultValue={user.primaryEmailAddress?.emailAddress} // Display logged-in user's email
                            className="input w-1/3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="email"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
}

export default Profile;
