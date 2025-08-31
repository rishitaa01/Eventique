// app/login/success/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppwriteConfig } from '@/constants/appwrite_config';


export default function Success() {
  const router = useRouter();
  const appwrite = new AppwriteConfig();

  useEffect(() => {
    appwrite.getCurUser().then((user: any) => {
      if (user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
        router.push('/landing');
      }
    });
  }, []);

  return <p>Logging you in...</p>;
}
