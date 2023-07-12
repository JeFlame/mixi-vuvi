import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function registerUser(ev) {
        ev.preventDefault();
        axios.get('http://localhost:4000/test');
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="mb-64">
                <h1 className="font-bold text-3xl text-center my-2">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="Username"
                        value={username} onChange={ev => setUsername(ev.target.value)} />
                    <input type="password" placeholder="Password"
                        value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary mt-2">Register</button>
                    <div className="primary mt-1">
                        Already have account? <Link className="underline text-black" to={'/login'}>Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}