import { TextGenerateEffect } from "@/components/text-generate-effect";

export default function Home() {
  const words = "Your platform for quick and efficient project management."

  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <TextGenerateEffect words={words} className="" />
    </div>
  );
}
