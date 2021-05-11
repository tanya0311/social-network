import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { ProfileUserPropsType, setUserProfile } from "../../redux/profile-reducer";
import { RootReducersType } from "../../redux/redux-store";
import Profile from "./Profile";

type MapStateToPropsType = {
  profile: ProfileUserPropsType | null;
};
type MapDispathToPropsType = {
  setUserProfile: (profile: ProfileUserPropsType) => void;
};

export type ProfileContainerType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile
  };
};

class ProfileContainer extends React.Component<ProfileContainerType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    axios
      .get(`https://social-network.samuraijs.com/api/1.0//profile/2`)
      .then((response) => {
        // this.props.toggleIsFetching(false);
        this.props.setUserProfile(response.data);
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
