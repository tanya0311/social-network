import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import {
  MapStateToPropsWithRedirectType,
  withAuthRedirect,
} from "../../hoc/AuthRedirect";
import {
  getUserProfileTC,
  getStatusTC,
  updateStatusTC,
  ProfileUserPropsType,
} from "../../redux/profile-reducer";
import { RootReducersType } from "../../redux/redux-store";
import Profile from "./Profile";

type MapStateToPropsType = {
  profile: ProfileUserPropsType | null;
  status: string;
  authorizedUserid: number | null;
  isAuth: boolean;
};
type MapDispathToPropsType = {
  // setUserProfile: (profile: ProfileUserPropsType) => void;
  getUserProfileTC: (userId: number | null) => void;
  getStatusTC: (userId: number | null) => void;
  updateStatusTC: (status: string) => void;
};

export type ProfileContainerType = MapStateToPropsWithRedirectType &
  MapStateToPropsType &
  MapDispathToPropsType;

type PathParamsType = {
  userId: string;
  // userId?: number | undefined,
};
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserid: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    let id = Number(this.props.match.params.userId);
    let userId = id ? id : this.props.authorizedUserid;
    // if (!isAuth) return <Redirect to={"/login"} />;

    this.props.getUserProfileTC(userId);
    this.props.getStatusTC(userId);
  }
  render() {
    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatusTC}
        />
      </div>
    );
  }
}

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispathToPropsType, {}, RootReducersType>(
    mapStateToProps,
    { getUserProfileTC, getStatusTC, updateStatusTC }
  ),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect<
//   MapStateToPropsType,
//   MapDispathToPropsType,
//   {},
//   RootReducersType
// >(mapStateToProps, { getUserProfileTC })(withUrlDataContainerComponent);
