'use client';

import React from 'react';
import HeaderPhone from './HeaderPhone';
import HeaderDesktop from './HeaderDesktop';

const Header = () => {
  return (
    <header className="px-6 ipad:px-4 py-3 bg-background-primary fixed w-full top-0 z-50 shadow-md">
      <div className="ipadPro:hidden">
        <HeaderDesktop />
      </div>
      <div className="hidden ipadPro:block">
        <HeaderPhone />
      </div>
    </header>
  );
};

export default Header;
