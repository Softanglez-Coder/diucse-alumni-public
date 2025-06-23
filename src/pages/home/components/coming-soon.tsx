import { useEffect, useState } from "react";

export const ComingSoonHome = () => {
    const calculateTimeLeft = () => {
        const currentDate = new Date();
        const targetDate = new Date('2025-07-09T00:00:00Z');
        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [time, setTime] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container mx-auto p-4 py-16">
            <div>
                <h1 className="text-7xl mb-8">Coming Soon....</h1>
                <p className="mb-8 max-w-[50ch]">This page is under construction. Stay tuned for updates! In the meantime, feel free to explore other sections of our site. Thank you for your patience!</p>
            </div>

            <div className="flex flex-col items-start">
                <h2 className="text-xl mb-4">We will be live on...</h2>
                <ul className="flex gap-4 items-center justify-center flex-wrap">
                    <li className="flex items-center flex-col justify-center px-6 py-4 bg-gray-100 rounded">
                        <span className="text-7xl font-bold">{ time.days }</span>
                        <span>days</span>
                    </li>

                    <li className="flex items-center flex-col justify-center px-6 py-4 bg-gray-100 rounded">
                        <span className="text-7xl font-bold">{ time.hours }</span>
                        <span>hours</span>
                    </li>

                    <li className="flex items-center flex-col justify-center px-6 py-4 bg-gray-100 rounded">
                        <span className="text-7xl font-bold">{ time.minutes }</span>
                        <span>minutes</span>
                    </li>

                    <li className="flex items-center flex-col justify-center px-6 py-4 bg-gray-100 rounded">
                        <span className="text-7xl font-bold">{ time.seconds }</span>
                        <span>seconds</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};