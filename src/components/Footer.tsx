import React from "react";
import Link from "next/link";
import Image from "next/image";

import Linkedin from "@/assets/icons/Linkedin";
import Facebook from "@/assets/icons/Facebook";
import Instagram from "@/assets/icons/Instagram";
import Youtube from "@/assets/icons/Youtube";
const navigation = {
  main: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Cookies", href: "#" }
  ],
  social: [
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/saiful-islam-18013313a/",
      icon: Linkedin
    },

    {
      name: "Facebook",
      href: "#",
      icon: Facebook
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram
    },
    {
      name: "YouTube",
      href: "#",
      icon: Youtube
    }
  ]
};

const Footer = () => {
  return (
    <footer className="bg-white border-t ">
      <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 py-2 md:flex md:items-center md:justify-between ">
        <div className="flex justify-center space-x-6 md:order-3">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:opacity-50  border-red-500 border-2 px-2.5 rounded-full py-2.5 hover:text-gray-500 dark:text-[#B8B8B8]">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-10 flex justify-center space-x-10  md:order-2">
          <nav
            className=" sm:flex sm:justify-center sm:space-x-12"
            aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a
                  href={item.href}
                  className="text-sm leading-6 text-gray-600  hover:text-gray-900 dark:text-white">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
        <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-3">
          <span className="sr-only">Your Company</span>
       
          <Image
            src="/icon-wallet.svg"
            alt="Vercel Logo"
            className=" mx-auto"
            width={50}
            height={30}
            priority
          />
          <h2 className="text-3xl font-bold mb-0">Wallet</h2>
       
        </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
