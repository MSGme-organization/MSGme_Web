"use client"

import React from 'react'
import Image from "next/image";
import { useThemeMode } from "flowbite-react";


const HomeImage = () => {
    const theme = useThemeMode();
    return (
        <Image
            priority={true}
            src={
                theme.computedMode === "light"
                    ? "/images/lightHome.png"
                    : "/images/darkHome.png"
            }
            alt="home-light"
            width={1408}
            height={364}
        />
    )
}

export default HomeImage