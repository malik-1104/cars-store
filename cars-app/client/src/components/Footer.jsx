export default function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <a className="flex items-center space-x-2 mb-4" href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CarsStore
              </div>
            </a>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your internal platform for managing used cars and simplifying your work.
            </p>
            <div className="flex space-x-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-6 w-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-facebook h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-6 w-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-twitter h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-6 w-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-instagram h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Cars</h4>
            <ul className="space-y-2">
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="/Cars">All Cars</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="/Sale">Sale</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="/Inspection">Inspection</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Statistics</h4>
            <ul className="space-y-2">
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="/Statistics">All Statistics</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors">Notes</a></li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-map-pin h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="text-sm text-muted-foreground">45 Rue de Chattia, Chlef, Algeria</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-phone h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span className="text-sm text-muted-foreground">+213 123-456-789</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-mail h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="text-sm text-muted-foreground">CarsStore@gmail.com</span>
          </div>
        </div>

        <div className="py-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 CarsStore. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="/privacy">Privacy Policy</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="/terms">Terms of Service</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
