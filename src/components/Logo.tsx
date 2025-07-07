import {motion} from "framer-motion";
const Logo = () => {
  return (
    <motion.div className="flex items-center space-x-2"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <img src="/image/logo.png" className="h-8 w-8 rounded-full"/>
        <span className="text-xl font-light text-slate-800">Ethereal</span>
    </motion.div>
  )
}

export default Logo