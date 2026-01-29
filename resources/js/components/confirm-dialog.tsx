type confirmDialogProps = {
    message: string,
    onCancel : () => void,
    onConfirm : () => void
}

export default function ConfirmDialog({ message, onCancel = () => {}, onConfirm = () => {} }: confirmDialogProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="ml-35 px-5 py-1 bg-white rounded right-2 w-140 h-50">
                <div className="text-right">
                    <button onClick = {() => onCancel()} className="text-gray-500 hover:text-gray-800 text-xl font-bold">
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    <p className="mb-4 text-black"> {message}</p>
                </div>
                <div className="text-right">
                    <button onClick = {() => onCancel()} className="px-3 py-1 mx-2 my-2 border rounded">Cancel</button>
                    <button onClick = {() => onConfirm()} className="px-3 py-1 bg-indigo-600 text-white font-bold rounded">Confirm</button>
                </div>
            </div>
        </div>

    );
}