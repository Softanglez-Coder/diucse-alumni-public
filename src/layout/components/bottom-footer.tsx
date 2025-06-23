export const BottomFooter = () => {
    const currentYear = new Date().getFullYear();

    return <div className="bg-gray-800 text-white text-center py-4">
        <p>&copy; CSE DIU alumni - { currentYear }</p>
    </div>
}