import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'

const Header = () => {
	const [theme, setTheme] = React.useState<string>('dark')
	return (
		<header className="py-6 flex justify-between">
			<Link href="..">
				<h1 className="text-2xl md:text-4xl font-bold">redesigner.io</h1>
			</Link>
			<div className="flex flex-row gap-8">
				<a
					href="https://github.com/bgwebagency/redesigner.io"
					target="_blank"
					rel="noreferrer"
					className="hover:opacity-50 transition duration-150"
					aria-label="Github"
				>
					<AiFillGithub size={32} />
				</a>
				<div className="w-[2.5em] hover:cursor-pointer">
					{theme === 'dark' ? (
						<BsMoonStarsFill
							aria-label="moon"
							size={26}
							className="mt-1"
							onClick={() => {
								setTheme('light')
								document.body.classList.toggle('dark')
							}}
						/>
					) : (
						<BsSunFill
							aria-label="sun"
							size={32}
							onClick={() => {
								setTheme('dark')
								document.body.classList.toggle('dark')
							}}
						/>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
