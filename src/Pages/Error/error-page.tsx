import { Link } from "react-router-dom";


export default function ErrorPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
        <div className="flex flex-col items-center">
            <p>Page Not Found</p>
            <h3 className="text-3xl font-bold animate-pulse">404</h3>
            <Link to={`/`} className="hover:underline duration-500 transition-all">Home</Link>
        </div>
    </div>
  )
}