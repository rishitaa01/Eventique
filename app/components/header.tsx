'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppwriteConfig } from '@/constants/appwrite_config';




export default function Header() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const appwriteConfig = new AppwriteConfig();
  const router = useRouter();

  // run only in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('userInfo') || '{}');
      setUserInfo(stored);
    }
  }, []);

  return (
    <button
      onClick={async () => {
        if (userInfo) {
          const success = await appwriteConfig.signOut();
          if (success) {
            localStorage.removeItem('userInfo');
            router.push('/login');
          }
        }
      }}
    >
      Sign Out
    </button>
  );
}
