import React from 'react';

const CategoryNav = () => {
  const categories = [
    { name: 'Explore (New!)', isNew: true },
    { name: 'Saved' },
    { name: 'Electronics' },
    { name: 'Motors' },
    { name: 'Fashion' },
    { name: 'Collectibles and Art' },
    { name: 'Sports' },
    { name: 'Health & Beauty' },
    { name: 'Industrial equipment' },
    { name: 'Home & Garden' },
    { name: 'Deals' },
    { name: 'Sell' }
  ];

  return (
    <div className="w-[90%]  mx-auto">
      <div className="max-w-[1440px] mx-auto ">
        <ul className="flex items-center gap-6 text-xs">
          {categories.map((category) => (
            <li key={category.name}>
              <a href="#" className="block py-2 hover:underline text-[#333]">
                {category.name}
                {category.isNew && (
                  <span className="text-[#3665F3] ml-1">!</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryNav;