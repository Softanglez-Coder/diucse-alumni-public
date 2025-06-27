export const HomeMap = () => {
    return <div className="bg-primary/5">
        <div className="container mx-auto px-4 md:px-0 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary">Our Community Map</h2>
                <p className="text-gray-600 mt-2">
                    Explore our global community and connect with alumni around the world.
                </p>
            </div>
            <div className="w-full h-[500px] bg-gray-200 rounded-lg shadow-md">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6988377807825!2d90.44456441188154!3d23.79373637855178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c775164bf631%3A0x97f48a5be913a9fc!2sDhaka%20International%20University!5e0!3m2!1sen!2sbd!4v1751030868619!5m2!1sen!2sbd" className="border-0 w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
};