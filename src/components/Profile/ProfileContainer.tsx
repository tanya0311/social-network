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
  status:string
};
type MapDispathToPropsType = {
  // setUserProfile: (profile: ProfileUserPropsType) => void;
  getUserProfileTC: (userId: number) => void;
  getStatusTC:(userId: number) => void;
  updateStatusTC:(status:string) => void;
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

        
    //!
    status: state.profilePage.status,
  };
};

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    let userId = Number(this.props.match.params.userId);
    if (!userId) {
      userId = 2;
      // if (!isAuth) return <Redirect to={"/login"} />;
    }
    this.props.getUserProfileTC(userId);

    //!
    this.props.getStatusTC(userId )
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatusTC} />
      </div>
    );
  }
}

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispathToPropsType, {}, RootReducersType>(
    mapStateToProps,
    { getUserProfileTC, getStatusTC, updateStatusTC }
  ),
  withRouter,
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
