import React from "react"

import Login from "../../component/Auth/Login/Login"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import Header from "../../component/Profile/Header"

const Profile = () => {
	return (
		<LayoutDefault>
			<LayoutTopContent>
				<Header />
			</LayoutTopContent>
		</LayoutDefault>
	)
}

export default Profile
