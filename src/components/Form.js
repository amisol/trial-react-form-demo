import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleFormSubmit && this.props.handleFormSubmit(this.state);
  }
  render() {
    const status = this.props.status;
    const isFetching = status.progress === 'fetching';
    return (
      <form onSubmit={this.handleSubmit.bind(this)} id="form">
        <div className="field-group">
          <label htmlFor="name" className="label">
            Full Name:
          </label>
          <div className="field">
            <input
              disabled={isFetching}
              name="name"
              id="name"
              type="text"
              value={this.state.name}
              placeholder="Enter your full name here"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <div className="field">
            <input
              disabled={isFetching}
              name="email"
              id="email"
              type="email"
              value={this.state.email}
              placeholder="Enter email here (john.doe@gmail.com)"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="message" className="label">
            Message:
          </label>
          <div className="field">
            <textarea
              disabled={isFetching}
              id="message"
              name="message"
              rows="6"
              cols="50"
              value={this.state.message}
              placeholder="Enter your message here..."
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="field-group">
          <div className="field">
            <button
              disabled={isFetching}
              id="saveForm"
              name="saveForm"
              type="submit">
              {isFetching ? '🚗 Sending data to cloud...' : 'Submit 👍'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
