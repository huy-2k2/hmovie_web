import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-8 text-white bg-black border-t border-gray-600 gap-y-4">
      <div className="w-[120px]">
        <img className="object-cover w-full" src="/images/logoBig.png" alt="" />
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <div className="flex items-center justify-center w-10 h-10 border border-white rounded-full">
          <i class="fa-brands fa-facebook-f"></i>
        </div>
        <div className="flex items-center justify-center w-10 h-10 border border-white rounded-full">
          <i class="fa-brands fa-twitter"></i>
        </div>
        <div className="flex items-center justify-center w-10 h-10 border border-white rounded-full">
          <i class="fa-brands fa-google-plus-g"></i>
        </div>
        <div className="flex items-center justify-center w-10 h-10 border border-white rounded-full">
          <i class="fa-solid fa-wifi"></i>
        </div>
      </div>
      <div className="text-sm">&#169; Copyright. All rights reserved.</div>
    </div>
  );
}
