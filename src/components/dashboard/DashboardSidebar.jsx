import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, Plus } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, href: "/dashboard/seller", label: "Home" },
    { icon: Magnifier, href: "/dashboard/seller/products", label: "Products" },
    { icon: Plus, href: "/dashboard/seller/products/new", label: "Add Product" },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/dashboard/seller/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];


  const navContent = (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-neutral-900 hover:text-yellow-400 group relative overflow-hidden"
          href={item.href}
        >
          <item.icon className="size-5 text-gray-500 group-hover:text-yellow-400 transition-colors duration-200" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>

      <aside className="hidden w-64 shrink-0 border-r border-neutral-900 bg-neutral-950 p-4 lg:block min-h-screen">
        <div className="mb-6 px-4 py-2">
          <span className="text-lg font-black tracking-wider text-white">
            RESELL <span className="text-yellow-400">HUB</span>
          </span>
        </div>
        {navContent}
      </aside>

      <Drawer>
        
        <Button className="lg:hidden fixed top-4 left-4 z-50 bg-neutral-900 border border-neutral-800 text-yellow-400 hover:bg-neutral-800 min-w-10 h-10 rounded-xl shadow-xl">
          <LayoutSideContentLeft className="size-5" />
        </Button>

        <Drawer.Backdrop className="bg-black/60 backdrop-blur-sm">
         
          <Drawer.Content placement="left" className="bg-neutral-950 border-r border-neutral-900 text-white p-0 m-0 max-w-[280px]">
            <Drawer.Dialog className="bg-neutral-950 h-full flex flex-col focus:outline-none relative">
              
             
              <Drawer.CloseTrigger className="absolute top-4 right-4 text-gray-400 hover:text-white" />
              
              <Drawer.Header className="border-b border-neutral-900 px-6 py-4">
                <Drawer.Heading className="text-md font-black tracking-wider text-white">
                  RESELL <span className="text-yellow-400">HUB</span>
                </Drawer.Heading>
              </Drawer.Header>
              
              <Drawer.Body className="px-4 py-6 bg-neutral-950 flex-1 overflow-y-auto">
                {navContent}
              </Drawer.Body>

            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}