import ContainerIndex from "@/components/index/Index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index | Project Management App",
  description: "Page of index aplication.",
};

export default function Home() {
  return (
    <div>
      <ContainerIndex />
    </div>
  );
}
