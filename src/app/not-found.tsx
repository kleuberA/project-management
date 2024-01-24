import { ResetIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link'

export const metadata: Metadata = {
    title: "Not Found",
    description: "Page of not found.",
};

export default function NotFound() {
    return (
        <div className='relative w-full h-screen'>
            <div className='absolute top-[15%] right-[30%] -z-10'>
                <div className='text-primary text-[20rem] font-bold blur-sm'>
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </div>
            </div>
            <div className='z-10 flex flex-col gap-4 items-center justify-center w-full h-full'>
                <span className='text-6xl'>😢</span>
                <h2 className='text-3xl'>Not Found</h2>
                <p className='text-sm'>Could not find requested resource.</p>
                <Link
                    href="/home"
                    className='bg-primary p-3 text-xs rounded-sm flex flex-row gap-3 items-center border border-border hover:bg-primary/50 transition-all duration-150'>
                    <ResetIcon /> Return Home
                </Link>
            </div>
        </div>
    )
}