import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, Plus, ChartMixed } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, href: "/dashboard/seller", label: "Home" },
    { icon: Magnifier, href: "/dashboard/seller/products", label: "My Products" },
    { icon: Plus, href: "/dashboard/seller/products/new", label: "Add Product" },
    { icon: Envelope, href: "/dashboard/seller/orders", label: "Manage Orders" },
    { icon: ChartMixed, href: "/dashboard/seller/analytics", label: "Sales Analytics" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-yellow-100 hover:text-yellow-800 group relative overflow-hidden"
          href={item.href}
        >
          <item.icon className="size-5 text-gray-400 group-hover:text-yellow-600 transition-colors duration-200" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-amber-200/60 bg-white p-4 lg:block min-h-screen">
        <div className="mb-6 px-4 py-2">
          <span className="text-lg font-black tracking-wider text-gray-900">
            RESELL <span className="text-yellow-500">HUB</span>
          </span>
        </div>
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-amber-200 text-yellow-600 hover:bg-yellow-50 min-w-10 h-10 rounded-xl shadow-xl">
          <LayoutSideContentLeft className="size-5" />
        </Button>

        <Drawer.Backdrop className="bg-black/40 backdrop-blur-sm">
          <Drawer.Content placement="left" className="bg-white border-r border-amber-200 text-gray-900 p-0 m-0 max-w-[280px]">
            <Drawer.Dialog className="bg-white h-full flex flex-col focus:outline-none relative">
              <Drawer.CloseTrigger className="absolute top-4 right-4 text-gray-400 hover:text-gray-900" />
              
              <Drawer.Header className="border-b border-amber-100 px-6 py-4">
                <Drawer.Heading className="text-md font-black tracking-wider text-gray-900">
                  RESELL <span className="text-yellow-500">HUB</span>
                </Drawer.Heading>
              </Drawer.Header>
              
              <Drawer.Body className="px-4 py-6 bg-white flex-1 overflow-y-auto">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}