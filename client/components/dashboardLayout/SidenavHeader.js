import React, { useContext } from 'react'
// import Image from "next/image";
import { Context } from '../../context'

const SidenavHeader = () => {
  const {
    state: { user },
  } = useContext(Context)

  return (
    <div className="flex flex-col items-center ml-1 pt-4 pb-8">
      {user && (
        <img
          className="object-cover mr-2  rounded-full"
          src={!user.image ? '/images/profile.png' : user.image.Location}
          alt="Profile image"
          width={100}
          height={100}
        />
      )}
      <a
        href="#"
        className="text-xl font-bold mt-4 pl-1 no-underline text-green-50 hover:text-green-100"
      >
        {user && user.name}
      </a>
    </div>
  )
}

export default SidenavHeader
