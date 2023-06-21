'use client'

import React, { ReactNode, createContext, useMemo } from 'react'
import {
	BuildingThemeType,
	BuildingThemeTypes,
	BuildingType,
	BuildingTypes,
} from '@redesigner/utils/buildingTypes'

type ContextProps = {
	buildingType: BuildingType | null
	setBuildingType: (buildingType: BuildingType | null) => void
	buildingTheme: BuildingThemeType | null
	setBuildingTheme: (buildingTheme: BuildingThemeType | null) => void
}

export const BuildingContext = createContext<ContextProps>({
	buildingType: BuildingTypes[0],
	setBuildingType: buildingType => {},
	buildingTheme: BuildingThemeTypes[0],
	setBuildingTheme: buildingTheme => {},
})

export const BuildingProvider = ({ children }: { children: ReactNode }) => {
	const [buildingType, setBuildingType] = React.useState<
		ContextProps['buildingType']
	>(BuildingTypes[0])
	const [buildingTheme, setBuildingTheme] = React.useState<
		ContextProps['buildingTheme']
	>(BuildingThemeTypes[0])

	const value = useMemo(
		() => ({
			buildingType,
			setBuildingType,
			buildingTheme,
			setBuildingTheme,
		}),
		[buildingType, setBuildingType, buildingTheme, setBuildingTheme],
	)

	return (
		<BuildingContext.Provider value={value}>
			{children}
		</BuildingContext.Provider>
	)
}
