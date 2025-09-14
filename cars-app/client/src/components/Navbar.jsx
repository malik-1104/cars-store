import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Crown, BatteryCharging, DollarSign, Menu, X, Search as SearchIcon } from "lucide-react";
import Search from "./Search";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  const actionButtonStyles = "inline-flex items-center justify-center h-10 w-10 text-sm font-medium rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground";
  const navLinkStyles = "text-muted-foreground hover:text-foreground transition-colors";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center space-x-2 mr-4" to="/" onClick={closeMenu}>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CarsStore
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link className={navLinkStyles} to="/" onClick={closeMenu}>Home</Link>
              <Link className={navLinkStyles} to="/Cars" onClick={closeMenu}>Cars</Link>
              <Link className={navLinkStyles} to="/Inspection" onClick={closeMenu}>Inspections</Link>
              <Link className={navLinkStyles} to="/Sale" onClick={closeMenu}>Sales</Link>
              <Link className={navLinkStyles} to="/Statistics" onClick={closeMenu}>Statistics</Link>
            </div>

            <div className="hidden lg:flex items-center flex-1 max-w-[250px] mx-4">
              <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Search />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link to="/luxury-cars" onClick={closeMenu}>
                <button className={actionButtonStyles}>
                  <Crown className="h-5 w-5 text-current" />
                </button>
              </Link>

              <Link to="/electric-cars" onClick={closeMenu}>
                <button className={actionButtonStyles}>
                  <BatteryCharging className="h-5 w-5 text-current" />
                </button>
              </Link>

              <Link to="/economy-cars" onClick={closeMenu}>
                <button className={actionButtonStyles}>
                  <DollarSign className="h-5 w-5 text-current" />
                </button>
              </Link>

              <button
                onClick={toggleMenu}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 text-sm font-medium rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5 text-current" /> : <Menu className="h-5 w-5 text-current" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
              <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Search />
              </div>
            </div>

            <div className="space-y-4">
              <Link className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2" to="/" onClick={closeMenu}>Home</Link>
              <Link className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2" to="/Cars" onClick={closeMenu}>Cars</Link>
              <Link className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2" to="/Inspection" onClick={closeMenu}>Inspections</Link>
              <Link className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2" to="/Sale" onClick={closeMenu}>Sales</Link>
              <Link className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2" to="/Statistics" onClick={closeMenu}>Statistics</Link>
              <Link className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2" to="/Notes" onClick={closeMenu}>Notes</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
