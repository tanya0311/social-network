import React from "react"

type ContactPropsType = {
	contactTitle: string
	contactValue: string | undefined | null
}
const Contacts = (props: ContactPropsType) => {
	return (
		<div>
			<b>{props.contactTitle}</b> <span> {props.contactValue}</span>
		</div>
	)
}
export default Contacts