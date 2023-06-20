'use client'

import React from 'react'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { RoomType } from '@redesigner/utils/roomTypes'
import clsx from 'clsx'
import { BuildingType } from '@redesigner/utils/buildingTypes'

type Props = {
	options: RoomType[] | BuildingType[]
	label: string
	className?: string
	selected: RoomType | BuildingType
	onChange: (item: RoomType | BuildingType) => void
}

export default function Dropdown({
	options,
	label,
	className,
	selected,
	onChange,
	...props
}: Props) {
	return (
		<div className={clsx(className, 'w-56')} {...props}>
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2  focus-visible:ring-opacity-75 border focus-visible:ring-white dark:border-white border-gray-950">
						{selected ?? label}
						<ChevronDownIcon
							className="ml-2 -mr-1 h-5 w-5"
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							{options.map(item => (
								<Menu.Item key={item}>
									{({ active }) => (
										<button
											onClick={() => onChange(item)}
											className={`${
												active || selected === item
													? 'bg-primary text-white'
													: 'text-gray-900'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										>
											{item}
										</button>
									)}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}
