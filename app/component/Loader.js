import React from 'react'
import { FiLoader } from "react-icons/fi";

const Loader = ({ height = "h-screen" }) => {
	return (
		<>
			<div className={`z-50 ${height}  w-full backdrop-blur-md flex justify-center items-center `}>
				<div className="animate-spin">
					<FiLoader className="text-2xl dark:text-white" />
					{/* <AiOutlineLoading3Quarters className="text-2xl text-white" /> */}
				</div>
			</div>
		</>
	)
}

export default Loader