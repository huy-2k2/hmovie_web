import React, { useState } from "react";
import useClick from "../hooks/useClick";

export default function Emoji({ status }) {
  const [parentRefUsers, childRefUser, openUsers] = useClick();
  return (
    <div>
      <span
        ref={parentRefUsers}
        className={`${
          status.id === 1
            ? "text-blue-500"
            : status.id === 2
            ? "text-red-500"
            : "text-yellow-500"
        } text-xl cursor-pointer`}
      >
        <i
          className={`${status.name} ${
            openUsers && "scale-150"
          } duration-100 hover:scale-150`}
        ></i>
      </span>
      <div
        ref={childRefUser}
        className={`${
          openUsers ? "flex" : "hidden"
        } absolute bottom-full max-h-[300px] overflow-y-auto left-0 flex-col gap-y-2 bg-gray-100 px-3 py-2 rounded-lg shadow-xl`}
      >
        {status.users.map((user) => (
          <span className="font-semibold text-gray-800">{user.name}</span>
        ))}
      </div>
    </div>
  );
}
