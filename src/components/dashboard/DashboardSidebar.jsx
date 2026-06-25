import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, Plus, ChartMixed, ShoppingBag, Heart, CreditCard, PersonFill, BroomMotion } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function  DashboardSidebar() {

  const user = await getUserSession()

  const sellerNavLinks = [
    { icon: House, href: "/dashboard/seller", label: "Home" },
    { icon: Magnifier, href: "/dashboard/seller/products", label: "My Products" },
    { icon: Plus, href: "/dashboard/seller/products/new", label: "Add Product" },
    { icon: Envelope, href: "/dashboard/seller/orders", label: "Manage Orders" },
    { icon: ChartMixed, href: "/dashboard/seller/analytics", label: "Sales Analytics" },
  ]

  const buyerNavLinks = [
    { icon: House, href: "/dashboard/buyer", label: "Home" },
    { icon: ShoppingBag, href: "/dashboard/buyer/my-orders", label: "My Orders" },
    { icon: Heart, href: "/dashboard/buyer/wishlist", label: "Wishlist" },
    { icon: CreditCard, href: "/dashboard/buyer/payments", label: "Payment History" },
    { icon: PersonFill, href: "/dashboard/buyer/profile", label: "Profile Settings" },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Home" },
    { icon: PersonFill, href: "/dashboard/admin/users", label: "Manage Users" },
    { icon: BroomMotion, href: "/dashboard/admin/manage-products", label: "Manage Products" },
    { icon: Envelope, href: "/dashboard/admin/manage-orders", label: "Manage Orders" },
    { icon: ChartMixed, href: "/dashboard/admin/admin-analytics", label: "Platform Analytics" },
  ];

  const navLinksMap ={
    buyer: buyerNavLinks,
    seller: sellerNavLinks,
    admin: adminNavLinks
  }


  const navItems = navLinksMap[user?.userRole || 'buyer'];

  const navContent = (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 dark:text-neutral-400 transition-all duration-200 hover:bg-yellow-100 dark:hover:bg-neutral-800 hover:text-yellow-800 dark:hover:text-theme-yellow-primary group relative overflow-hidden"
          href={item.href}
        >
          <item.icon className="size-5 text-gray-400 dark:text-neutral-500 group-hover:text-yellow-600 dark:group-hover:text-theme-yellow-primary transition-colors duration-200" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-amber-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 lg:block min-h-screen transition-colors duration-300">
        <div className="mb-6 px-4 py-2">
          <span className="text-lg font-black tracking-wider text-gray-900 dark:text-neutral-100">
            RESELL <span className="text-theme-yellow-primary">HUB</span>
          </span>
        </div>
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-neutral-800 border border-amber-200 dark:border-neutral-700 text-yellow-600 dark:text-theme-yellow-primary hover:bg-yellow-50 dark:hover:bg-neutral-700 min-w-10 h-10 rounded-xl shadow-xl transition-colors">
          <LayoutSideContentLeft className="size-5" />
        </Button>

        <Drawer.Backdrop className="bg-black/40 backdrop-blur-sm">
          <Drawer.Content placement="left" className="bg-white dark:bg-neutral-900 border-r border-amber-200 dark:border-neutral-800 text-gray-900 dark:text-neutral-100 p-0 m-0 max-w-[280px] transition-colors">
            <Drawer.Dialog className="bg-white dark:bg-neutral-900 h-full flex flex-col focus:outline-none relative">
              <Drawer.CloseTrigger className="absolute top-4 right-4 text-gray-400 dark:text-neutral-500 hover:text-gray-900 dark:hover:text-neutral-100" />

              <Drawer.Header className="border-b border-amber-100 dark:border-neutral-800 px-6 py-4">
                <Drawer.Heading className="text-md font-black tracking-wider text-gray-900 dark:text-neutral-100">
                  RESELL <span className="text-theme-yellow-primary">HUB</span>
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body className="px-4 py-6 bg-white dark:bg-neutral-900 flex-1 overflow-y-auto">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}