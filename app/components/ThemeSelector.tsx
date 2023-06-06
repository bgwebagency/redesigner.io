'use client'

import React from 'react'
import { RoomThemeType } from '../../utils/roomTypes'
import clsx from 'clsx'
import { BuildingThemeType } from '../../utils/buildingTypes'

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
  return (
    <div className={clsx('grid grid-cols-5 gap-6', className)} {...props}>
      {options.map((item) => (
        <button
          key={item}
          className={clsx(
            'border rounded-lg px-4 py-2',
            item === selected && 'border-primary text-primary'
          )}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector
