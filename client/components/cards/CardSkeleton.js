import React from 'react'
import { Card, Badge } from 'antd'
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
    return ( 
        <div >
        <Card className="mb-4">
          <div
            style={{
              height: '250px',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            
          ><Skeleton height="250px" /></div>
          <div className="mt-4">
            <div className="course-item-5-card-info">
              <button className="course-item-5-card-info-tag tag-color2">
                <Skeleton />
              </button>
              <button className="course-item-5-card-info-tag tag-color2">
              <Skeleton />
              </button>
              <p className="course-item-5-card-info-price">
              <Skeleton />
              </p>
            </div>
            <div className="d-flex">
              <a className="course-item-5-card-head"><Skeleton /></a>
              <Skeleton />
            </div>
            <div className="course-item-5-card-info mb-3 -mt-5">
              <button className="bg-success text-white course-item-5-card-info-tag">
              <Skeleton />
              </button>
            </div>
            
          </div>
        </Card>
      </div>
     );
}
 
export default CardSkeleton;