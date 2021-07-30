import React, { ChangeEvent } from "react";

type ProfileStatusPrposType = {
  status: string;
  updateStatus: (status: string) => void;
};

class ProfileStatus extends React.Component<ProfileStatusPrposType> {
  state = {
    editMode: false,
    status1: this.props.status,
  };
  activateEditMode = () => {
    this.setState({ editMode: true });
  };
  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status1);
  };
  onSatatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status1: e.currentTarget.value,
    });
  };
  componentDidUpdate(
    prevProps: ProfileStatusPrposType,
    prevState: ProfileStatusPrposType
  ) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }
  render() {
    return (
      <div>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || " --- no status"}
            </span>
          </div>
        ) : (
          <div>
            <input
              autoFocus
              onBlur={this.deactivateEditMode}
              onChange={this.onSatatusChange}
              value={this.state.status1}
              type="text"
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
