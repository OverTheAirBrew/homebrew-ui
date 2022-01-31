import { FC, useEffect } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { socketio } from '../lib/socketio-client';


const DynamicTerminal: FC<{ action: 'plugin', onOpened: Function }> = (props) => {
  
  useEffect(() => {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminal.open(document.getElementById('terminal') as HTMLElement);

    socketio.on('stdout', (data: {message:string}) => {
      console.log(data)
      terminal.write(data.message);
    })

    socketio.on('stdout.finish', () => {

    })

    fitAddon.fit();
    terminal.clear();

    props.onOpened()
  }, [])

  return <div id="terminal"></div>;
}

export default DynamicTerminal