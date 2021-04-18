import React from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { TextField, Button } from 'glints-aries';
import { login } from '@/Redux/Reducers/user';

const LoginPanel = () => {
  const [username, setUsername] = React.useState('');
  const dispatch = useDispatch();

  const debouncedLogin = React.useRef(
    debounce(
      value => {
        if (!value) {
          return;
        }
        dispatch(login(value));
      },
      1000,
      { leading: true }
    )
  );

  return (
    <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
      <p>Not Logged in</p>
      <TextField
        allowClear
        removeFloatingLabel
        label="Username"
        onChange={event => setUsername(event.target.value)}
        type="text"
        value={username}
      />
      <div style={{ marginTop: '12px' }}>
        <Button
          style={{ marginRight: '4px' }}
          onClick={() => debouncedLogin.current(username)}
          variant="solid-blue"
        >
          Login
        </Button>
        {/* <Button onClick={function noRefCheck() {}} variant="ghost">
          Register
        </Button> */}
      </div>
    </div>
  );
};

export default LoginPanel;
