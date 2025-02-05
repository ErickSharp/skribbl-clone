import React, { FC, useContext, useRef, useState } from 'react';
import { ClientContext } from './hooks';
import { ClientMessages } from './ws/messages';
import { themeColors } from '.';

export const Login: FC = () => {
    const usernameInputRef = useRef<HTMLInputElement>();
    const colorInputRef = useRef<HTMLInputElement>();

    const { client } = useContext(ClientContext);

    const handleLogin = () => {
        const username = usernameInputRef.current.value;
        const color = colorInputRef.current.value as `#${string}`;

        // @ts-ignore
        client.sendMessage({
            _message: ClientMessages.LoginToGame,
            username,
            color,
            censorUserContent: false, // TODO add option in UI
        });
    };

    const [color, setColor] = useState('');

    const handleColorChange = () => {
        if (colorInputRef.current) {
            if (!colorInputRef.current.value.includes('#')) {
                setColor(`#${colorInputRef.current.value}`);
            } else {
                setColor(colorInputRef.current.value);
            }
        }
    };

    return (
        <div className="max-w-xl w-96 flex flex-col justify-center mx-auto font-mono h-screen items-center">
            <h1 className="text-3xl font-bold place-self-start" style={{ color: themeColors.ACCENT }}>Login</h1>
            <div className="w-full py-4">
                <div className="w-full py-1">
                    <input
                        className="focus:outline-none shadow-xl text-xl py-2 pl-4 w-full placeholder-opacity-60"
                        placeholder="Name"
                        ref={usernameInputRef}
                        type="text"
                        style={{ background: themeColors.STANDARD, color: themeColors.ACCENT }}
                    />
                </div>
                <div className="w-full py-1">
                    <input
                        className="focus:outline-none shadow-xl text-xl py-2 pl-4 w-full placeholder-opacity-60"
                        placeholder="Color"
                        ref={colorInputRef}
                        type="text"
                        style={{ background: themeColors.STANDARD, color: themeColors.ACCENT }}
                        onChange={() => handleColorChange()}
                    />
                </div>
                <div className="full h-2 py-2" style={{ background: color }} />
            </div>

            <button
                className="rounded-md text-lg self-end shadow-xl focus:outline-none py-2 px-6 hover:bg-opacity-80 transition duration-200"
                type="button"
                onClick={handleLogin}
                style={{ background: themeColors.STANDARD, color: themeColors.ACCENT }}
            >
                Login
            </button>
        </div>
    );
};
