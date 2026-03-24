import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-brand-darkGrey border border-white/10 p-8 rounded-2xl max-w-md w-full relative z-10"
          >
            <FiAlertTriangle className="text-brand-orange text-4xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl bg-brand-lightGrey font-bold">Cancel</button>
              <button onClick={onConfirm} className="flex-1 px-4 py-3 rounded-xl bg-brand-orange font-bold text-white">Confirm</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;