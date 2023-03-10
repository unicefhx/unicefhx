import Globe from "react-globe.gl";
import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase";
import { setPostId } from "../App";

export const GlobeView = () => {

	useEffect(() => {
		supabase.from("posts").select("*").then(({data}) => {
			setGData(data!.map(p => ({
				lng: p.longitude,
				lat: p.latitude,
				size: 30,
				color: "red",
				id: p.id
			})))
		})
	}, []);

	const [gData, setGData] = useState<any[]>([])

	const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

	return (
		<Globe globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
			
			htmlElementsData={gData}
			htmlElement={_d => {
				const d = _d as any
				const el = document.createElement('div');
				el.innerHTML = markerSvg;
				el.style.color = d.color;
				el.style.width = `${d.size}px`;

				el.style['pointer-events'] = 'auto';
				el.style.cursor = 'pointer';
				el.onclick = () => {
					setPostId(d.id)
					console.log(d)
				}
				return el;
			}}
		/>
	);
};
