import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaCartShopping, FaCircleUser } from 'react-icons/fa6';

const navigation = [
  { name: 'Products', href: 'products' },
  { name: 'Categories', href: 'categories' },
  { name: 'Profile', href: 'profile' },
];

const dropdown = [
  { name: 'Your Profile', href: 'products' },
  { name: 'Settings', href: 'categories' },
  { name: 'Sign out', href: 'profile' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <nav className='bg-gray-700 h-20 px-10 flex items-center gap-10'>
      <Link to='.'>
        <img
          className='h-12'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
          alt='company-logo'
        />
      </Link>

      <div className='navigation flex-1 space-x-4'>
        {navigation.map(item => (
          <NavLink
            className={({ isActive }) =>
              `text-gray-300 px-3 py-2 rounded hover:text-white ${isActive ? 'active' : ''}`
            }
            key={item.name}
            to={item.href}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className='flex gap-8 relative'>
        <Link className='relative flex items-center' to='cart'>
          <span className='text-white text-2xl'>
            <FaCartShopping />
          </span>

          <span className='absolute -top-px -right-1.5 bg-indigo-500 px-[5px] py-px text-white text-xs rounded'>
            5
          </span>
        </Link>

        <div ref={dropdownRef}>
          <button className='text-white text-2xl mt-1.5' onClick={() => setIsOpen(!isOpen)}>
            <FaCircleUser />
          </button>

          {isOpen && (
            <div className='absolute w-48 right-0 top-10 z-20 bg-white ring-1 ring-black/10 shadow-lg rounded-md py-1'>
              {dropdown.map(item => (
                <NavLink
                  className='block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => setIsOpen(false)}
                  key={item.name}
                  to={item.href}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;