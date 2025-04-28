import React from 'react'

type ModalMessageProps = {
  message: string
  onClose: () => void
}

const ModalMessage: React.FC<ModalMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-[90%] max-w-sm">
        <p className="text-center font-medium text-gray-800 dark:text-white">{message}</p>
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalMessage
