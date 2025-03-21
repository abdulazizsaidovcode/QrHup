import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../../public/Logo.png';
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { CiBarcode, CiShop } from "react-icons/ci";
import { BsQrCode } from 'react-icons/bs';
import { MdCurrencyBitcoin } from 'react-icons/md';
import { GrTransaction } from "react-icons/gr";
import { useTranslation } from 'react-i18next';


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation()

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  const role = sessionStorage.getItem('role');
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    role === 'ROLE_ADMIN' ? (
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <NavLink to="/">
            <img src={Logo} alt="Logo" />
          </NavLink>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
          </button>
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            <div>
              <ul className="mb-6 flex flex-col gap-1.5">
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${(pathname === '/' ||
                    pathname.includes('dashboard')) &&
                    'bg-gray-100 text-black'
                    }`}
                >
                  <RxDashboard />
                  {t("Dashboard")}
                </NavLink>
                <li>
                  <NavLink
                    to="/User"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                      ${(pathname === '/User' ||
                        pathname.includes('/User')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <FaRegUser />
                    {t("User")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/partners"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                      ${(pathname === '/partners' ||
                        pathname.includes('/partners')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <PiUsersThreeBold />
                    {t("Partners")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/merchant"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                          ${(pathname === '/merchant' ||
                        pathname.includes('/merchant')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <CiShop size={22} />
                    {t("Merchant")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Qrs"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                      ${(pathname === '/Qrs' ||
                        pathname.includes('/Qrs')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <BsQrCode />
                    {t("Qrs")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/transactions"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                              ${(pathname === '/admin/transactions' ||
                        pathname.includes('/admin/transactions')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <GrTransaction />
                    {t("Transactions")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mcc"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                      ${(pathname === '/mcc' ||
                        pathname.includes('/mcc')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <CiBarcode size={22} />
                    {t("MccCodes")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/action"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                      ${(pathname === '/action' ||
                        pathname.includes('/action')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <FaPersonChalkboard size={22} />
                    {t("Action")}
                  </NavLink>

                </li>
                <li>
                  <NavLink
                    to="/currency"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                      ${(pathname === '/currency' ||
                        pathname.includes('/currency')) &&
                      'bg-gray-100 text-black'
                      }`}
                  >
                    <MdCurrencyBitcoin size={22} />
                    {t("Currency")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    ) : role === 'ROLE_MODERATOR' ? <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/moderator/clarify"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                  ${(pathname === '/moderator/clarify' ||
                      pathname.includes('/moderator/clarify')) &&
                    'bg-gray-100 text-black'
                    }`}
                >
                  <FaPersonChalkboard size={22} />
                  {t("QRsToClarify")}
                </NavLink>
                <NavLink
                  to="/moderator/Action"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                  ${(pathname === '/moderator/Action' ||
                      pathname.includes('/moderator/Action')) &&
                    'bg-gray-100 text-black'
                    }`}
                >
                  <MdCurrencyBitcoin size={22} />
                  {t("MyAction")}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
      : null);
};

export default Sidebar;