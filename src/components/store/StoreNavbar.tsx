import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Search, User as UserIcon, LogOut, ShoppingBag, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { storeSupabaseClient } from '@/lib/supabase';
import { useAuthStore } from '@/storage/auth';
import { useCart } from '@/storage/cart';

export function StoreNavbar() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const { search } = useSearch({ from: '/_store' });
  const { cart } = useCart();

  const handleLogout = async () => {
    await storeSupabaseClient.auth.signOut();
    clearUser();
    navigate({ to: '/' });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate({ to: '/', search: { search: e.target.value } });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background px-4">
      <div className="container mx-auto flex h-14 items-center justify-between gap-6">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-md bg-primary/10 text-primary">
            <img src="/appicon.png" alt="Fresh Store" className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Fresh Store</span>
        </Link>
        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products..."
              value={search || ''}
              onChange={handleSearch}
              className="pl-9 pr-4 h-9 w-full bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: '/cart' })}
            className="h-9 w-9 relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="size-5" />
            <span className="absolute -top-1 right-0 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[0.6rem]">
              {cart.items.length}
            </span>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-3 gap-2 hover:bg-accent">
                  <div className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary">
                    <UserIcon className="size-3.5" />
                  </div>
                  <span className="hidden sm:inline-block text-sm font-medium">
                    {user.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 size-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <ShoppingBag className="mr-2 size-4" />
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate({ to: '/login' })}
                className="hidden sm:inline-flex h-9"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate({ to: '/register' })}
                className="hidden sm:inline-flex h-9"
              >
                Register
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden">
                    <UserIcon className="size-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate({ to: '/login' })}
                    className="cursor-pointer"
                  >
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate({ to: '/register' })}
                    className="cursor-pointer"
                  >
                    Register
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
