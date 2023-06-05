import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="py-6 flex justify-between">
      <Link href="..">
        <h1 className="text-2xl md:text-4xl font-bold">restoreportraits.com</h1>
      </Link>
      <div>
        <a
          href="https://github.com/bgwebagency/restoreportraits"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={'/github.svg'} alt="Github" width={32} height={32} />
        </a>
      </div>
    </header>
  )
}

export default Header
