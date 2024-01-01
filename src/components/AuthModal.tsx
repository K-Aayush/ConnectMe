"use client"

const AuthModal = ({ isVisible, onClose }: any) => {
    if (!isVisible) return null;

    const handleOnClose = () => {
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-4 rounded">
                <div onClick={handleOnClose} className="cursor-pointer">
                    <span className="text-gray-600 text-lg">×</span>
                </div>
                <div className="">
                    <p className="text-gray-800">This is your modal content.</p>
                </div>
            </div>
        </div>
    )
}

export default AuthModal
