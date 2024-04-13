import Head from "next/head";
import Image from "next/image";

export default function AboutMe() {
  return (
    <>
      <Head>
        <title>About Me - Luis Ruiz</title>
        <meta
          name="description"
          content="Learn more about Luis Ruiz, a full-stack web developer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 p-10 text-center">
          <h1 className="text-6xl font-bold bg-orange-700 text-white rounded-2xl shadow-2xl p-5">
            About Luis Ruiz
          </h1>
          <p className="mt-3 text-2xl">Full-Stack Web Developer</p>

          <div className="mt-6">
            <Image
              src="/images/luisIT.jpg"
              alt="Luis Ruiz"
              width={144}
              height={144}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col justify-evenly h-[500px] p-5">
            <p className="text-xl bg-white rounded-2xl w-full p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum in neque et nisl convallis finibus non ac libero.
              Mauris ultrices eros sit amet augue vestibulum, et molestie enim
              consequat. Fusce in magna quis lorem suscipit ullamcorper.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </p>
            <p className="text-xl bg-white rounded-2xl w-full p-4">
              In my career as a full-stack web developer, I&apos;ve had the
              opportunity to work on a variety of projects, ranging from small
              business websites to large, scalable web applications. I&apos;m
              passionate about using modern technologies to create
              user-friendly, responsive designs and efficient, maintainable
              backends.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
