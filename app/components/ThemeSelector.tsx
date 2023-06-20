'use client'

import React from 'react'
import { RoomThemeType } from '@redesigner/utils/roomTypes'
import clsx from 'clsx'
import { BuildingThemeType } from '@redesigner/utils/buildingTypes'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type Props = {
	options: RoomThemeType[] | BuildingThemeType[]
	className?: string
	selected: RoomThemeType | BuildingThemeType
	onChange: (item: RoomThemeType | BuildingThemeType) => void
}

const ThemeSelector = ({
	options,
	className,
	selected,
	onChange,
	...props
}: Props) => {
	const pathname = usePathname() === '/room' ? 'bedroom' : 'building'

	return (
		<div
			className={clsx(
				'grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6',
				className,
			)}
			{...props}
		>
			{options.map(item => (
				<button
					key={item}
					className={clsx(
						'flex flex-col items-center justify-center border rounded-lg px-4 py-2 text-xs md:text-sm',

						item === selected && 'border-primary text-primary',
					)}
					onClick={() => onChange(item)}
				>
					<Image
						src={`/${pathname}-${item.toLowerCase()}.jpg`}
						width={100}
						height={100}
						alt="Its a type of bedroom"
						className="mb-2 mx-auto"
					/>
					{item}
				</button>
			))}
		</div>
	)
}

export default ThemeSelector
