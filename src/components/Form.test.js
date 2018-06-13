import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Form from './Form';
import sinon from 'sinon';

enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Form status={{}} />, div);
});

it('renders a name input', () => {
  expect(shallow(<Form status={{}} />).find('#name').length).toEqual(1);
});
it('renders an email input', () => {
  expect(shallow(<Form status={{}} />).find('#email').length).toEqual(1);
});
it('renders a message input', () => {
  expect(shallow(<Form status={{}} />).find('#message').length).toEqual(1);
});

it('should NOT call handleSubmit on form submit when fields are empty', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<Form status={{}} />);
  const spy = jest.spyOn(Form.prototype, 'handleSubmit');
  // simulate form submission
  wrapper.find('#form').simulate('submit', { preventDefault() {} });
  // test to see handleSubmit is not called without any values
  expect(spy).not.toHaveBeenCalled();
});

it('should call handleSubmit on form submit', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<Form status={{}} />);
  const spy = jest.spyOn(Form.prototype, 'handleSubmit');
  wrapper.find('#name').simulate('change', {
    target: { name: 'name', value: 'John Doe' }
  });
  wrapper.find('#email').simulate('change', {
    target: { name: 'email', value: 'john@doe.com' }
  });
  wrapper.find('#message').simulate('change', {
    target: { name: 'message', value: 'cats' }
  });
  // simulate form submission
  wrapper.find('#form').simulate('submit', { preventDefault() {} });
  // test to see handleSubmit is called
  expect(spy).toHaveBeenCalled();
});

it('should call handleFormSubmit prop on form submit with exact values', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<Form status={{}} handleFormSubmit={mockFn} />);
  wrapper.find('#name').simulate('change', {
    target: { name: 'name', value: 'John Doe' }
  });
  wrapper.find('#email').simulate('change', {
    target: { name: 'email', value: 'john@doe.com' }
  });
  wrapper.find('#message').simulate('change', {
    target: { name: 'message', value: 'Some message' }
  });
  // simulate form submission
  wrapper.find('#form').simulate('submit', { preventDefault() {} });
  // test to see handleFormSubmit is called with exact values
  expect(mockFn.mock.calls[0][0]).toEqual({
    name: 'John Doe',
    email: 'john@doe.com',
    message: 'Some message'
  });
});
