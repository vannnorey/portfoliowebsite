// GlassInput.tsx
import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

/**
 * GlassInput - minimal input wrapper WITHOUT a built-in label.
 * Parent should render an external <label> to control spacing.
 */
export function GlassInput(props: Props) {
  return (
    <div className="relative group">
      <input
        {...props}
        className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30
                   focus:border-[#6EAEDC]/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#6EAEDC]/20 outline-none transition-all"
      />

      {/* Neon glow on focus — preserved exactly */}
      <div
        className="absolute -inset-[1px] bg-gradient-to-r from-[#6EAEDC]/0 to-[#427396]/0
                   group-focus-within:from-[#6EAEDC]/40 group-focus-within:to-[#427396]/40
                   rounded-xl blur-md transition-all -z-10"
      />
    </div>
  );
}
