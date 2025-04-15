
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  BarChart3,
  LogOut,
  ChevronDown,
  MenuIcon,
  X,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: Array<{
    title: string;
    href: string;
  }>;
  divider?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // In a real app, this would call an authentication service logout method
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // Navigate to home page after logout
    navigate('/');
  };
  
  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin"
    },
    {
      title: "Products",
      icon: <Package size={20} />,
      submenu: [
        { title: "All Products", href: "/admin/products" },
        { title: "Categories", href: "/admin/products/categories" },
        { title: "Add New", href: "/admin/products/new" },
      ]
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      href: "/admin/orders",
    },
    {
      title: "Customers",
      icon: <Users size={20} />,
      href: "/admin/customers",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      href: "/admin/analytics",
    },
    {
      title: "Content",
      icon: <FileText size={20} />,
      submenu: [
        { title: "Blog Posts", href: "/admin/blog" },
        { title: "Pages", href: "/admin/pages" },
        { title: "Media", href: "/admin/media" },
      ]
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      href: "/admin/settings",
      divider: true
    }
  ];

  const NavItem = ({ item }: { item: SidebarItem }) => {
    const isActive = item.href 
      ? location.pathname === item.href
      : item.submenu?.some(submenuItem => location.pathname === submenuItem.href);
    
    const [isOpen, setIsOpen] = React.useState(isActive);

    if (item.submenu) {
      return (
        <Collapsible 
          open={isOpen} 
          onOpenChange={setIsOpen}
          className={cn(
            "w-full",
            item.divider && "mt-4 pt-4 border-t border-muted"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-between hover:bg-muted/50",
                isActive && "bg-muted/50 text-accent"
              )}
            >
              <span className="flex items-center">
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </span>
              <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="pl-10 pr-2">
            {item.submenu.map((submenuItem, index) => {
              const isSubmenuActive = location.pathname === submenuItem.href;
              
              return (
                <Link key={index} to={submenuItem.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start my-1 hover:bg-muted/50",
                      isSubmenuActive && "bg-muted/50 text-accent"
                    )}
                  >
                    {submenuItem.title}
                  </Button>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      );
    }
    
    return (
      <Link 
        to={item.href || "#"} 
        className={cn(
          "w-full",
          item.divider && "mt-4 pt-4 border-t border-muted"
        )}
      >
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start hover:bg-muted/50",
            isActive && "bg-muted/50 text-accent"
          )}
        >
          {item.icon}
          <span className="ml-3">{item.title}</span>
        </Button>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-sidebar py-5">
      <div className="px-4 mb-6">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="font-bold text-xl">
            PIXEL<span className="text-accent">MOTION</span>
          </div>
        </Link>
      </div>
      
      <div className="flex-1 px-4 space-y-1">
        {sidebarItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </div>
      
      <div className="mt-auto border-t border-muted pt-4 px-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@pixelmotion.com</div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="ml-3">Log out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside className="w-64 hidden md:block border-r">
          <SidebarContent />
        </aside>
      )}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MenuIcon size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          )}

          <div className="ml-auto flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Home size={16} className="mr-2" />
                View Store
              </Button>
            </Link>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
