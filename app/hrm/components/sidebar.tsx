"use client";

import Link from "next/link";
import { useState } from "react";

type ActiveLink = {
  parentIndex: number;
  childIndex: number | null;
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [activeLink, setActiveLink] = useState<ActiveLink>({
    parentIndex: -1,
    childIndex: null,
  });

  const attendanceTypes = [
    {
      type: "Staff Attendance",
      processes: ["link 1", "link 2", "link 3"],
    },
    {
      type: "My Attendance",
      processes: ["link 1", "link 2", "link 3"],
    },
    {
      type: "Labour Attendance",
      processes: [
        "Attendance",
        "Approve Attendance",
        "Clock In (alt + s)",
        "clock Out",
      ],
    },
  ];

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleLinkClick = (parentIndex: number, childIndex: number | null) => {
    setActiveLink({ parentIndex, childIndex });

    // For mobile, close the sidebar after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const isLinkActive = (parentIndex: number, childIndex: number | null) => {
    return (
      activeLink.parentIndex === parentIndex &&
      activeLink.childIndex === childIndex
    );
  };

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
      <div
        className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
        onClick={() => setIsSidebarOpen(false)}
      >
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a
            href="#"
            className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
          >
            HRM
          </a>
          <button
            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {!isSidebarOpen ? (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`flex-grow px-4 pb-4 md:pb-0 md:overflow-y-auto ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          {attendanceTypes.map((attendance, parentIndex) => (
            <div className="relative" key={parentIndex}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(parentIndex);
                }}
                className={`flex justify-between items-stretch  w-full px-4 py-2 mt-2 text-sm font-semibold text-left rounded-lg ${
                  isLinkActive(parentIndex, null)
                    ? "bg-gray-200 text-gray-900 dark-mode:bg-gray-700"
                    : "bg-transparent hover:bg-gray-200"
                } dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
              >
                <span>{attendance.type}</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${
                    openDropdownIndex === parentIndex
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openDropdownIndex === parentIndex && (
                <div className="w-full mt-1 bg-white rounded-md shadow-lg dark-mode:bg-gray-800">
                  {attendance.processes.map((process, childIndex) => (
                    <Link
                      key={childIndex}
                      href={`/hrm/${process.toLowerCase()}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLinkClick(parentIndex, childIndex);
                      }}
                      className={`block px-4 py-2 text-sm font-semibold rounded-lg ${
                        isLinkActive(parentIndex, childIndex)
                          ? "bg-gray-200 text-blue-600 dark-mode:bg-gray-700"
                          : "bg-transparent hover:bg-gray-200 "
                      } dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
                    >
                      {process}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
