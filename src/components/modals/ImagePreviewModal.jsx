import BaseModal from "../ui/BaseModal";

export default function ImagePreviewModal({ isOpen, onClose, imageUrl, altText = "Preview" }) {
  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={altText} // Fallback title for accessibility/layout
    >
      <div className="flex items-center justify-center w-full h-full bg-transparent">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-md select-none"
        />
      </div>
    </BaseModal>
  );
}