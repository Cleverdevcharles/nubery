import { List, Avatar } from 'antd'
const { Item } = List

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
  course,
}) => {
  return (
    <div className="container">
      {course && (
        <>
          {course.map((c) => (
            <>
            {c && 
            <div className="row" key={c._id}>
            <div className="col lesson-list">
              {c.lessons && (
                <h4 style={{ fontSize: '20px', fontweight: 'bold' }}>
                  {c.lessons.length} Lessons
                </h4>
              )}
              <hr />
              <List
                itemLayout="horizontal"
                dataSource={c.lessons}
                renderItem={(item, index) => (
                  <Item>
                    <Item.Meta
                      avatar={<Avatar>{index + 1}</Avatar>}
                      title={item.title}
                    />
                    {item.video && item.video !== null && item.free_preview && (
                      <span
                        className="text-primary pointer"
                        onClick={() => {
                          setPreview(item.video.Location)
                          setShowModal(!showModal)
                        }}
                      >
                        Preview
                      </span>
                    )}
                  </Item>
                )}
              />
            </div>
          </div>
            }
            </>
          ))}
        </>
      )}
    </div>
  )
}

export default SingleCourseLessons
