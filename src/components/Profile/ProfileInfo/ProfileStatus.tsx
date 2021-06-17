import React, { ChangeEvent } from "react";

type ProfileStatusPrposType = {
  status: string;
  updateStatus: (status: string) => void;
};

class ProfileStatus extends React.Component<ProfileStatusPrposType> {
  // statusInputRef= React.createRef()
  state = {
    editMode: false,
    status1: this.props.status,
    // editMode: true,
  };
  activateEditMode = () => {
    // debugger
    // console.log('this:', this)
    this.setState({ editMode: true });
    // this.state.editMode = true
    // this.forceUpdate()
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
    // debu gger
    // console.log('1');
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
              // ref={this.statusInputRef}
              autoFocus
              onBlur={this.deactivateEditMode}
              // value={this.pr ops.status}
              onChange={this.onSatatusChange}
              value={this.state.status1}
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
