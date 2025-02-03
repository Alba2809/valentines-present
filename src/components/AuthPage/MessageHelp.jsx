import { motion } from "motion/react";

function MessageHelp({ message }) {
  return (
    <motion.p
      key="message"
      className="text-center text-gray-800 dark:text-gray-200 font-montez"
      style={{ fontSize: "2.8vh" }}
      layout
    >
      {message}
    </motion.p>
  );
}

export default MessageHelp;
