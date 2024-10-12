
import dynamic from "next/dynamic";
import Image from "next/image";
const ThemeImage = dynamic(() => import('./ThemeImage'), { ssr: false })

const Footer = () => {
  return (
    <div className="h-[100%] flex items-center px-5 xl:px-20 bg-bgColor dark:bg-customGrey-black  shadow-md min-h-[70px] gap-3 justify-between py-3">
      <div className="flex justify-center items-start lg:items-center gap-3 lg:gap-8 flex-col lg:flex-row">
        <p className=" text-customGrey dark:text-textColor-dark text-[14px]">
          ©2024 MSGme All rights Reserved
        </p>
        <p className=" text-customGrey dark:text-textColor-dark text-[14px]">
          Privacy Policy
        </p>
        <p className=" text-customGrey dark:text-textColor-dark text-[14px]">
          Term of Use
        </p>
      </div>
      <div className="flex justify-center items-start lg:items-center gap-3 lg:gap-8 flex-col-reverse lg:flex-row">
        <p className="text-customGrey dark:text-textColor-dark text-[14px] flex justify-center items-center gap-[6px] cursor-pointer">
          <span>
            <Image
              src="/svgs/Global.svg"
              alt="global-logo"
              width={17}
              height={17}
            />
          </span>
          English
        </p>
        <p className="text-customGrey dark:text-textColor-dark text-[14px] flex justify-center items-center gap-[6px] cursor-pointer">
          <span>
            <Image
              src="/svgs/Dollar.svg"
              alt="dollar-logo"
              width={17}
              height={17}
            />
          </span>
          USD
        </p>
        <ThemeImage />
      </div>
    </div>
  );
};

export default Footer;
