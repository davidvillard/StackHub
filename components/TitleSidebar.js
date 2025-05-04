import Image from 'next/image';

export default function TitleSidebar({ collapsed }) {
  return (
    <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-6'} gap-2 mb-8 mt-12 md:mb-8 md:mt-0`}>
      {!collapsed && <h1 className="clash-title text-xl font-bold">Free Stack</h1>}
      <Image 
        src="/StackHub_3D.png" 
        alt="Freestack"
        width={collapsed ? 40 : 48}
        height={collapsed ? 40 : 48}
        priority
        className={`animate-bounceSlow2 ${collapsed ? 'mx-auto' : ''}`}
      />
    </div>
  );
}