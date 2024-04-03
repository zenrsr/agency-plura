"use client";

import { NotificationWithUser } from "@/lib/types";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { Bell } from "lucide-react";
import { Role } from "@prisma/client";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./mode-toggle";

type Props = {
  notifications: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
};

const InfoBar = ({ notifications, role, className, subAccountId }: Props) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);

  const handleCLick = () => {
    if (showAll) {
      setAllNotifications(notifications);
    } else {
      if (notifications?.length !== 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            []
        );
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ",
          className
        )}
      >
        <div className="flex items-center gap-2 ml-auto">
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <div className="rounded-full w-9 h-9 flex items-center justify-center bg-primary text-white">
                <Bell size={17} />
              </div>
            </SheetTrigger>
            <SheetContent className="mt-4 mr-4 pr-4 flex flex-col" showX={true}>
              <SheetHeader className="text-left">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
                    <Card className="flex items-center p-4 justify-between">
                      Current SubAccount
                      <Switch onCheckedChange={handleCLick} />
                    </Card>
                  )}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {allNotifications?.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis items-center p-4"
                  >
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src={notification.User.avatarUrl}
                          alt="User Avatar dp"
                        />
                        <AvatarFallback className="bg-primary">
                          {notification.User.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p>
                          <span className="font-bold">
                            {notification.notification.split("|")[0]}
                          </span>
                          <span className="text-muted-foreground">
                            {notification.notification.split("|")[1]}
                          </span>
                          <span className="font-bold">
                            {notification.notification.split("|")[2]}
                          </span>
                        </p>
                        <small className="text-xs text-muted-foreground">
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {allNotifications?.length === 0 && (
                <div className="flex items-center justify-center mb-4 text-muted-foreground">
                  You have no notifications
                </div>
              )}
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default InfoBar;
