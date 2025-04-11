interface ModalProps{
    open: boolean,
    children: React.ReactNode,
    cerrar: ()=> void
}

const Modal: React.FC<ModalProps> = ({ open, cerrar, children }) => {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-[#000000B3] flex justify-center items-center z-50">
            <div className="bg-white rounded-md p-6 shadow-lg max-w-md w-full">
            <button className=" absolute top-36 right-4 mr-135 text-gray-500 hover:text-gray-700 focus:outline-none " type="button" onClick={cerrar}>
            x
            </button>
            <div>{children}</div>
            
            </div>
        </div>
    );
};
export default Modal