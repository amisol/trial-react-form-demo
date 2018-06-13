import * as React from 'react';
import { connect } from 'react-redux';
import notie from 'notie';

// CSS
import './App.css';

// Redux Actions
import * as Actions from './actions';

// Main form component
import Form from './components/Form';

export class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    // Our redux store gives us progress of form submission. We will use that data to show a notification of its success/failure
    const newStatus = nextProps.status || {};
    const status = this.props.status || {};
    if (status.progress === 'fetching' && newStatus.progress === 'fetched') {
      notie.alert({
        type: 1,
        text: 'Data submitted',
        time: 2.5,
        position: 'top'
      });
    }
    if (status.progress === 'fetching' && newStatus.progress === 'error') {
      notie.alert({
        type: 3,
        text: newStatus.message || 'Error',
        time: 2.5,
        position: 'top'
      });
    }
  }
  handleFormSubmit = data => {
    // Call redux action here
    this.props.dispatch(Actions.submitFormDataToApi(data));
  };
  render() {
    const status = this.props.status;
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2>Responsive Trial Form 🚀</h2>
        </div>
        <Form status={status} handleFormSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    status: store
  };
}

export default connect(mapStateToProps)(App);
