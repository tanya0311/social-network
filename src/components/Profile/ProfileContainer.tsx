
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { getProfileApi } from "../../api/API";
import {
  ProfileUserPropsType,
  setUserProfile,
} from "../../redux/profile-reducer";
import { RootReducersType } from "../../redux/redux-store";
import Profile from "./Profile";

type MapStateToPropsType = {
  profile: ProfileUserPropsType | null;
};
type MapDispathToPropsType = {
  setUserProfile: (profile: ProfileUserPropsType) => void;
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
  };
};

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    let userId = Number(this.props.match.params.userId);
    if (!userId) {
      userId = 2;
    }

    getProfileApi.getProfile(userId).then((data) => {
      // this.props.toggleIsFetching(false);
      this.props.setUserProfile(data);
      // this.props.setUsersTotalCount(response.data.totalCount);
    });
  }
  render() {
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
>(mapStateToProps, { setUserProfile })(withUrlDataContainerComponent);
