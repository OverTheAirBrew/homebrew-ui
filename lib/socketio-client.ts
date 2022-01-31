import { connect } from 'socket.io-client';

export const socketio = connect('http://localhost:9090', {
  path: '/api/socket.io',
});
