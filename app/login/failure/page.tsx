// app/login/failure/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import appwriteConfig from '@/constants/appwrite_config'; // ✅ default export

export default function Failure() {
  const router = useRouter();

  useEffect(() => {
    appwriteConfig.getCurUser().then((user: any) => {
      if (user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
        router.push('/landing'); // ✅ send to landing if still logged in
      }
    });
  }, [router]);

  return <p>Login failed. Please try again.</p>;
}
