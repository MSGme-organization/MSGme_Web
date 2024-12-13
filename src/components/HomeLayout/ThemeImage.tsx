"use client"
import { useThemeMode } from 'flowbite-react';
import Image from 'next/image'

const ThemeImage = () => {
    const theme = useThemeMode();
    return (
        <p
          className="text-customGrey dark:text-textColor-dark text-[14px] flex justify-center items-center gap-[6px] cursor-pointer text-nowrap"
          onClick={theme.toggleMode}
        >
          <span>
            <Image
              src={
                theme.computedMode === "light"
                  ? "/svgs/Sun.svg"
                  : "/svgs/Moon.svg"
              }
              alt="moon-logo"
              width={17}
              height={17}
            />
          </span>
          {theme.computedMode === "dark" ? "Dark Mode" : "Light Mode"}
        </p>
    )
}

export default ThemeImage