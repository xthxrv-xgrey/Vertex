import { RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="mt-auto w-full border-t border-border px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
            <div className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">© {currentYear} Vertex. All rights reserved.</p>

                    <p className="mt-1 text-xs italic text-muted-foreground">
                        Designed with intention. Engineered by{" "}
                        <a
                            href="https://github.com/xthxrv-xgrey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                            Atharv Agrey
                        </a>
                        .
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <a
                        href="https://github.com/xthxrv-xgrey"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <RiGithubFill size={24} aria-hidden="true" />
                    </a>

                    <a
                        href="https://linkedin.com/in/xthxrv-xgrey"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <RiLinkedinBoxFill size={24} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
