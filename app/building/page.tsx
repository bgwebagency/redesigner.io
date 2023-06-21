'use client'

import React, { useContext, useEffect } from 'react'
import UploadComponent from 'components/UploadComponent'
import Dropdown from 'components/Dropdown'
import {
	BuildingThemeType,
	BuildingThemeTypes,
	BuildingType,
	BuildingTypes,
} from '@redesigner/utils/buildingTypes'
import ThemeSelector from 'components/ThemeSelector'
import { BuildingContext } from '@redesigner/app/context/BuildingContext'
import { RoomContext } from '@redesigner/app/context/RoomContext'

const Building = () => {
	const { buildingType, setBuildingType, buildingTheme, setBuildingTheme } =
		useContext(BuildingContext)
	const { setRoomType, setRoomTheme } = useContext(RoomContext)
	const [loading, setLoading] = React.useState(true)

	useEffect(() => {
		setRoomType(null)
		setRoomTheme(null)
		setBuildingType(BuildingTypes[0])
		setBuildingTheme(BuildingThemeTypes[0])
		setLoading(false)
	}, [])

	return (
		<div className="mb-auto">
			<div className="flex flex-col justify-center mt-8 md:mt-14 2xl:mt-40">
				{loading ? null : (
					<>
						{/* Building type */}
						<div>
							<label className="mb-2 block text-sm">Select Building type</label>
							<Dropdown
								options={BuildingTypes}
								label="Building Type"
								className="mb-3"
								selected={buildingType as BuildingType}
								onChange={item => setBuildingType(item as BuildingType)}
							/>
						</div>
						{/* Theme type */}
						<div>
							<label className="mb-2 block text-sm">
								Select Building theme
							</label>
							<ThemeSelector
								options={BuildingThemeTypes}
								selected={buildingTheme as BuildingThemeType}
								onChange={item => setBuildingTheme(item)}
								className="mb-3"
							/>
						</div>
						{/* Building theme */}
						<UploadComponent />
					</>
				)}
			</div>
		</div>
	)
}

export default Building
