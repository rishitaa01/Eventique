"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // Importing remark plugin

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Company", href: "#" },
  { name: "FAQ", href: "#" },
];

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Image
              src="/logo/logo-transparent-svg.svg"
              height={200}
              width={200}
              alt="Product Logo"
            />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Community to the rescue 🚀
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Events are a great way to connect with like-minded people. They also provide a great opportunity to learn and network with others in your field.
            </p>

{/* Using ReactMarkdown with remark plugin */}
<div>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {'## Markdown supported here'}
  </ReactMarkdown>
</div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="rounded-md bg-[#f02e65] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#990e3c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  if (localStorage.getItem("userInfo") != null) {
                    router.push("/landing");
                  } else {
                    router.push("/login");
                  }
                }}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
