import { Card, CardBody } from '@paljs/ui';
import { Button } from '@paljs/ui/Button';
import Col from '@paljs/ui/Col';
import { FC } from "react";
import styled from 'styled-components';
import { titleCase } from 'title-case';

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

const PluginCard: FC<{name:string, version:string, latestVersion?:string, displayName?:string, onClick:Function}> = ({name, version, latestVersion, displayName, onClick}) => {
  const pluginName = displayName || titleCase((name.charAt(0) === '@' ? name.split('/')[1] : name).replace(/-/g, ' '))

  function generateButton() {
    if(latestVersion && version !== latestVersion) {
      return <Button appearance='ghost' status='Basic' onClick={() => onClick()}>UPDATE</Button>
    }
    

    return <Button appearance='ghost' status='Basic' onClick={() => onClick()}>INSTALL</Button>
  }

  return (
    <Col breakPoint={{xs: 12, sm: 12, md: 6, lg: 6}}>
    <Card>
      <CardBody>
        <PluginName>{pluginName}</PluginName>
        <PluginId>{name} v{version}</PluginId>
        <div>
          {generateButton()}
        </div>
      </CardBody>    
    </Card>
  </Col>
  )
}

export default PluginCard;