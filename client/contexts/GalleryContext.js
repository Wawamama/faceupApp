import React, { useState } from 'react'

export const GalleryContext = React.createContext()

export const GalleryProvider = props => {
	const [gallery, setGallery] = useState([])

	return (
		<GalleryContext.Provider value={[gallery, setGallery]}>
			{props.children}
		</GalleryContext.Provider>
	)
}
