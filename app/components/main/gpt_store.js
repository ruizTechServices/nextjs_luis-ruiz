import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GptStore() {
    return (
        <div className="flex flex-col container mx-auto h-[800px] border text-center">
            <div>
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white m-10">
                    I also create Custom GPTs
                </h1>
                <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
                    A portfolio of Luis Ruiz&apos;s custom GPTs
                </p>
            </div>

            <div className="border w-3/4 mx-auto m-10"></div>

            <div className="border border-red-300 h-3/4 overflow-scroll mx-2">
                <div className="border border-blue-400 rounded-lg p-10 flex justify-evenly items-center">
                    <Image
                        src="/images/codeCombinator.png"
                        alt="Code Combinator"
                        width={120}
                        height={200}
                        className="rounded-xl"
                    />
                    <Link href={`https://chat.openai.com/g/g-SkMF8bytt-code-combinator`}>
                        Code Combinator By Luis Ruiz Combines Code Accurately and Effectively.
                    </Link>
                </div>
                <div className="border border-blue-400 rounded-lg p-10 flex justify-evenly items-center">
                    <Image
                        src="/images/webComponentGPT.jpg"
                        alt="Code Combinator"
                        width={120}
                        height={100}
                        className="rounded-xl"
                    />
                    <Link href={`https://chat.openai.com/g/g-8tspveaZR-web-component-wizard`}>
                        Converts all requests into web component code.
                    </Link>
                </div>
                <div className="border border-blue-400 rounded-lg p-10 flex justify-evenly items-center">
                    <Image
                        src="/images/bootstrapLitComponent.png"
                        alt="Code Combinator"
                        width={120}
                        height={200}
                        className="rounded-xl"
                    />
                    <Link href={`https://chat.openai.com/g/g-saRVk1Iz5-bootstrap-lit-web-component-builder`}>
                        Formal, professional expert in Bootstrap 5 and Lit components.
                    </Link>
                </div>


            </div>

        </div>
    );
}
