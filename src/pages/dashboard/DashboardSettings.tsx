import {
  Flex,
  Container,
  Typography,
  pushNotice,
  TextField,
  Panel,
  Btn,
  MaterialSymbolIcon,
  Anchor,
} from 'roku-ui'
import { useUserData } from '../../api'

export function TokenPanel () {
  const user = useUserData()
  return (
    <Panel border style={{ padding: '1rem' }}>
      { user.data && (
        <>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bolder', marginBottom: '0.5rem' }}>
            { 'Upload Token' }
          </div>
          <Flex gap="1rem">
            <TextField
              readOnly
              style={{ width: '100%', fontFamily: 'monospace' }}
              defaultValue={user.data.upload_token}
              value={undefined}
            />
            <Btn
              onClick={() => {
                void navigator.clipboard.writeText(
                  user.data?.upload_token ?? '',
                )
                pushNotice({
                  title: 'Copied',
                  desc: 'Token copied to clipboard',
                  type: 'success',
                })
              }}
            >
              <MaterialSymbolIcon icon="cut" /> { 'Copy' }
            </Btn>
          </Flex>
          <div className="text-frontground-3 text-sm" style={{ marginTop: '0.25rem' }}>
            { 'This token is used to upload your data to the server. It is recommended to keep it private.' }
            <br />
            { 'Learn how to use the token: ' }<Anchor href="https://github.com/datreks/codetime-vscode" >{ 'github.com/datreks/codetime-vscode' }</Anchor>
          </div>
        </>
      ) }
    </Panel>
  )
}

export function DashboardSettings () {
  return (
    <Container style={{ padding: '1rem' }}>
      <Typography.H1>{ 'Settings' }</Typography.H1>
      <Flex gap="1rem" direction="column" >
        <TokenPanel />
      </Flex>
    </Container>
  )
}