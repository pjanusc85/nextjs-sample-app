"use client";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [error, setError] = useState('');

    useEffect(() => {
        const loggedInCookie = Cookies.get('loggedIn');
        console.log('COOKIE: ', loggedInCookie);
        if (loggedInCookie && loggedInCookie === 'true') {
            //window.location.reload();
        }
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            Cookies.set('loggedIn', 'true'); // Set a cookie named 'loggedIn'
            window.location.reload();
            redirect('/');
        } else {
            setError('Invalid username or password');
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <div className="text-red-600">{error}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600">Username</label>
                            <input type="text" id="username" name="username" 
                                onChange={(e) => setUsername(e.target.value)}
                                className="text-black w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-600">Password</label>
                            <input type="password" id="password" name="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-black w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
                        </div>
                    </form>
                </div>
            </div>


            {/* <div>
                <div>{error}</div>
                <form onSubmit={handleSubmit}>
                    <div className="columns-2">
                        <div>
                            Username:
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="columns-2">
                        <div>
                            Password:
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div> */}
        </>
    );
};