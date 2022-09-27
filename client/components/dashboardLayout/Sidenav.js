import React from 'react'
import SidenavMenu from './SidenavMenu'
import SidenavHeader from './SidenavHeader'

const Sidenav = ({ activePage, setActivePage }) => {
  return (
    <div className="md:flex flex-col bg-brightRed text-red-50 px-6 py-4 ">
      <SidenavHeader />
      <SidenavMenu activePage={activePage} setActivePage={setActivePage} />
    </div>
  )
}

export default Sidenav
