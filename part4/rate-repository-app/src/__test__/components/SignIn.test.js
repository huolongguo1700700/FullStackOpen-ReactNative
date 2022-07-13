import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

const credentials = {
    username: 'kalle',
    password: 'password'
}

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()
      const { getByTestId, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      )

      fireEvent.changeText(
        getByTestId('username'),
        credentials.username
      )

      fireEvent.changeText(
        getByTestId('password'),
        credentials.password
      )

      await act( () => {
        fireEvent.press(getByText('Sign In'))
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual(credentials);
      });
    });
  });
});