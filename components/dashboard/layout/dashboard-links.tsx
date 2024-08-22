import Link from "next/link";

export const DashboardLinks = () => {
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Products",
      href: "/dashboard/products",
    },
    {
      name: "Users",
      href: "/dashboard/users",
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
    },
    {
      name: "Reviews",
      href: "/dashboard/reviews",
    },
    {
      name: "Homepage",
      href: "/dashboard/store-home",
    },
  ];
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};
