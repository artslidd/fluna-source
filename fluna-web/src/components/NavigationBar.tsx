import { twMerge } from "tailwind-merge";
import {
  HelpCircleIcon,
  SendIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  LandmarkIcon,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Separator } from "react-aria-components";
import { Link } from "@ui/ui-library/link";
import { Icon } from "@ui/ui-library/icon";
import { Avatar, AvatarBadge } from "@ui/ui-library/avatar";
import { Dialog } from "@ui/ui-library/dialog";
import { Button } from "@ui/ui-library/button";
import {
  DisclosurePanel,
  DisclosureControl,
  Disclosure,
} from "@ui/ui-library/disclosure";
import { LinkProps } from "react-aria-components";
import { Popover } from "@ui/ui-library/popover";
import { AvailableIcon } from "@ui/ui-library/icons";
import { useState, useRef } from "react";
import logo from "../assets/logo.png";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useSession } from "../contexts/SessionContext";
import { Text } from "@ui/ui-library/text";
import { SignOutButton } from "./SignOutButton";

type NavLinkItem = {
  isActive?: boolean;
} & LinkProps;

type NavLinkProps = NavLinkItem | { title: string; items: NavLinkItem[] };

function NavLink(props: NavLinkProps) {
  if ("items" in props) {
    return (
      <Disclosure defaultExpanded>
        <DisclosureControl className="group/control [&:not(:hover)]:text-white/50 mt-3 w-full ps-2.5 text-xs  /6 font-semibold">
          {props.title}{" "}
          <ChevronRightIcon className="ms-auto hidden size-4 transition-all group-hover/control:flex group-aria-expanded:rotate-90" />
        </DisclosureControl>
        <DisclosurePanel>
          <ul className="grid gap-y-1">
            {props.items.map((item) => (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            ))}
          </ul>
        </DisclosurePanel>
      </Disclosure>
    );
  }

  const { isActive, ...rest } = props;
  return (
    <Link
      {...rest}
      className={twMerge(
        "group w-full gap-x-3 overflow-hidden rounded-md px-2.5 py-1 text-nowrap hover:bg-navbar-darker hover:no-underline focus-visible:outline-offset-0 [&>[data-ui=icon]:not([class*=size-])]:size-4.5",
        "[&>[data-ui=notification-badge]]:bg-navbar-darker",
        "[&>[data-ui=notification-badge]]:rounded-md",
        "[&>[data-ui=notification-badge]]:top-1/2",
        "[&>[data-ui=notification-badge]]:right-1",
        "[&>[data-ui=notification-badge]]:-translate-y-1/2",
        "[&>[data-ui=notification-badge]]:bg-navbar-darker",
        "[&>[data-ui=notification-badge]]:p-3",
        "[&>[data-ui=nxotification-badge]]:text-xs/6",
        "[&>[data-ui=notification-badge]]:font-semibold",
        isActive
          ? "bg-navbar-darker font-semibold text-white [&>[data-ui=notification-badge]]:bg-transparent"
          : [
              "font-medium",
              "text-gray-300/90 [&:not(:hover)>[data-ui=icon]]:bg-navbar-darker",
            ]
      )}
    >
      {props.children}
    </Link>
  );
}

