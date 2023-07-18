import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    // const [password, setPassword] = useState('');

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setAvatar(user?.avatar);
    }, [user]);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function updateUser(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.put('/update-user', { name, email });
            setUser(data);
        } catch (e) {
            alert('Update profile failed');
        }
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="flex items-center justify-around">
                    <div className="text-center">
                        <div className="text-xl font-bold mb-2">{`You are logged in as: ${name}`}</div>
                        <form className="max-w-md mx-auto" onSubmit={updateUser}>
                            <input type="text" placeholder="John Doe" value={name} onChange={ev => setName(ev.target.value)} />
                            <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                            {/* <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} /> */}
                            <button className="primary">Update profile</button>
                        </form>
                    </div>

                    <div>
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            {/* <img className="object-cover" src={avatar} alt="" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                    </div>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}