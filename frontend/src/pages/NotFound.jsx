import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
            
            <div className="max-w-md w-full">
                <h1 className="text-9xl font-bold text-slate-200 font-['Space_Grotesk'] select-none">
                    404
                </h1>
                
                <h2 className="text-3xl font-bold text-slate-900 mt-4 font-['Space_Grotesk']">
                    Page Not Found
                </h2>
                
                <p className="mt-4 text-slate-500 text-lg">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                
                <div className="mt-10 flex justify-center">
                    <Link to="/">
                        <Button variant="primary">
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
