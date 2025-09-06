'use client'

import { useRouter } from 'next/navigation';

export default function IndexPage() {

    const router = useRouter();

    return (
        <>
            <div className="w-full mx-auto px-3 py-6">
              
                index page 
             
            </div>
        </>
    )
}

