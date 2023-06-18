'use client'

import React, { useContext, useEffect } from 'react'
import UploadComponent from 'components/UploadComponent'
import Dropdown from 'components/Dropdown'
import {
  RoomThemeType,
  RoomThemeTypes,
  RoomType,
  RoomTypes,
} from '@redesigner/utils/roomTypes'
import ThemeSelector from 'components/ThemeSelector'
import { RoomContext } from '@redesigner/app/context/RoomContext'
import { BuildingContext } from '@redesigner/app/context/BuildingContext'


const Room = () => {
  const { roomType, setRoomType, roomTheme, setRoomTheme } =
    useContext(RoomContext)
  const { setBuildingType, setBuildingTheme } = useContext(BuildingContext)
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    setBuildingType(null)
    setBuildingTheme(null)
    setRoomType(RoomTypes[0])
    setRoomTheme(RoomThemeTypes[0])
    setLoading(false)
  }, [])

  return (
    <div className="mb-auto">
      <div className="flex flex-col justify-center mt-8 md:mt-14 2xl:mt-40">
        {loading ? null : (
          <>
            {/* Room type */}
            <div>
              <label className="mb-2 block text-sm">Select Room type</label>
              <Dropdown
                options={RoomTypes}
                label="Room Type"
                className="mb-3"
                selected={roomType as RoomType}
                onChange={(item) => setRoomType(item as RoomType)}
              />
            </div>
            {/* Theme type */}
            <div>
              <label className="mb-2 block text-sm">Select Room theme</label>
              <ThemeSelector
                options={RoomThemeTypes}
                selected={roomTheme as RoomThemeType}
                onChange={(item) => setRoomTheme(item)}
                className="mb-3"
              />
            </div>
            {/* Room theme */}
            <UploadComponent />
          </>
        )}
      </div>
    </div>
  )
}

export default Room
