import React from "react";
import Logo from "../Logo";

function Footer() {
    return (
        <footer className="bg-gray-300 border-t-2 border-t-black py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center">
                    <div className="mb-4">
                        <Logo width="100px" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            &copy; Copyright 2023. All Rights Reserved by DevUI.
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <a href="mailto:info@devui.com" className="hover:text-gray-700">
                                info@devui.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-600">
                            <a href="https://github.com/Ashmit0405" className="hover:text-gray-700">
                                GitHub
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
