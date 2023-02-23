import { Modal } from 'antd'
import ReactPlayer from 'react-player'

const PreviewModal = ({ showModal, setShowModal, preview, course }) => {
  return (
    <>
      <Modal
        title="Course Preview"
        visible={showModal}
        onCancel={() => setShowModal(!showModal)}
        widht={720}
        footer={null}
      >
        <div>
          <video controls width="100%" controlsList="nodownload" preload="metadata"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={preview} type="video/webm" />
            <track
              label="English"
              kind="subtitles"
              srclang="en"
              src="captions/vtt/sintel-en.vtt"
              default />
          </video>
        </div>
      </Modal>
    </>
  )
}

export default PreviewModal
