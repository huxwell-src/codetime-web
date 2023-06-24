import { useCallback, useState } from 'react'
import {
  Flex,
  Container,
  T,
  pushNotice,
  TextField,
  Panel,
  Btn,
  Anchor,
  useTheme,
  Modal,
  Select,
  ToggleGroup,
} from 'roku-ui'
import { deleteRecords, useMutationFetch, useUserData } from '../../api'
import { CarbonCut, CarbonLogout, CarbonTrashCan } from '@roku-ui/icons-carbon'
import { useI18n } from '../../i18n'
import { useDebounce } from 'usehooks-ts'
export function TokenPanel () {
  const user = useUserData()
  const [hover, setHover] = useState(false)
  const debounceHover = useDebounce(hover, 1000)
  const { t } = useI18n()
  return (
    <Panel
      border
      style={{ padding: '1rem' }}
    >
      { user.data && (
        <>
          <div
            className="monospace"
            style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}
          >
            { t('Token') }
          </div>
          <Flex gap="1rem">
            <TextField
              readOnly
              type={hover && debounceHover ? 'text' : 'password'}
              style={{ fontFamily: 'monospace', flexGrow: 1 }}
              defaultValue={user.data.upload_token}
              value={undefined}
              onMouseEnter={() => { setHover(true) }}
              onMouseLeave={() => { setHover(false) }}
            />
            <Btn
              onClick={() => {
                void navigator.clipboard.writeText(
                  user.data?.upload_token ?? '',
                )
                pushNotice({
                  title: t('Copied'),
                  desc: t('Token copied to clipboard.'),
                  type: 'success',
                })
              }}
            >
              <Flex
                align="center"
                gap="0.25rem"
              >
                <CarbonCut width="20px" />
                <span>
                  { t('Copy') }
                </span>
              </Flex>
            </Btn>
          </Flex>
          <div
            className="text-frontground-3 text-sm"
            style={{ marginTop: '0.25rem' }}
          >
            { t('This token is used to upload your data to the server. It is recommended to keep it private.') }
            <br />
            { t('Learn how to use the token: ') }
            <Anchor href="https://github.com/datreks/codetime-vscode" >{ 'github.com/datreks/codetime-vscode' }</Anchor>
          </div>
        </>
      ) }
    </Panel>
  )
}

export function ThemePanel () {
  const { theme, setTheme } = useTheme()
  const { t, locate, setLocate } = useI18n()
  const getKey = useCallback((lang: string) => {
    return t(lang)
  }, [t])
  return (
    <Panel
      border
      style={{ padding: '1rem' }}
    >
      <>
        <div
          className="monospace"
          style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}
        >
          { t('Preferences') }
        </div>
        <Flex
          col
          gap="1rem"
        >
          <div>
            <div className="text-lg">{ t('Themes') }</div>
            <ToggleGroup
              value={theme}
              setValue={setTheme}
              data={['dark', 'light', 'system']}
              body={(d) => t(d)}
            />
          </div>
          <div className="text-lg">{ t('Languages') }</div>
          <div>
            <Select<{ lang: string, label: string }>
              defaultValue={{ lang: locate, label: getKey(locate) }}
              options={[
                { lang: 'en', label: 'English' },
                { lang: 'zh-CN', label: '简体中文' },
                { lang: 'zh-TW', label: '繁體中文' },
                { lang: 'ja', label: '日本語' },
                { lang: 'pt-BR', label: 'Português Brasileiro' },
              ]}
              getKey={(d) => d.label}
              setValue={d => { setLocate(d.lang) }}
            />
            {
              locate === 'en' && (
                <div
                  className="text-frontground-3 text-sm"
                  style={{ marginTop: '0.25rem' }}
                >
                  { t('If there\'s no language you use, why not get involved and contribute to the project? ') }
                  <Anchor
                    href="https://github.com/Jannchie/codetime-web"
                    target="_blank"
                  >
                    { 'github.com/Jannchie/codetime-web' }
                  </Anchor>
                </div>
              )
            }
          </div>
        </Flex>
      </>
    </Panel>
  )
}

function DangerPanel () {
  const { t } = useI18n()
  const [showModal, setShowModal] = useState(false)
  return (
    <Panel
      border
      style={{ padding: '1rem', borderColor: 'hsl(var(--r-danger-1))' }}
    >
      <div
        className="monospace"
        style={{ fontSize: '1.5rem', color: 'hsl(var(--r-danger-1))' }}
      >
        { t('Danger Zone') }
      </div>
      <div
        style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}
        className="text-frontground-3"
      >
        { t('We hope you understand what is being done. These operations are irrevocable.') }
      </div>
      <Btn
        color="danger"
        onClick={() => {
          setShowModal(true)
        }}
      >
        <Flex gap="0.5rem">
          <CarbonTrashCan width="1em" />
          { t('Distory All My Records') }
        </Flex>
      </Btn>
      <Modal
        backgroundBlur
        background
        show={showModal}
        setShow={setShowModal}
      >
        <ConfirmModal setShow={setShowModal} />
      </Modal>
    </Panel>
  )
}
function ConfirmModal ({ setShow }: { setShow: (show: boolean) => void }) {
  const [text, setText] = useState('')
  return (
    <Panel
      border
      style={{ padding: '1rem' }}
    >
      <T.H4>{ 'Are you sure?' }</T.H4>
      <T.P>{ 'This operation is irreversible. All your records will be deleted.' }</T.P>
      <div>
        <TextField
          style={{ width: '100%' }}
          value={text}
          setValue={setText}
          placeholder={'Input: "I\'m sure."'}
        />
      </div>
      <Flex
        gap="0.5rem"
        style={{ marginTop: '1rem' }}
      >
        <Btn
          color="danger"
          disabled={text !== 'I\'m sure.'}
          onClick={() => {
            void deleteRecords().then(() => {
              pushNotice({
                title: 'Success',
                desc: 'All records have been deleted.',
              })
            }).catch(() => {
              pushNotice({
                title: 'Error',
                desc: 'Failed to delete records.',
                type: 'danger',
              })
            })
            setShow(false)
          }}
        >
          { 'I\'m sure.' }
        </Btn>
        <Btn
          color="default"
          onClick={() => {
            setShow(false)
          }}
        >
          { 'Cancel' }
        </Btn>
      </Flex>
    </Panel>
  )
}

function LogoutPanel () {
  const { t } = useI18n()
  const res = useMutationFetch('/auth/logout', { method: 'POST' })
  return (
    <Panel
      border
      style={{ padding: '1rem' }}
    >
      <div
        className="monospace"
        style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}
      >
        { t('Others') }
      </div>
      <Btn
        color="primary"
        onClick={() => {
          void res.trigger().then(() => {
            window.location.reload()
          })
        }}
      >
        <Flex gap="0.5rem">
          <CarbonLogout width="1em" />
          { t('Logout') }
        </Flex>
      </Btn>
    </Panel>
  )
}
export function DashboardSettings () {
  const { t } = useI18n()
  return (
    <Container style={{ padding: '1rem' }}>
      <T.H1 className="monospace">
        { t('Settings') }
      </T.H1>
      <Flex
        gap="1rem"
        direction="column"
      >
        <TokenPanel />
        <ThemePanel />
        <DangerPanel />
        <LogoutPanel />
      </Flex>
    </Container>
  )
}
