'use client'

import React from 'react'
import { RoomThemeType } from '@redesigner/utils/roomTypes'
import clsx from 'clsx'
import { BuildingThemeType } from '@redesigner/utils/buildingTypes'
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
  //Get the path
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6',
        className
      )}
      {...props}
    >
      {options.map((item) => (
        <button
          key={item}
          className={clsx(
            'border rounded-lg px-4 py-2 text-xs md:text-sm',
            item === selected && 'border-primary text-primary'
          )}
          onClick={() => onChange(item)}
        >
          <img src={ pathname === '/room' ? `${pathname}-${item.toLowerCase()}.jpg` : `${pathname}-${item.toLowerCase()}.png` }/>
          {item}
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector
