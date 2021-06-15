import React from "react";

type ProfileStatusPrposType = {
  status: string;
};

class ProfileStatus extends React.Component<ProfileStatusPrposType> {
  state = {
    editMode: false,
    // editMode: true,
  };
  activateEditMode =()=> {
    // debugger
    // console.log('this:', this)
    this.setState({ editMode: true });
    // this.state.editMode = true
    // this.forceUpdate()
  }
  deactivateEditMode =() => {
    this.setState({ editMode: false });
    // this.state.editMode = true
    // this.forceUpdate()
  }
  render() {
    return (
      <div>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status}
            </span>
          </div>
        ) : (
          <div>
            <input
              autoFocus
              onBlur={this.deactivateEditMode}
              value={this.props.status}
              type="text"
            />
          </div>
        )}
        {/*  other version */}
        {/* {!this.state.editMode &&  <span>{this.props.status}</span>}
        {this.state.editMode &&   <input value={this.props.status} type="text" />} */}
      </div>
    );
  }
}

export default ProfileStatus;
