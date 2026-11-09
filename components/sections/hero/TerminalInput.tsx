"use client";

import { motion } from "framer-motion";

const TerminalInput = ({
  input,
  setInput,
  inputRef,
  handleSubmit,
  handleKeyDown,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center min-w-0">
      <span className="terminal-prompt mr-2 flex-shrink-0 text-xs sm:text-sm">
        <span className="hidden sm:inline">user@portfolio:~$</span>
        <span className="sm:hidden">$</span>
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="terminal-input-field flex-1 min-w-0 bg-transparent text-xs outline-none sm:text-sm terminal-input"
        autoComplete="off"
        spellCheck="false"
        style={{ wordBreak: "break-all" }}
      />
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="terminal-cursor ml-1 h-3 w-1 flex-shrink-0 sm:h-4 sm:w-2"
      />
    </form>
  );
};

export default TerminalInput;
