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
          <ReactPlayer
            url={preview}
            playing={showModal}
            config={{
              file: {
                attributes: { controlsList: 'nodownload' },
              },
            }}
            onContextMenu={(e) => e.preventDefault()}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </>
  )
}

export default PreviewModal
