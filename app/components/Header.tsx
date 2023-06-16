import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'

const Header = () => {
  return (
    <header className="py-6 flex justify-between">
      <Link href="..">
        <h1 className="text-2xl md:text-4xl font-bold">redesigner.io</h1>
      </Link>
      <div>
        <a
          href="https://github.com/bgwebagency/redesigner.io"
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-50 transition duration-150"
        >
          <AiFillGithub size={32}/>
        </a>
      </div>
    </header>
  )
}

export default Header
