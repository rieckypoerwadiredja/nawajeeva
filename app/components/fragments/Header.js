"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { IMAGES } from "../../constants/images";
import AvatarMini from "../elements/AvatarMini";
import { GeneralButton } from "../elements/Button";

function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { name: "Admin", href: "/admin/production" },
      { name: "Reports", href: "/admin/production/reports" },
      { name: "KPI", href: "/admin/production/kpi" },
      { name: "Add Reports", href: "/add-report" },
    ],
    [],
  );

  useEffect(() => {
    const activeItem = navItems.find((item) => item.href === pathname);
    if (activeItem) setActiveLink(activeItem.name);
    setIsMenuOpen(false);
  }, [pathname, navItems]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onClick = (e) => {
      const target = e.target;
      if (target.closest?.("[data-mobile-menu]")) return;
      setIsMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 bg-surface py-2 px-4 shadow-sm sm:px-6 lg:px-8">
      {/* LEFT: Logo */}
      <Link
        onClick={() => setActiveLink("")}
        href="/"
        className="flex min-w-0 items-center gap-3"
      >
        <Image
          src={IMAGES.LOGO_NAWAJEEVA_TRANSPARENT}
          alt="NawaJeeva"
          width={120}
          height={60}
          priority
          sizes="120px"
          className="h-[52px] w-[104px] object-contain sm:h-[60px] sm:w-[120px]"
        />
      </Link>

      {/* CENTER: Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          {navItems.map((item) => {
            const isActive = activeLink === item.name;

            return (
              <li key={item.name} className="relative">
                <Link
                  href={item.href}
                  onClick={() => setActiveLink(item.name)}
                  className={[
                    "relative inline-flex items-center font-semibold transition-colors",
                    isActive
                      ? "text-text-secondary"
                      : "text-text-third hover:text-text-secondary",
                  ].join(" ")}
                >
                  {item.name}

                  {/* underline indicator */}
                  <span
                    className={[
                      "absolute -bottom-1 left-0 right-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out",
                      isActive ? "scale-x-100" : "group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* RIGHT: User + Mobile Menu Button */}
      <div className="flex items-center gap-2">
        {status === "authenticated" && (
          <>
            <span className="hidden whitespace-nowrap text-sm font-medium text-text-primary sm:inline">
              {session?.user?.name || "User"}
            </span>
            <AvatarMini name={session?.user?.name || "User"} size={40} />
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="hidden md:inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Sign out
            </button>
          </>
        )}
        {status !== "authenticated" && (
          <>
            <Link
              href="/auth/signin"
              className="hidden md:inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white transition bg-primary"
            >
              Sign in
            </Link>
          </>
        )}

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden ml-1 inline-flex items-center justify-center rounded-md border border-border bg-surface px-2.5 py-2 transition hover:bg-secondary-soft"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          data-mobile-menu
        >
          <span className="sr-only">Open menu</span>
          <div className="flex flex-col gap-1">
            <span className="block h-0.5 w-5 bg-text-primary" />
            <span className="block h-0.5 w-5 bg-text-primary" />
            <span className="block h-0.5 w-5 bg-text-primary" />
          </div>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute left-0 right-0 top-[64px] sm:top-[72px] z-50 border-t border-border bg-surface shadow-lg"
          data-mobile-menu
        >
          <ul className="px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeLink === item.name;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveLink(item.name)}
                    className={[
                      "block rounded-md px-3 py-2 font-medium transition",
                      isActive
                        ? "bg-secondary-soft text-text-third"
                        : "text-text-secondary hover:bg-secondary-soft hover:text-text-third",
                    ].join(" ")}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-4 pb-4 pt-2 border-t border-border">
            {status === "authenticated" && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary">
                    {session?.user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="w-full text-left rounded-md px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
