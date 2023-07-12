import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="mb-64">
                <h1 className="font-bold text-3xl text-center my-2">Login</h1>
                <form className="max-w-md mx-auto">
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button className="primary mt-2">Login</button>
                    <div className="primary mt-1">
                        Don&apos;t have account yet? <Link className="underline text-black" to={'/register'}>Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}