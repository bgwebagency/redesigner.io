'use client'

import React, { ReactNode, createContext, useMemo } from 'react'
import {
	RoomThemeType,
	RoomThemeTypes,
	RoomType,
	RoomTypes,
} from '@redesigner/utils/roomTypes'

type ContextProps = {
	roomType: RoomType | null
	setRoomType: (roomType: RoomType | null) => void
	roomTheme: RoomThemeType | null
	setRoomTheme: (roomTheme: RoomThemeType | null) => void
}

export const RoomContext = createContext<ContextProps>({
	roomType: RoomTypes[0],
	setRoomType: roomType => {},
	roomTheme: RoomThemeTypes[0],
	setRoomTheme: roomTheme => {},
})

export const RoomProvider = ({ children }: { children: ReactNode }) => {
	const [roomType, setRoomType] = React.useState<ContextProps['roomType']>(
		RoomTypes[0],
	)
	const [roomTheme, setRoomTheme] = React.useState<ContextProps['roomTheme']>(
		RoomThemeTypes[0],
	)

	const value = useMemo(
		() => ({
			roomType,
			setRoomType,
			roomTheme,
			setRoomTheme,
		}),
		[roomType, setRoomType, roomTheme, setRoomTheme],
	)

	return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}
