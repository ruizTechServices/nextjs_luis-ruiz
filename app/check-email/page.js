import Head from "next/head";
import React from "react";

export default function CheckEmail() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Head>
        <title>Registration Successful</title>
        <meta name="description" content="Thank you for registering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Thank you for registering</h1>
        <p className="mt-4">
          Kindly, check your email and finish the steps to login into your
          account.
        </p>
      </div>
    </div>
  );
}
