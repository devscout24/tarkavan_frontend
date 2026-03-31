
'use client';

import * as React from 'react';

  
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem, 
} from '@/components/animate-ui/components/radix/sidebar';
 


type RootLayoutProps = {
  children: React.ReactNode
}

export default function PlayerLayout({ children }: RootLayoutProps) {
  return (
    
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>Item 1</SidebarMenuItem>
        <SidebarMenuItem>Item 2</SidebarMenuItem>
        <SidebarMenuItem>Item 3</SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Label 1</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>Item 1</SidebarMenuItem>
          <SidebarMenuItem>Item 2</SidebarMenuItem>
          <SidebarMenuItem>Item 3</SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Label 2</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>Item 1</SidebarMenuItem>
          <SidebarMenuItem>Item 2</SidebarMenuItem>
          <SidebarMenuItem>Item 3</SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>Item 1</SidebarMenuItem>
        <SidebarMenuItem>Item 2</SidebarMenuItem>
        <SidebarMenuItem>Item 3</SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {children}
  </SidebarInset>
</SidebarProvider>
  )
}




