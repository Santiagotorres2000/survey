"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  HomeIcon,
  Building2Icon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const [user, setUser] = useState<{
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    role?: string | null
  } | null>(null)

  const router = useRouter()

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("companyId")
        localStorage.removeItem("companyName")
      }
    } catch (e) {
      console.error("Error clearing localStorage on logout:", e)
    }
    // Reset local user state and navigate to login
    setUser(null)
    router.push("/login")
  }


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex-1 truncate font-semibold">SISTEMA DE ENCUESTAS</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="block">
              <SidebarMenuButton asChild>
                <button>
                  <HomeIcon />
                  <span>INICIO</span>
                </button>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/empresas" className="block">
              <SidebarMenuButton asChild>
                <button>
                  <Building2Icon />
                  <span>EMPRESAS</span>
                </button>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/usuarios" className="block">
              <SidebarMenuButton asChild>
                <button>
                  <UsersIcon />
                  <span>USUARIOS</span>
                </button>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/encuestas" className="block">
              <SidebarMenuButton asChild>
                <button>
                  <FileTextIcon />
                  <span>ENCUESTAS</span>
                </button>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/configuracion" className="block">
              <SidebarMenuButton asChild>
                <button>
                  <SettingsIcon />
                  <span>CONFIGURACION</span>
                </button>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-medium">SB</div>
            <div className="flex-1">
              <div className="text-sm font-medium">usuario</div>
              <div className="text-xs text-slate-500">correo</div>
            </div>
            <div>
              <Link href="/perfil" className="block">
                <SidebarMenuButton asChild>
                  <button aria-label="Perfil">
                    <UserIcon />
                  </button>
                </SidebarMenuButton>
              </Link>
            </div>
          </div>

          <div className="mt-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOutIcon />
                  <span>CERRAR SESION</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar