import React from 'react';
import {fireEvent} from '@testing-library/react';
import {render, cleanup} from '@testing-library/react';
import Form from 'components/Appointment/Form';
const state = {
  days: [
    {
      id: 1,
      name: 'Monday',
      appointments: [1, 2, 3],
      interviewers: [1, 2],
    },
    {
      id: 2,
      name: 'Tuesday',
      appointments: [4, 5],
      interviewers: [1, 2],
    },
  ],
  appointments: {
    1: {id: 1, time: '12pm', interview: null},
    2: {id: 2, time: '1pm', interview: null},
    3: {
      id: 3,
      time: '2pm',
      interview: {student: 'Archie Cohen', interviewer: 2},
    },
    4: {id: 4, time: '3pm', interview: null},
    5: {
      id: 5,
      time: '4pm',
      interview: {student: 'Chad Takahashi', interviewer: 2},
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
    2: {
      id: 2,
      name: 'Tori Malcolm',
      avatar: 'https://i.imgur.com/Nmx0Qxo.png',
    },
  },
};
afterEach(cleanup);
const interviewers = [
  {
    id: 1,
    name: 'Sylvia Palmer',
    avatar: 'https://i.imgur.com/LpaY82x.png',
  },
];
//________getbypaceholderstext, bytestid________
describe('Form', () => {
  it('renders without student name if not provided', () => {
    const {getByPlaceholderText} = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });
  it('renders with initial student name', () => {
    const {getByTestId} = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });
});

//________getbytext, querybytext___________
it('validates that the student name is not blank', () => {
  // makes mock onSave function
  const onSave = jest.fn();
  /* Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
  const {getByText} = render(
    <Form interviewers={interviewers} onSave={onSave} />
  );

  fireEvent.click(getByText('Save'));
  expect(getByText(/Student Name Cannot Be Blank/i)).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();
});

it('can successfully save after trying to submit an empty student name', () => {
  const onSave = jest.fn();
  const {getByText, getByPlaceholderText, queryByText} = render(
    <Form interviewers={interviewers} onSave={onSave} />
  );

  fireEvent.click(getByText('Save'));
  expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();

  fireEvent.change(getByPlaceholderText('Enter Student Name'), {
    target: {value: 'Lydia Miller-Jones'},
  });
  fireEvent.click(getByText('Save'));

  expect(queryByText(/student name cannot be blank/i)).toBeNull();
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', null);
});

it('calls onCancel and resets the input field', () => {
  const onCancel = jest.fn();
  const {getByText, getByPlaceholderText, queryByText} = render(
    <Form
      interviewers={interviewers}
      name="Lydia Mill-Jones"
      onSave={jest.fn()}
      onCancel={onCancel}
    />
  );

  fireEvent.click(getByText('Save'));

  fireEvent.change(getByPlaceholderText('Enter Student Name'), {
    target: {value: 'Lydia Miller-Jones'},
  });

  fireEvent.click(getByText('Cancel'));

  expect(queryByText(/student name cannot be blank/i)).toBeNull();

  expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');

  expect(onCancel).toHaveBeenCalledTimes(1);
});
