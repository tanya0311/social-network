import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { getUsersApi } from "../../api/API";
import {
  getUserProfileTC,
  ProfileUserPropsType,
  setUserProfile,
} from "../../redux/profile-reducer";
import { RootReducersType } from "../../redux/redux-store";
import Profile from "./Profile";

type MapStateToPropsType = {
  profile: ProfileUserPropsType | null;
  isAuth: boolean;
};
type MapDispathToPropsType = {
  // setUserProfile: (profile: ProfileUserPropsType) => void;
  getUserProfileTC: (userId: number) => void;
};

export type ProfileContainerType = MapStateToPropsType & MapDispathToPropsType;

type PathParamsType = {
  userId: string;
  // userId?: number | undefined,
};
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
  };
};

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    let userId = Number(this.props.match.params.userId);
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfileTC(userId);
    // getUsersApi.getProfile(userId).then((data) => {
    //   this.props.setUserProfile(data);
    // });
  }
  render() {
    if (!this.props.isAuth) return <Redirect to={"/login"} />;
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}
let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect<
  MapStateToPropsType,
  MapDispathToPropsType,
  {},
  RootReducersType
>(mapStateToProps, { getUserProfileTC })(withUrlDataContainerComponent);
