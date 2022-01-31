import { Spinner } from '@paljs/ui';
import { Button } from '@paljs/ui/Button';
import { Card, CardBody } from '@paljs/ui/Card';
import Col from '@paljs/ui/Col';
import Container from '@paljs/ui/Container';
import { EvaIcon } from '@paljs/ui/Icon';
import { InputGroup } from '@paljs/ui/Input';
import Row from '@paljs/ui/Row';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import PluginCard from '../../components/plugin-card';
import { internalSdk } from '../../lib/sdks/api-sdk';
import { socketio } from '../../lib/socketio-client';


const DynamicTerminal = dynamic(() => import('../../components/terminal'), {ssr: false})


const UpdateRequired = styled.h1`
  font-size: 1rem;
  margin-top: 0px;
  margin-bottom: -30px;
`

const PluginName = styled.h1`
  font-size: 1.5rem;
  margin-bottom: -20px;
`

const PluginId = styled.h1`
  font-size: 0.6rem;
`

const ModalHeader = styled.h1`
  margin: 2px;
  color: #000 !important;
  font-size: 1.5rem;
`

interface Plugin {
  id:string;
  version:string;
  latestVersion:string
}

interface InstallPlugin {
  name:string
  version:string
}

function getUpgradeAvailable(latestVersion?:string) {
  if(latestVersion) {
    return <div><EvaIcon name='arrow-circle-up-outline'></EvaIcon> Upgrade Available</div>
  }

  return "Installed"
}

function Plugins({plugins}: {plugins: Plugin[]}) {
  if(typeof window !== 'undefined') {
    Modal.setAppElement(document.getElementById('oah-layout') as HTMLElement)
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [plugin, setPlugin] = useState<{name:string, version:string}>();
  const [searchPlugin, setSearchPlugin] = useState('')

  const [searchedPlugins, setSearchedPlugins] = useState<InstallPlugin[]>([])
  const [loadingPlugins, setLoadingPlugins] = useState<boolean>(false)

  async function openModal(plugin: Plugin | InstallPlugin, action:'install' | 'update') {
    if(action === 'install') {
      const p = plugin as InstallPlugin;
      setPlugin({
        name: p.name,
        version: p.version
      })
      setIsOpen(true);
    }else{
      const p = plugin as Plugin;
      setPlugin({
        name: p.id,
        version: p.latestVersion
      })
      setIsOpen(true);
    }
  }

  async function afterTerminalOpened() {
    await internalSdk.post('/plugins/install', {
      body: JSON.stringify(plugin)
    })
  }

  function closeModal() {
    setIsOpen(false);
    setSearchPlugin('')
    setSearchedPlugins([])
    socketio.removeListener('stdout')
  }

  useEffect(() => {
    if(!searchPlugin) {
      setLoadingPlugins(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const {data} = await internalSdk.get<InstallPlugin[]>(`/plugins/search?plugin=${encodeURIComponent(searchPlugin)}`)
      setSearchedPlugins(data);
      setLoadingPlugins(false)
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchPlugin])

  function generatePluginsList() {
    if(loadingPlugins) {
     return <Col>
        <Card>
          <CardBody style={{padding: '50px'}}>
            <Spinner size='Giant'>Loading...</Spinner>
          </CardBody>
        </Card>
      </Col>
    }

    if(searchedPlugins?.length) {
      return searchedPlugins.map(plugin => (
        <PluginCard name={plugin.name} version={plugin.version} onClick={() => openModal(plugin, 'install')} />
      ))
    }

    return plugins?.map(plugin => (
      <PluginCard name={plugin.id} version={plugin.version} onClick={() => openModal(plugin, 'update')} />
    ))
  }

  return (
    <div>
      <InputGroup fullWidth shape='Rectangle' size='Large'>
        <input autoComplete='false' type="text" placeholder='Search for a plugin...' onChange={(e) => {
          setSearchPlugin(e.target.value);
          setLoadingPlugins(true)
        }} value={searchPlugin} />
      </InputGroup>
      <br/>
      <div>
        <Container> 
          <Row>
            {generatePluginsList()}
          </Row>
        </Container>
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.87)'
          },
          content: {
            color: 'black',
            top: '400px',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
      >
        {/* <ModalHeader>Update: {selectedPlugin?.id}</ModalHeader>
        <DynamicTerminal action='plugin' /> */}

        <Container>
          <Row>
            <Col>
              <ModalHeader>Update: {plugin?.name}</ModalHeader>
            </Col>
          </Row>
          <Row style={{minHeight: '408px'}}>
            <Col>
              <DynamicTerminal action='plugin' onOpened={afterTerminalOpened} />
            </Col>
          </Row>
          <Row style={{float:'right'}}>
            <Col breakPoint={{xs:2}}>
              <Button style={{marginTop:"10px", marginBottom: "10px"}} appearance='ghost' status='Basic' onClick={closeModal}>Close</Button>
            </Col>
          </Row>
        </Container>
      </Modal>
    </div>
  )
}

Plugins.getInitialProps = async () => {
  const {data} = await internalSdk.get('/plugins', {});
 
  return {
    plugins: data
  }
}

export default Plugins;