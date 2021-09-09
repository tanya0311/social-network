import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { RouteComponentProps } from "react-router-dom"
import { compose } from "redux"
import { MapStateToPropsWithRedirectType } from "../../hoc/AuthRedirect"
import {
	getUserProfileTC,
	getStatusTC,
	updateStatusTC,
  savePhotoTC,
	ProfileUserPropsType,
} from "../../redux/profile-reducer"
import { RootReducersType } from "../../redux/redux-store"
import Profile from "./Profile"

type MapStateToPropsType = {
	profile: ProfileUserPropsType | null
	status: string
	authorizedUserid: number | null
	isAuth: boolean
}
type MapDispathToPropsType = {
	getUserProfileTC: (userId: number | null) => void
	getStatusTC: (userId: number | null) => void
	updateStatusTC: (status: string) => void
	savePhotoTC: (file: File) => void
}

export type ProfileContainerType = MapStateToPropsWithRedirectType &
	MapStateToPropsType &
	MapDispathToPropsType

type PathParamsType = {
	userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserid: state.auth.id,
		isAuth: state.auth.isAuth,
	}
}

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		let id = Number(this.props.match.params.userId)
		let userId = id ? id : this.props.authorizedUserid
		if (!userId) {
			this.props.history.push("/login")
		}

		this.props.getUserProfileTC(userId)
		this.props.getStatusTC(userId)
	}
	componentDidMount() {
		this.refreshProfile()
	}
	componentDidUpdate(prevProps:Readonly<PropsType>) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile()
		}
	}
	render() {
		return (
			<div>
				<Profile
					{...this.props}
					profile={this.props.profile}
					status={this.props.status}
					updateStatus={this.props.updateStatusTC}
          isOwner={!this.props.match.params.userId}
          savePhoto={this.props.savePhotoTC}
				/>
			</div>
		)
	}
}

export default compose<React.ComponentType>(
	connect<MapStateToPropsType, MapDispathToPropsType, {}, RootReducersType>(
		mapStateToProps,
		{ getUserProfileTC, getStatusTC, updateStatusTC, savePhotoTC}
	),
	withRouter
	// удалили withAuthRedirect тк он защищает профайл, что бы посмотреть его нам надо залогиниться
	// withAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect<
//   MapStateToPropsType,
//   MapDispathToPropsType,
//   {},
//   RootReducersType
// >(mapStateToProps, { getUserProfileTC })(withUrlDataContainerComponent);
