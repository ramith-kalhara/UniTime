import React from 'react'

function AiSchedule({ ScheduleData }) {
  return (
    <div className="col-lg-4 mb-5">
    <div className="card border-0 bg-light shadow-sm pb-2"  style={{ width: '350px', height: '691px' }}>
      {/* Optional image - only if you add it to the data */}
      <img
        className="card-img-top mb-2"
        src={ScheduleData.img || '/images/default.jpg'}
        alt="Room"
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />


      <div className="card-body text-center">
        <h4 className="card-title">{ScheduleData.moduleName}</h4>
        <p className="card-text">{ScheduleData.description}</p>

      </div>
      <div className="card-footer bg-transparent py-4 px-5">
        <div className="row border-bottom">
          <div className="col-6 py-1 text-right border-right">
            <strong>Department</strong>
          </div>
          <div className="col-6 py-1">{ScheduleData.department}</div>
        </div>
        <div className="row border-bottom">
          <div className="col-6 py-1 text-right border-right">
            <strong>Total Seats</strong>
          </div>
          <div className="col-6 py-1">{ScheduleData.capacity} Seats</div>
        </div>
        <div className="row border-bottom">
          <div className="col-6 py-1 text-right border-right">
            <strong>Operating Hours</strong>
          </div>
          <div className="col-6 py-1">
            {ScheduleData.startTime}
          </div>
        </div>
        <div className="row">
          <div className="col-6 py-1 text-right border-right">
            <strong>Professor Name</strong>
          </div>
          <div className="col-6 py-1">{ScheduleData.profName}</div>
        </div>
      </div>
      <a href="#" className="btn btn-primary px-4 mx-auto mb-4">
        Book Now
      </a>
    </div>
  </div>
  )
}

export default AiSchedule