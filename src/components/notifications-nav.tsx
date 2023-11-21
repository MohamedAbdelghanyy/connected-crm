"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { errorHandler } from "./ui/custom/error-handler";
import { toast } from "./ui/use-toast";

export function NotificationsNav() {

  const notificationsList = [
    {
      id: '1',
      title: 'New Product',
      description: 'A new product is waiting for your approval, click here to view.'
    },
    {
      id: '2',
      title: 'New Registration',
      description: 'A new customer id waiting for your approval, click here to view.'
    },
    {
      id: '3',
      title: 'Update Required',
      description: 'BMW X7 hasn\'t been updated for 1 month, click here to update now.'
    }
  ];

  return (
    <div className="pr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8" style={{ cursor: "pointer" }}>
            <AvatarFallback>
              <Icons.notifications className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{ width: '500px' }}>
          <DropdownMenuLabel className="p-4" style={{ fontSize: '16px' }}>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notificationsList.length > 0 ? (
            <DropdownMenuGroup>
              {notificationsList.map((notification) => {
                return (<DropdownMenuItem
                  key={notification.id}
                  className="p-4"
                  onClick={
                    () => {
                      errorHandler(toast, "ERRX");
                    }
                  }
                >
                  <Icons.notifications className="mr-2 h-6 w-6" />
                  <div className="ml-2" style={{ display: "block" }}>
                    <span><b>{notification.title}</b></span><br />
                    <span>{notification.description}</span>
                  </div>
                </DropdownMenuItem>);
              })}
            </DropdownMenuGroup>)
            : (
              <DropdownMenuItem className="p-4">
                <div className="w-full" style={{ textAlign: 'center' }}>
                  <p>No notifications.</p>
                </div>
              </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
