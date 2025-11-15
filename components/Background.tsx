
import React from 'react';

export const Background: React.FC = () => (
    <>
        {/* Top Left Illustration */}
        <div className="absolute top-20 left-0 opacity-10 -z-1">
            <svg width="404" height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true" className="text-gray-300">
                <defs>
                    <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                    </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"></rect>
            </svg>
        </div>

        {/* Bottom Right Illustration */}
        <div className="absolute bottom-0 right-0 opacity-10 -z-1 transform translate-x-1/4">
            <svg width="404" height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true" className="text-gray-300">
                <defs>
                    <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d-2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                    </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d-2)"></rect>
            </svg>
        </div>
    </>
);
