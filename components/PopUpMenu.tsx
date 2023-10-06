import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { CiMenuKebab } from "react-icons/ci"
  
  export function PopUpMenu() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button ><CiMenuKebab   className="h-5 w-5 cursor-pointer"/></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30 bg-body text-white ">
          <DropdownMenuLabel>Folder</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Delete</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
           
          </DropdownMenuGroup>

          
      </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  