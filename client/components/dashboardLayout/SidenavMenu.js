import React, { useContext } from 'react'
import {
  ChartPieIcon,
  BookOpenIcon,
  UsersIcon,
  ChatAltIcon,
} from '@heroicons/react/outline'
import { Context } from '../../context'

const NavItem = ({ activePage, link, svgIcon, title, setActivePage }) => {
  return (
    <a
      onClick={() => setActivePage(title)}
      href={link}
      className={`flex items-center no-underline text-green-50 hover:text-green-100 p-3 rounded-md ${
        activePage === title ? 'bg-brightRedLight' : ''
      }`}
    >
      {svgIcon}
      <div className="font-bold pl-3">{title}</div>
    </a>
  )
}

const SidenavMenu = ({ activePage, setActivePage }) => {
  const {
    state: { user },
  } = useContext(Context)


  return (
    <nav className="space-y-2">
      {user && user.role.includes('Instructor') && (
        <>
          <NavItem
            activePage={activePage}
            link="/instructor/dashboard"
            svgIcon={<BookOpenIcon className="h-6" />}
            title="Courses"
            setActivePage={setActivePage}
          />
          <NavItem
            activePage={activePage}
            link="/instructor/courses"
            svgIcon={<BookOpenIcon className="h-6" />}
            title="My Created Courses"
            setActivePage={setActivePage}
          />
          <NavItem
            activePage={activePage}
            link="/instructor/course/create"
            svgIcon={<BookOpenIcon className="h-6" />}
            title="Create Course"
            setActivePage={setActivePage}
          />
          <NavItem
            activePage={activePage}
            link="/instructor/revenue"
            svgIcon={<BookOpenIcon className="h-6" />}
            title="Revenue"
            setActivePage={setActivePage}
          />
        </>
      )}

      {user && user.role.includes('Admin') && (
        <>
          <NavItem
            activePage={activePage}
            link="/admin/category/create"
            svgIcon={<BookOpenIcon className="h-6" />}
            title="Create Category"
            setActivePage={setActivePage}
          />
          <NavItem
            activePage={activePage}
            link="/admin/sub/create"
            svgIcon={<BookOpenIcon className="h-6" />}
            title="Create Subcategory"
            setActivePage={setActivePage}
          /> 
        </>
      )}
      {user && user.role.includes('Instructor') && user.role.includes('Subscriber') && !user.role.includes('Admin') &&(
        <>
         <NavItem
            activePage={activePage}
            link="/instructor/profile"
            svgIcon={<UsersIcon className="h-6" />}
            title="Profile"
            setActivePage={setActivePage}
          />
        </>
      )}
      {user && !user.role.includes('Instructor') && user.role.includes('Subscriber') && user.role.includes('Admin') &&(
        <>
         <NavItem
            activePage={activePage}
            link="/admin/profile"
            svgIcon={<UsersIcon className="h-6" />}
            title="Profile"
            setActivePage={setActivePage}
          />
        </>
      )}
      {user && user.role.includes('Instructor') && user.role.includes('Subscriber') && user.role.includes('Admin') &&(
        <>
         <NavItem
            activePage={activePage}
            link="/admin/profile"
            svgIcon={<UsersIcon className="h-6" />}
            title="Profile"
            setActivePage={setActivePage}
          />
        </>
      )}
      {user && user.role.includes('Instructor') && !user.role.includes('Subscriber') && !user.role.includes('Admin') &&(
        <>
         <NavItem
            activePage={activePage}
            link="/instructor/profile"
            svgIcon={<UsersIcon className="h-6" />}
            title="Profile"
            setActivePage={setActivePage}
          />
        </>
      )}
      {user && !user.role.includes('Instructor') && user.role.includes('Subscriber') && !user.role.includes('Admin') &&(
        <>
          <NavItem
            activePage={activePage}
            link="/user/dashboard"
            svgIcon={<BookOpenIcon className="h-6" />}
            title="Courses"
            setActivePage={setActivePage}
          />
         <NavItem
            activePage={activePage}
            link="/user/profile"
            svgIcon={<UsersIcon className="h-6" />}
            title="Profile"
            setActivePage={setActivePage}
          />
        </>
      )}
      {user && !user.role.includes('Instructor') && !user.role.includes('Subscriber') && user.role.includes('Admin') &&(
        <>
         <NavItem
            activePage={activePage}
            link="/admin/profile"
            svgIcon={<UsersIcon className="h-6" />}
            title="Profile"
            setActivePage={setActivePage}
          />
        </>
      )}
    </nav>
  )
}

export default SidenavMenu
