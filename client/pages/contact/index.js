import React from "react";
import Link from "next/link";

const Contact = () => {
  return <div>
    <div className="grid grid-cols-2 gap-4">
        <div className="mt-20">
            <h1 className="text-center font-black text-[50px]">Contact Us</h1>
        </div>
        <div>
            <img src="/images/contact-us.jpg" alt="contact us" />
        </div>
    </div>
    <div className="w-2/3 mx-auto grid grid-cols-2 gap-1">
    <div className="flex justify-center">
  <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
    <h5 className="text-gray-900 text-xl leading-tight font-bold mb-2 text-center">Talk to a member of our team</h5>
    <p className="text-gray-700 text-base mb-4">
    We’ll help you find the right course for your growth.
    </p>
    <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
  </div>
</div>
{/* Second card */}
<div className="flex justify-center">
  <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
    <h5 className="text-gray-900 text-xl leading-tight font-bold mb-2 text-center">Courses and Account Support</h5>
    <p className="text-gray-700 text-base mb-4">
    Our help center is fresh and always open for business. If you can’t find the answer you’re looking for, we’re here to lend a hand.
    </p>
    <button type="button" className=" inline-block px-6 py-2.5 bg-brightRedLight text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-brightRed hover:shadow-lg focus:bg-brightRed focus:shadow-lg focus:outline-none focus:ring-0 active:bg-brightRed active:shadow-lg transition duration-150 ease-in-out"><Link href="/support" className="text-white">Contact Help Center</Link></button>
  </div>
</div>
    </div>
  </div>;
};

export default Contact;