export function UserMenuPopover({ isCollapsed }: { isCollapsed: boolean }) {
  const { session } = useSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <Button
        aria-label="User menu"
        variant="plain"
        onPress={() => setIsPopoverOpen(!isPopoverOpen)}
        ref={ref}
        isIconOnly={isCollapsed}
        className={twMerge(
          "flex items-center justify-start hover:bg-navbar-darker w-full"
        )}
      >
        <Avatar
          className="rounded-full size-7"
          src={session?.user?.user_metadata?.avatar_url}
          alt="Avatar"
        />
        <Text
          className={twMerge(
            "text-gray-300/90 transition-all duration-300",
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          {session?.user?.user_metadata?.username}
        </Text>
      </Button>
      <Popover
        className="min-w-56 rounded-xl bg-navbar-darker"
        isOpen={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        triggerRef={ref}
      >
        <Dialog aria-label="Settings">
          <div className="flex flex-col gap-2 p-3">
            <div className="flex gap-4">
              <Avatar
                src={session?.user?.user_metadata?.avatar_url}
                alt={session?.user?.user_metadata?.username}
              >
                <AvatarBadge badge={<AvailableIcon aria-label="Available" />} />
              </Avatar>
              <div className="flex flex-col">
                <Text className="font-bold text-gray-300/90">
                  {session?.user?.user_metadata?.username}
                </Text>
                <SignOutButton />
              </div>
            </div>

            <Separator className="border-gray-300/70" />

            <ThemeSwitcher />
          </div>
        </Dialog>
      </Popover>
    </>
  );
}

export const SideNavigation = ({
  isMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
}) => {
  const isCollapsable = !isMobileMenuOpen;
  const [isCollapsed, setIsCollapsed] = useState(isCollapsable ? false : true);

  return (
    <nav
      aria-label="Main navigation"
      className={twMerge(
        "group isolate flex flex-col overflow-y-auto overflow-x-hidden bg-navbar-background transition-all duration-300",
        "fixed md:relative h-[calc(100vh-2rem)] md:h-screen z-50",
        isCollapsed ? "w-16" : "w-48",
        "md:flex",
        "transform md:transform-none",
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="relative flex flex-col items-center px-2 py-3 w-full">
        <RouterLink
          to="/"
          className={twMerge(
            "flex flex-col items-center gap-2 w-full",
            isCollapsed ? "justify-center" : ""
          )}
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Logo Fluna"
            className={twMerge(
              isCollapsed ? "w-8 h-8" : "w-16 h-16",
              "rounded-lg"
            )}
          />
          <h1
            className={twMerge(
              "text-lg font-bold transition-all duration-300 text-white whitespace-nowrap",
              isCollapsed ? "w-0 h-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            Fluna
          </h1>
        </RouterLink>
        {isCollapsable && (
          <Button
            variant="plain"
            isIconOnly
            onPress={() => setIsCollapsed(!isCollapsed)}
            aria-label={
              isCollapsed ? "Expand navigation" : "Collapse navigation"
            }
            aria-expanded={!isCollapsed}
            className={twMerge(
              isCollapsed ? "relative" : "absolute top-2 right-2",
              "size-5 p-1",
              "text-gray-300 hover:text-white",
              "transition-all duration-300",
              "bg-navbar-background",
              "rounded-full shadow-md",
              "opacity-0 group-hover:opacity-100",
              "hover:scale-110"
            )}
          >
            <Icon aria-hidden="true">
              {isCollapsed ? <PlusIcon /> : <MinusIcon />}
            </Icon>
          </Button>
        )}
      </div>
      <MainNavigation isCollapsed={isCollapsed} />
      <div
        className={twMerge(
          "bg-navbar-background flex px-1 pb-1.5 w-full mt-auto",
          isCollapsed ? "pl-2.5 pr-3.5" : ""
        )}
      >
        <UserMenuPopover isCollapsed={isCollapsed} />
      </div>
    </nav>
  );
};

export function MainNavigation({ isCollapsed }: { isCollapsed: boolean }) {
  const navItems = [
    {
      path: "/",
      label: "Patrimoine",
      icon: <LandmarkIcon className="w-5 h-5" />,
    },
  ];
  return (
    <nav className="flex flex-1 flex-col" aria-label="Primary navigation">
      <ul
        role="list"
        className={twMerge(
          "grid gap-y-1 py-3",
          isCollapsed ? "pl-2.5 pr-3" : ""
        )}
      >
        {navItems.map(({ path, label, icon }) => (
          <li key={label}>
            <NavLink>
              <RouterLink
                to={path}
                className="w-full"
                aria-label={isCollapsed ? label : undefined}
              >
                <div
                  className={twMerge(
                    "flex items-center gap-x-2",
                    isCollapsed ? "" : "pl-2"
                  )}
                >
                  <Icon aria-hidden="true">{icon}</Icon>
                  <span
                    className={twMerge(
                      "text-sm transition-all duration-300",
                      isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                    )}
                  >
                    {label}
                  </span>
                </div>
              </RouterLink>
            </NavLink>
          </li>
        ))}
      </ul>
      <ul
        role="list"
        className={twMerge(
          "mt-auto grid gap-y-1 py-1",
          isCollapsed ? "pl-2.5 pr-3" : ""
        )}
      >
        <li>
          <NavLink>
            <RouterLink
              to="/"
              className={twMerge("w-full", isCollapsed ? "" : "pl-2")}
              aria-label={isCollapsed ? "Support" : undefined}
            >
              <div className="flex items-center gap-x-2">
                <Icon aria-hidden="true">
                  <HelpCircleIcon className="w-5 h-5" />
                </Icon>
                <span
                  className={twMerge(
                    "text-sm transition-all duration-300",
                    isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                  )}
                >
                  Support
                </span>
              </div>
            </RouterLink>
          </NavLink>
        </li>
        <li>
          <NavLink>
            <RouterLink
              to="/"
              className={twMerge("w-full", isCollapsed ? "" : "pl-2")}
              aria-label={isCollapsed ? "Feedback" : undefined}
            >
              <div className="flex items-center gap-x-2">
                <Icon aria-hidden="true">
                  <SendIcon className="w-5 h-5" />
                </Icon>
                <span
                  className={twMerge(
                    "text-sm transition-all duration-300",
                    isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                  )}
                >
                  Feedback
                </span>
              </div>
            </RouterLink>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
