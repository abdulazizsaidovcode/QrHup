import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../../public/Logo.png';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { getMe } from '../../hooks/url';
import { useEffect } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import uzbFlag from '../../images/icon/Flag_of_Uzbekistan.svg.png';
import engFlag from '../../images/icon/gb.png';
import ruFlag from '../../images/icon/ru.png';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const role = sessionStorage.getItem('role');
  const i18nextLng = localStorage.getItem('i18nextLng');
  const { t, i18n } = useTranslation();
  const token = sessionStorage.getItem('token');
  const userMe = useGlobalRequest(getMe, 'GET');

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if(token){
      userMe.globalDataFunc();
    }
  }, [token])

  if (!role) {
    return null;
  }

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <Select defaultValue={"ru"}
            className='min-w-[135px]'
            onChange={(value) => {
              changeLanguage(value);
            }} options={[
              {
                value: 'en',
                label: (
                  <div className="flex items-center gap-2">
                    <img src={engFlag} alt="English" className="w-5 h-3" />
                    ENGLISH
                  </div>
                ),
              },
              {
                value: 'uz',
                label: (
                  <div className="flex items-center gap-2">
                    <img src={uzbFlag} alt="Uzbek" className="w-5 h-3" />
                    UZBEK
                  </div>
                ),
              },
              {
                value: 'ru',
                label: (
                  <div className="flex items-center gap-2">
                    <img src={ruFlag} alt="Russian" className="w-5 h-3" />
                    RUSSIAN
                  </div>
                ),
              }
            ]} />
          <DropdownUser data={userMe.response} />
        </div>
      </div>
    </header>
  );
};

export default Header;
