import React from 'react'
import {
	AiFillTwitterCircle,
	AiFillInstagram,
	AiFillYoutube,
	AiFillLinkedin,
} from 'react-icons/ai'

import { FaDiscord } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'
import { BsTiktok } from 'react-icons/bs'

const Footer = () => {
	return (
		<footer className="flex justify-between md:justify-center md:gap-16 mt-20 mb-4">
			<a
				href="https://twitter.com/kirankdash"
				target="_blank"
				rel="noreferrer"
				className="hover:opacity-50 transition duration-150"
				aria-label="Twitter"
			>
				<AiFillTwitterCircle size={20} />
			</a>
			<a
				href="https://discord.gg/62VR3MMCVm"
				target="_blank"
				rel="noreferrer"
				className="hover:opacity-50 transition duration-150"
				aria-label="Discord"
			>
				<FaDiscord size={20} />
			</a>
			<a
				href="https://www.youtube.com/@bgwebagency"
				target="_blank"
				rel="noreferrer"
				className="hover:opacity-50 transition duration-150"
				aria-label="Youtube"
			>
				<AiFillYoutube size={20} />
			</a>
			<a
				href="https://bgwebagency.in"
				target="_blank"
				rel="noreferrer"
				className="hover:opacity-50 transition duration-150"
				aria-label="BG Web Agency website"
			>
				<TbWorldWww size={20} />
			</a>
			<a
				href="https://www.tiktok.com/@bgwebagency"
				target="_blank"
				rel="noreferrer"
				className="hover:opacity-50 transition duration-150"
				aria-label="Tiktok"
			>
				<BsTiktok size={20} />
			</a>
			<a
				href="https://www.instagram.com/bgwebagency/"
				target="_blank"
				rel="noreferrer"
				className="hover:opacity-50 transition duration-150"
				aria-label="Instagram"
			>
				<AiFillInstagram size={20} />
			</a>
			<a
				href="https://www.linkedin.com/in/kiran-dash/"
				target="_blank"
				rel="noreferrer"
				className="hover:opacity-50 transition duration-150"
				aria-label="Linkedin"
			>
				<AiFillLinkedin size={20} />
			</a>
		</footer>
	)
}

export default Footer
