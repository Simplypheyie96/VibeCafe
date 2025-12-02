import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

export function ModalShell({ title, description, children, onClose }) {
  const normalizedChildren = React.Children.toArray(children).map(
    (child, index) => (
      <div key={index} className="w-full">
        {child}
      </div>
    )
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      {/* Dim background */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="
          relative
          w-full
          max-w-[500px]
          max-h-[75vh]
          bg-black/40
          border border-white/10
          rounded-[20px]
          overflow-hidden
          flex flex-col
          shadow-[0_8px_32px_rgba(0,0,0,0.45)]
        "
      >
        {/* Header */}
        <div className="p-6 pb-3 border-b border-white/10 flex items-start justify-between">
          <div>
            <h2 className="text-[22px] text-white font-semibold">{title}</h2>
            {description && (
              <p className="text-[13px] text-white/60 mt-1">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="
            flex-1
            overflow-y-auto
            custom-scroll
            px-6
            py-6
            modal-gap-6
          "
        >
          {normalizedChildren}
        </div>
      </div>
    </div>,
    document.body
  );
}
