import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        {/* Logo + Tagline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            {/* <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">S</span>
            </div> */}
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              samvidya<span className="text-muted-foreground text-base font-normal">.com</span>
            </span>
          </div>

          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          Structure your YouTube learning journey with distraction-free tools, personalized paths, and progress tracking. Learn deeply, without the noise.
        </p>

        {/* Bottom Line */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 Samvidya. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Built with ❤️ for learners everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
